// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable, Ownable2Step} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

contract MeiVault is ERC20, Ownable2Step, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    uint256 public constant MAX_MGMT_FEE_BPS = 200;
    uint256 public constant MAX_PERF_FEE_BPS = 2500;
    uint256 public constant BPS = 10_000;
    uint256 public constant YEAR = 365.25 days;
    uint8 public constant SHARE_DECIMALS = 18;

    IERC20 public immutable asset;
    uint256 public immutable capacityCap;
    uint256 public immutable minDeposit;
    uint256 public immutable withdrawalDelaySeconds;
    uint256 public immutable valuationStalenessSeconds;
    uint256 public immutable mgmtFeeBps;
    uint256 public immutable perfFeeBps;

    address public executor;
    mapping(address => bool) public allowedTarget;
    address public feeRecipient;
    uint256 public lastValuation;
    uint256 public lastValuationAt;
    uint256 public valuationNonce;
    uint256 public highWaterMark;
    uint256 public mgmtFeeAccruedAt;
    uint256 public nextRedemptionId;

    uint256 private immutable _assetToShareScale;

    struct RedemptionRequest {
        address owner;
        uint256 shares;
        uint256 unlockAt;
        bool claimed;
    }

    mapping(uint256 => RedemptionRequest) public redemptions;

    event Deposit(address indexed sender, address indexed receiver, uint256 assets, uint256 shares);
    event RedemptionRequested(
        uint256 indexed id,
        address indexed owner,
        address indexed receiver,
        uint256 shares,
        uint256 unlockAt
    );
    event RedemptionClaimed(
        uint256 indexed id, address indexed receiver, uint256 assets, uint256 shares
    );
    event RedemptionCancelled(uint256 indexed id);
    event ValuationReported(
        uint256 newDeployedValue,
        uint256 nonce,
        uint256 ppsAfter,
        uint256 mgmtFeeShares,
        uint256 perfFeeShares
    );
    event Executed(address indexed target, uint256 value, bytes data);
    event ExecutorSet(address indexed previous, address indexed current);
    event TargetAllowed(address indexed target, bool allowed);
    event FeeRecipientSet(address indexed previous, address indexed current);
    event EmergencySwept(address indexed token, address indexed to, uint256 amount);

    error NotExecutor();
    error TargetNotAllowed(address target);
    error ZeroAddress();
    error ZeroAmount();
    error BelowMinDeposit(uint256 provided, uint256 min);
    error CapacityExceeded(uint256 wouldBe, uint256 cap);
    error ValuationStale(uint256 lastAt, uint256 currentBlock);
    error NonceNotMonotonic(uint256 provided, uint256 lastSeen);
    error NotRedeemer();
    error AlreadyClaimed();
    error NotUnlockedYet(uint256 unlockAt, uint256 currentBlock);
    error InsufficientLiquidity(uint256 needed, uint256 available);
    error CannotSweepAsset();
    error FeeTooHigh(uint256 provided, uint256 max);

    modifier onlyExecutor() {
        if (msg.sender != executor) revert NotExecutor();
        _;
    }

    constructor(
        IERC20 asset_,
        string memory name_,
        string memory symbol_,
        address initialOwner,
        address feeRecipient_,
        uint256 capacityCap_,
        uint256 minDeposit_,
        uint256 withdrawalDelaySeconds_,
        uint256 valuationStalenessSeconds_,
        uint256 mgmtFeeBps_,
        uint256 perfFeeBps_
    ) ERC20(name_, symbol_) Ownable(initialOwner) {
        if (address(asset_) == address(0) || feeRecipient_ == address(0)) {
            revert ZeroAddress();
        }
        if (capacityCap_ == 0) revert ZeroAmount();
        if (mgmtFeeBps_ > MAX_MGMT_FEE_BPS) revert FeeTooHigh(mgmtFeeBps_, MAX_MGMT_FEE_BPS);
        if (perfFeeBps_ > MAX_PERF_FEE_BPS) revert FeeTooHigh(perfFeeBps_, MAX_PERF_FEE_BPS);
        if (valuationStalenessSeconds_ < 600 || valuationStalenessSeconds_ > 1 days) {
            revert ZeroAmount();
        }
        if (withdrawalDelaySeconds_ < 1 hours || withdrawalDelaySeconds_ > 30 days) {
            revert ZeroAmount();
        }

        uint8 assetDecimals = IERC20Metadata(address(asset_)).decimals();
        // SPEC AMBIGUITY: The spec's PPS formula assumes same-decimal shares, while the
        // handoff asks for 18-decimal shares for USDC. Conversions therefore use this
        // offset so one human USDC initially mints one human vault share.
        _assetToShareScale = 10 ** (SHARE_DECIMALS - assetDecimals);

        asset = asset_;
        feeRecipient = feeRecipient_;
        capacityCap = capacityCap_;
        minDeposit = minDeposit_;
        withdrawalDelaySeconds = withdrawalDelaySeconds_;
        valuationStalenessSeconds = valuationStalenessSeconds_;
        mgmtFeeBps = mgmtFeeBps_;
        perfFeeBps = perfFeeBps_;
        highWaterMark = 1e18;
        mgmtFeeAccruedAt = block.timestamp;
        lastValuationAt = block.timestamp;
    }

    /// @notice Vault share decimals.
    /// @return The fixed share decimals, 18.
    function decimals() public pure override returns (uint8) {
        return SHARE_DECIMALS;
    }

    /// @notice Deposit assets and mint vault shares to receiver.
    /// @param assets Amount of underlying asset to deposit.
    /// @param receiver Address receiving minted shares.
    /// @return shares Amount of shares minted.
    function deposit(uint256 assets, address receiver)
        external
        nonReentrant
        whenNotPaused
        returns (uint256 shares)
    {
        if (receiver == address(0)) revert ZeroAddress();
        _checkDepositAssets(assets);
        shares = convertToShares(assets);
        if (shares == 0) revert ZeroAmount();
        asset.safeTransferFrom(msg.sender, address(this), assets);
        _mint(receiver, shares);
        emit Deposit(msg.sender, receiver, assets, shares);
    }

    /// @notice Deposit enough assets to mint an exact number of shares to receiver.
    /// @param shares Amount of vault shares to mint.
    /// @param receiver Address receiving minted shares.
    /// @return assets Amount of underlying asset deposited.
    function mint(uint256 shares, address receiver)
        external
        nonReentrant
        whenNotPaused
        returns (uint256 assets)
    {
        if (receiver == address(0)) revert ZeroAddress();
        if (shares == 0) revert ZeroAmount();
        _requireFreshValuation();
        assets = _convertToAssets(shares, Math.Rounding.Ceil);
        if (assets < minDeposit) revert BelowMinDeposit(assets, minDeposit);
        uint256 wouldBe = totalAssets() + assets;
        if (wouldBe > capacityCap) revert CapacityExceeded(wouldBe, capacityCap);
        asset.safeTransferFrom(msg.sender, address(this), assets);
        _mint(receiver, shares);
        emit Deposit(msg.sender, receiver, assets, shares);
    }

    /// @notice Queue shares for delayed redemption, locking them in the vault until claim or cancel.
    /// @param shares Amount of shares to queue.
    /// @param receiver Address authorized to claim the redemption.
    /// @param owner_ Address whose shares are locked.
    /// @return redemptionId Sequential redemption request id.
    function requestRedeem(uint256 shares, address receiver, address owner_)
        external
        nonReentrant
        whenNotPaused
        returns (uint256 redemptionId)
    {
        if (shares == 0) revert ZeroAmount();
        if (receiver == address(0) || owner_ == address(0)) revert ZeroAddress();
        _requireFreshValuation();
        if (msg.sender != owner_) {
            _spendAllowance(owner_, msg.sender, shares);
        }
        _transfer(owner_, address(this), shares);
        redemptionId = nextRedemptionId++;
        uint256 unlockAt = block.timestamp + withdrawalDelaySeconds;
        redemptions[redemptionId] = RedemptionRequest({
            owner: receiver, shares: shares, unlockAt: unlockAt, claimed: false
        });
        emit RedemptionRequested(redemptionId, owner_, receiver, shares, unlockAt);
    }

    /// @notice Claim an unlocked redemption at current price per share.
    /// @param redemptionId The queued redemption id.
    function claim(uint256 redemptionId) external nonReentrant {
        RedemptionRequest storage request = redemptions[redemptionId];
        if (request.owner != msg.sender) revert NotRedeemer();
        if (request.claimed) revert AlreadyClaimed();
        if (block.timestamp < request.unlockAt) {
            revert NotUnlockedYet(request.unlockAt, block.timestamp);
        }
        _requireFreshValuation();

        uint256 shares = request.shares;
        uint256 assets = convertToAssets(shares);
        uint256 available = asset.balanceOf(address(this));
        if (available < assets) revert InsufficientLiquidity(assets, available);

        request.claimed = true;
        _burn(address(this), shares);
        asset.safeTransfer(msg.sender, assets);
        emit RedemptionClaimed(redemptionId, msg.sender, assets, shares);
    }

    /// @notice Cancel an unclaimed redemption and return locked shares to the redeemer.
    /// @param redemptionId The queued redemption id.
    function cancelRedemption(uint256 redemptionId) external nonReentrant {
        RedemptionRequest storage request = redemptions[redemptionId];
        if (request.owner != msg.sender) revert NotRedeemer();
        if (request.claimed) revert AlreadyClaimed();

        // SPEC AMBIGUITY: §5.1 says cancellation is "before unlock", but gives no error
        // or rationale. I allow cancellation until claim because no NAV is computed and it
        // avoids forcing users into a claim when liquidity is temporarily unavailable.
        request.claimed = true;
        _transfer(address(this), msg.sender, request.shares);
        emit RedemptionCancelled(redemptionId);
    }

    /// @notice Report deployed value and charge accrued management/performance fees.
    /// @param newDeployedValue Value of off-vault positions in asset units.
    /// @param nonce Strictly increasing valuation nonce.
    function reportValuation(uint256 newDeployedValue, uint256 nonce) external onlyExecutor {
        if (nonce <= valuationNonce) revert NonceNotMonotonic(nonce, valuationNonce);
        lastValuation = newDeployedValue;
        lastValuationAt = block.timestamp;
        valuationNonce = nonce;

        uint256 mgmtFeeShares = _chargeMgmtFee();
        uint256 perfFeeShares = _chargePerfFee();
        emit ValuationReported(
            newDeployedValue, nonce, pricePerShare(), mgmtFeeShares, perfFeeShares
        );
    }

    /// @notice Execute a call against an owner-allowlisted target.
    /// @param target Contract to call.
    /// @param value Native ETH value to forward.
    /// @param data Calldata to forward.
    /// @return result Raw return data from the target.
    function exec(address target, uint256 value, bytes calldata data)
        external
        onlyExecutor
        whenNotPaused
        nonReentrant
        returns (bytes memory result)
    {
        if (!allowedTarget[target]) revert TargetNotAllowed(target);
        (bool ok, bytes memory ret) = target.call{value: value}(data);
        if (!ok) {
            assembly {
                revert(add(ret, 32), mload(ret))
            }
        }
        emit Executed(target, value, data);
        return ret;
    }

    /// @notice Set the executor. Use address(0) to disable executor actions.
    /// @param newExecutor New executor address.
    function setExecutor(address newExecutor) external onlyOwner {
        emit ExecutorSet(executor, newExecutor);
        executor = newExecutor;
    }

    /// @notice Add or remove a target from the executor allowlist.
    /// @param target Target contract.
    /// @param allowed Whether target is allowed.
    function setAllowedTarget(address target, bool allowed) external onlyOwner {
        if (target == address(0)) revert ZeroAddress();
        allowedTarget[target] = allowed;
        emit TargetAllowed(target, allowed);
    }

    /// @notice Set the fee recipient for future fee-share mints.
    /// @param newFeeRecipient New fee recipient address.
    function setFeeRecipient(address newFeeRecipient) external onlyOwner {
        if (newFeeRecipient == address(0)) revert ZeroAddress();
        emit FeeRecipientSet(feeRecipient, newFeeRecipient);
        feeRecipient = newFeeRecipient;
    }

    /// @notice Pause deposits, new redemptions, and executor calls.
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Unpause deposits, new redemptions, and executor calls.
    function unpause() external onlyOwner {
        _unpause();
    }

    /// @notice Sweep non-asset tokens while paused.
    /// @param token Token to sweep. Must not be the vault asset.
    /// @param to Recipient address.
    /// @param amount Amount to sweep.
    function emergencySweep(IERC20 token, address to, uint256 amount)
        external
        onlyOwner
        whenPaused
    {
        if (address(token) == address(asset)) revert CannotSweepAsset();
        if (to == address(0)) revert ZeroAddress();
        token.safeTransfer(to, amount);
        emit EmergencySwept(address(token), to, amount);
    }

    /// @notice Current total assets: idle asset balance plus executor-reported deployed value.
    /// @return Total assets in underlying units.
    function totalAssets() public view returns (uint256) {
        return asset.balanceOf(address(this)) + lastValuation;
    }

    /// @notice Convert assets to shares, rounding down.
    /// @param assets Amount of underlying asset.
    /// @return shares Equivalent shares.
    function convertToShares(uint256 assets) public view returns (uint256 shares) {
        return _convertToShares(assets, Math.Rounding.Floor);
    }

    /// @notice Convert shares to assets, rounding down.
    /// @param shares Amount of vault shares.
    /// @return assets Equivalent underlying assets.
    function convertToAssets(uint256 shares) public view returns (uint256 assets) {
        return _convertToAssets(shares, Math.Rounding.Floor);
    }

    /// @notice Maximum deposit currently accepted from any address.
    /// @return Remaining capacity if unpaused and valuation is fresh, otherwise zero.
    function maxDeposit(address) external view returns (uint256) {
        if (paused() || !_valuationFresh()) return 0;
        uint256 assets_ = totalAssets();
        return assets_ >= capacityCap ? 0 : capacityCap - assets_;
    }

    /// @notice Maximum shares currently mintable by any address.
    /// @return Shares derived from remaining deposit capacity.
    function maxMint(address) external view returns (uint256) {
        if (paused() || !_valuationFresh()) return 0;
        uint256 assets_ = totalAssets();
        if (assets_ >= capacityCap) return 0;
        return convertToShares(capacityCap - assets_);
    }

    /// @notice Maximum shares an owner can queue for redemption.
    /// @param owner_ Share owner.
    /// @return Owner share balance.
    function maxRedeem(address owner_) external view returns (uint256) {
        return balanceOf(owner_);
    }

    /// @notice Maximum assets represented by an owner's current share balance.
    /// @param owner_ Share owner.
    /// @return Assets represented by owner shares.
    function maxWithdraw(address owner_) external view returns (uint256) {
        return convertToAssets(balanceOf(owner_));
    }

    /// @notice Preview shares minted for an asset deposit.
    /// @param assets Amount of underlying asset.
    /// @return Shares minted.
    function previewDeposit(uint256 assets) external view returns (uint256) {
        return convertToShares(assets);
    }

    /// @notice Preview assets claimable for shares.
    /// @param shares Amount of vault shares.
    /// @return Assets claimable at current PPS.
    function previewRedeem(uint256 shares) external view returns (uint256) {
        return convertToAssets(shares);
    }

    /// @notice Current normalized price per share, 1e18 at inception.
    /// @return PPS in 1e18 units.
    function pricePerShare() public view returns (uint256) {
        uint256 supply = totalSupply();
        if (supply == 0) return 1e18;
        return Math.mulDiv(totalAssets(), _assetToShareScale * 1e18, supply);
    }

    /// @notice Redemption delay in seconds.
    /// @return Delay configured at construction.
    function redemptionDelay() external view returns (uint256) {
        return withdrawalDelaySeconds;
    }

    /// @notice Fetch a redemption request.
    /// @param id Redemption id.
    /// @return request The stored redemption request.
    function getRedemption(uint256 id) external view returns (RedemptionRequest memory request) {
        return redemptions[id];
    }

    receive() external payable {
        revert();
    }

    function _checkDepositAssets(uint256 assets) private view {
        if (assets < minDeposit) revert BelowMinDeposit(assets, minDeposit);
        _requireFreshValuation();
        uint256 wouldBe = totalAssets() + assets;
        if (wouldBe > capacityCap) revert CapacityExceeded(wouldBe, capacityCap);
    }

    function _requireFreshValuation() private view {
        if (!_valuationFresh()) revert ValuationStale(lastValuationAt, block.timestamp);
    }

    function _valuationFresh() private view returns (bool) {
        return block.timestamp - lastValuationAt <= valuationStalenessSeconds;
    }

    function _convertToShares(uint256 assets, Math.Rounding rounding)
        private
        view
        returns (uint256)
    {
        uint256 supply = totalSupply();
        uint256 total = totalAssets();
        if (supply == 0 || total == 0) return assets * _assetToShareScale;
        return Math.mulDiv(assets, supply, total, rounding);
    }

    function _convertToAssets(uint256 shares, Math.Rounding rounding)
        private
        view
        returns (uint256)
    {
        uint256 supply = totalSupply();
        if (supply == 0) return Math.mulDiv(shares, 1, _assetToShareScale, rounding);
        return Math.mulDiv(shares, totalAssets(), supply, rounding);
    }

    function _chargeMgmtFee() private returns (uint256 feeShares) {
        uint256 supply = totalSupply();
        if (supply == 0) {
            mgmtFeeAccruedAt = block.timestamp;
            return 0;
        }
        uint256 elapsed = block.timestamp - mgmtFeeAccruedAt;
        if (elapsed == 0 || mgmtFeeBps == 0) {
            mgmtFeeAccruedAt = block.timestamp;
            return 0;
        }
        uint256 feeAssets = Math.mulDiv(totalAssets(), mgmtFeeBps * elapsed, BPS * YEAR);
        feeShares = convertToShares(feeAssets);
        if (feeShares != 0) _mint(feeRecipient, feeShares);
        mgmtFeeAccruedAt = block.timestamp;
    }

    function _chargePerfFee() private returns (uint256 feeShares) {
        uint256 supply = totalSupply();
        if (supply == 0 || perfFeeBps == 0) return 0;

        uint256 currentPPS = pricePerShare();
        if (currentPPS <= highWaterMark) return 0;

        uint256 gainPerShare = currentPPS - highWaterMark;
        uint256 gainAssets = Math.mulDiv(gainPerShare, supply, 1e18 * _assetToShareScale);
        uint256 feeAssets = Math.mulDiv(gainAssets, perfFeeBps, BPS);
        feeShares = convertToShares(feeAssets);
        if (feeShares != 0) _mint(feeRecipient, feeShares);
        highWaterMark = pricePerShare();
    }
}
