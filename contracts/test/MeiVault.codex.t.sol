// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {MeiVault} from "../src/MeiVault.codex.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

contract MockERC20 is ERC20 {
    uint8 private immutable _decimals;

    constructor(string memory name_, string memory symbol_, uint8 decimals_) ERC20(name_, symbol_) {
        _decimals = decimals_;
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract MockTarget {
    uint256 public calls;
    uint256 public lastValue;
    bytes public lastData;

    function ping(uint256 value) external payable returns (uint256) {
        calls++;
        lastValue = msg.value;
        lastData = abi.encode(value);
        return value + 1;
    }

    function reverts() external pure {
        revert("mock revert");
    }
}

contract ReentrantExecTarget {
    MeiVault public vault;

    constructor(MeiVault vault_) {
        vault = vault_;
    }

    function attack() external {
        vault.exec(address(this), 0, abi.encodeWithSelector(this.attack.selector));
    }
}

contract MaliciousAsset is ERC20 {
    MeiVault public vault;
    bool public attack;

    constructor() ERC20("Malicious", "MAL") {}

    function setVault(MeiVault vault_) external {
        vault = vault_;
    }

    function setAttack(bool attack_) external {
        attack = attack_;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        if (attack) {
            vault.deposit(1 ether, from);
        }
        return super.transferFrom(from, to, amount);
    }
}

contract MeiVaultCodexTest is Test {
    MeiVault vault;
    MockERC20 token;
    MockTarget target;

    address owner = address(0xA11CE);
    address executor = address(0xE0E0);
    address feeRecipient = address(0xFEE);
    address user = address(0xBEEF);
    address user2 = address(0xCAFE);
    address receiver = address(0x1234);

    uint256 constant CAP = 250_000e6;
    uint256 constant MIN = 100e6;
    uint256 constant DELAY = 1 days;
    uint256 constant STALE = 1 hours;

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

    function setUp() public {
        token = new MockERC20("USD Coin", "USDC", 6);
        vm.prank(owner);
        vault = new MeiVault(
            IERC20(address(token)),
            "Mei Conservative Vault",
            "mvUSDC-C",
            owner,
            feeRecipient,
            CAP,
            MIN,
            DELAY,
            STALE,
            50,
            500
        );
        target = new MockTarget();
        vm.prank(owner);
        vault.setExecutor(executor);
        token.mint(user, 1_000_000e6);
        token.mint(user2, 1_000_000e6);
    }

    function _depositAs(address who, uint256 assets) internal returns (uint256 shares) {
        vm.startPrank(who);
        token.approve(address(vault), assets);
        shares = vault.deposit(assets, who);
        vm.stopPrank();
    }

    function _depositTo(address who, address to, uint256 assets) internal returns (uint256 shares) {
        vm.startPrank(who);
        token.approve(address(vault), assets);
        shares = vault.deposit(assets, to);
        vm.stopPrank();
    }

    function _requestAs(address caller, uint256 shares, address recipient, address shareOwner)
        internal
        returns (uint256 id)
    {
        vm.prank(caller);
        id = vault.requestRedeem(shares, recipient, shareOwner);
    }

    function _report(uint256 value, uint256 nonce) internal {
        vm.prank(executor);
        vault.reportValuation(value, nonce);
    }

    function _pause() internal {
        vm.prank(owner);
        vault.pause();
    }

    function test_constructor_setsImmutableState() public view {
        assertEq(address(vault.asset()), address(token));
        assertEq(vault.name(), "Mei Conservative Vault");
        assertEq(vault.symbol(), "mvUSDC-C");
        assertEq(vault.owner(), owner);
        assertEq(vault.feeRecipient(), feeRecipient);
        assertEq(vault.capacityCap(), CAP);
        assertEq(vault.minDeposit(), MIN);
        assertEq(vault.withdrawalDelaySeconds(), DELAY);
        assertEq(vault.valuationStalenessSeconds(), STALE);
        assertEq(vault.mgmtFeeBps(), 50);
        assertEq(vault.perfFeeBps(), 500);
    }

    function test_constructor_revertsOnZeroAsset() public {
        vm.expectRevert(MeiVault.ZeroAddress.selector);
        new MeiVault(
            IERC20(address(0)), "x", "x", owner, feeRecipient, CAP, MIN, DELAY, STALE, 50, 500
        );
    }

    function test_constructor_revertsOnZeroOwner() public {
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableInvalidOwner.selector, address(0)));
        new MeiVault(
            IERC20(address(token)),
            "x",
            "x",
            address(0),
            feeRecipient,
            CAP,
            MIN,
            DELAY,
            STALE,
            50,
            500
        );
    }

    function test_constructor_revertsOnZeroFeeRecipient() public {
        vm.expectRevert(MeiVault.ZeroAddress.selector);
        new MeiVault(
            IERC20(address(token)), "x", "x", owner, address(0), CAP, MIN, DELAY, STALE, 50, 500
        );
    }

    function test_constructor_revertsOnZeroCap() public {
        vm.expectRevert(MeiVault.ZeroAmount.selector);
        new MeiVault(
            IERC20(address(token)), "x", "x", owner, feeRecipient, 0, MIN, DELAY, STALE, 50, 500
        );
    }

    function test_constructor_revertsOnMgmtFeeTooHigh() public {
        vm.expectRevert(abi.encodeWithSelector(MeiVault.FeeTooHigh.selector, 201, 200));
        new MeiVault(
            IERC20(address(token)), "x", "x", owner, feeRecipient, CAP, MIN, DELAY, STALE, 201, 500
        );
    }

    function test_constructor_revertsOnPerfFeeTooHigh() public {
        vm.expectRevert(abi.encodeWithSelector(MeiVault.FeeTooHigh.selector, 2501, 2500));
        new MeiVault(
            IERC20(address(token)), "x", "x", owner, feeRecipient, CAP, MIN, DELAY, STALE, 50, 2501
        );
    }

    function test_constructor_revertsOnBadStaleness() public {
        vm.expectRevert(MeiVault.ZeroAmount.selector);
        new MeiVault(
            IERC20(address(token)), "x", "x", owner, feeRecipient, CAP, MIN, DELAY, 599, 50, 500
        );
    }

    function test_constructor_revertsOnBadWithdrawalDelay() public {
        vm.expectRevert(MeiVault.ZeroAmount.selector);
        new MeiVault(
            IERC20(address(token)), "x", "x", owner, feeRecipient, CAP, MIN, 3599, STALE, 50, 500
        );
    }

    function test_roles_startUnpausedAndExecutorZeroBeforeSet() public {
        MockERC20 t = new MockERC20("T", "T", 6);
        vm.prank(owner);
        MeiVault fresh = new MeiVault(
            IERC20(address(t)), "x", "x", owner, feeRecipient, CAP, MIN, DELAY, STALE, 50, 500
        );
        assertFalse(fresh.paused());
        assertEq(fresh.executor(), address(0));
    }

    function test_ownerCanSetAndUnsetExecutor() public {
        vm.startPrank(owner);
        vault.setExecutor(user);
        assertEq(vault.executor(), user);
        vault.setExecutor(address(0));
        assertEq(vault.executor(), address(0));
        vm.stopPrank();
    }

    function test_nonOwnerCannotSetExecutor() public {
        vm.prank(user);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user));
        vault.setExecutor(user);
    }

    function test_ownerCanSetAndUnsetAllowedTarget() public {
        vm.startPrank(owner);
        vault.setAllowedTarget(address(target), true);
        assertTrue(vault.allowedTarget(address(target)));
        vault.setAllowedTarget(address(target), false);
        assertFalse(vault.allowedTarget(address(target)));
        vm.stopPrank();
    }

    function test_setAllowedTargetRejectsZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert(MeiVault.ZeroAddress.selector);
        vault.setAllowedTarget(address(0), true);
    }

    function test_nonOwnerCannotSetAllowedTarget() public {
        vm.prank(user);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user));
        vault.setAllowedTarget(address(target), true);
    }

    function test_ownable2StepTransferWorks() public {
        vm.prank(owner);
        vault.transferOwnership(user);
        assertEq(vault.owner(), owner);
        assertEq(vault.pendingOwner(), user);
        vm.prank(user);
        vault.acceptOwnership();
        assertEq(vault.owner(), user);
    }

    function test_depositHappyPath() public {
        uint256 shares = _depositAs(user, 100e6);
        assertEq(shares, 100e18);
        assertEq(vault.balanceOf(user), 100e18);
        assertEq(token.balanceOf(address(vault)), 100e6);
    }

    function test_depositEmitsEvent() public {
        vm.startPrank(user);
        token.approve(address(vault), 100e6);
        vm.expectEmit(true, true, false, true);
        emit Deposit(user, user, 100e6, 100e18);
        vault.deposit(100e6, user);
        vm.stopPrank();
    }

    function test_depositRevertsIfPaused() public {
        _pause();
        vm.startPrank(user);
        token.approve(address(vault), 100e6);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        vault.deposit(100e6, user);
        vm.stopPrank();
    }

    function test_depositRevertsBelowMinimum() public {
        vm.startPrank(user);
        token.approve(address(vault), 99e6);
        vm.expectRevert(abi.encodeWithSelector(MeiVault.BelowMinDeposit.selector, 99e6, MIN));
        vault.deposit(99e6, user);
        vm.stopPrank();
    }

    function test_depositRevertsIfCapacityExceeded() public {
        vm.startPrank(user);
        token.approve(address(vault), CAP + 1);
        vm.expectRevert(abi.encodeWithSelector(MeiVault.CapacityExceeded.selector, CAP + 1, CAP));
        vault.deposit(CAP + 1, user);
        vm.stopPrank();
    }

    function test_depositRevertsIfValuationStale() public {
        vm.warp(block.timestamp + STALE + 1);
        vm.startPrank(user);
        token.approve(address(vault), 100e6);
        vm.expectRevert(
            abi.encodeWithSelector(
                MeiVault.ValuationStale.selector, vault.lastValuationAt(), block.timestamp
            )
        );
        vault.deposit(100e6, user);
        vm.stopPrank();
    }

    function test_firstDepositGetsOneToOneHumanUnits_actual() public {
        uint256 shares = _depositAs(user, 123e6);
        assertEq(shares, 123e18);
        assertEq(vault.pricePerShare(), 1e18);
    }

    function test_secondDepositAfterFeeMintGetsFewerShares() public {
        _depositAs(user, 10_000e6);
        token.mint(address(vault), 1_000e6);
        vm.warp(block.timestamp + 365 days);
        _report(0, 1);
        uint256 preview = vault.previewDeposit(1_000e6);
        assertLt(preview, 1_000e18);
    }

    function test_capCheckUsesReportedValuation() public {
        _report(CAP - 50e6, 1);
        vm.startPrank(user);
        token.approve(address(vault), 100e6);
        vm.expectRevert(abi.encodeWithSelector(MeiVault.CapacityExceeded.selector, CAP + 50e6, CAP));
        vault.deposit(100e6, user);
        vm.stopPrank();
    }

    function test_depositToDifferentReceiverWorks() public {
        _depositTo(user, receiver, 100e6);
        assertEq(vault.balanceOf(receiver), 100e18);
        assertEq(vault.balanceOf(user), 0);
    }

    function test_mintHappyPathUsesAssets() public {
        vm.startPrank(user);
        token.approve(address(vault), 200e6);
        uint256 assets = vault.mint(200e18, user);
        vm.stopPrank();
        assertEq(assets, 200e6);
        assertEq(vault.balanceOf(user), 200e18);
    }

    function test_mintRevertsBelowMinDeposit() public {
        vm.startPrank(user);
        token.approve(address(vault), 1_000e6);
        vm.expectRevert(abi.encodeWithSelector(MeiVault.BelowMinDeposit.selector, 1e6, MIN));
        vault.mint(1e18, user);
        vm.stopPrank();
    }

    function test_depositReentrancyFromMaliciousAssetReverts() public {
        MaliciousAsset mal = new MaliciousAsset();
        vm.prank(owner);
        MeiVault malVault = new MeiVault(
            IERC20(address(mal)),
            "Mal Vault",
            "mvMAL",
            owner,
            feeRecipient,
            1_000_000 ether,
            1 ether,
            DELAY,
            STALE,
            50,
            500
        );
        mal.setVault(malVault);
        mal.mint(user, 10 ether);
        vm.startPrank(user);
        mal.approve(address(malVault), 10 ether);
        mal.setAttack(true);
        vm.expectRevert();
        malVault.deposit(2 ether, user);
        vm.stopPrank();
    }

    function test_requestRedeemLocksShares() public {
        uint256 shares = _depositAs(user, 100e6);
        uint256 id = _requestAs(user, shares, user, user);
        (address redeemer, uint256 locked, uint256 unlockAt, bool claimed) = vault.redemptions(id);
        assertEq(redeemer, user);
        assertEq(locked, shares);
        assertEq(unlockAt, block.timestamp + DELAY);
        assertFalse(claimed);
        assertEq(vault.balanceOf(address(vault)), shares);
        assertEq(vault.balanceOf(user), 0);
    }

    function test_requestRedeemWithAllowanceWorks() public {
        uint256 shares = _depositAs(user, 100e6);
        vm.prank(user);
        vault.approve(user2, shares);
        uint256 id = _requestAs(user2, shares, receiver, user);
        (address redeemer,,,) = vault.redemptions(id);
        assertEq(redeemer, receiver);
    }

    function test_requestRedeemRevertsWithoutAllowance() public {
        uint256 shares = _depositAs(user, 100e6);
        vm.prank(user2);
        vm.expectRevert();
        vault.requestRedeem(shares, user2, user);
    }

    function test_requestRedeemEmitsEvent() public {
        uint256 shares = _depositAs(user, 100e6);
        vm.prank(user);
        vm.expectEmit(true, true, true, true);
        emit RedemptionRequested(0, user, receiver, shares, block.timestamp + DELAY);
        vault.requestRedeem(shares, receiver, user);
    }

    function test_claimCannotBeforeUnlock() public {
        uint256 shares = _depositAs(user, 100e6);
        uint256 id = _requestAs(user, shares, user, user);
        vm.prank(user);
        vm.expectRevert(
            abi.encodeWithSelector(
                MeiVault.NotUnlockedYet.selector, block.timestamp + DELAY, block.timestamp
            )
        );
        vault.claim(id);
    }

    function test_claimCannotBySomeoneElse() public {
        uint256 shares = _depositAs(user, 100e6);
        uint256 id = _requestAs(user, shares, user, user);
        vm.warp(block.timestamp + DELAY);
        vm.prank(user2);
        vm.expectRevert(MeiVault.NotRedeemer.selector);
        vault.claim(id);
    }

    function test_claimCannotDoubleClaim() public {
        uint256 shares = _depositAs(user, 100e6);
        uint256 id = _requestAs(user, shares, user, user);
        vm.warp(block.timestamp + DELAY);
        _report(0, 1);
        vm.prank(user);
        vault.claim(id);
        vm.prank(user);
        vm.expectRevert(MeiVault.AlreadyClaimed.selector);
        vault.claim(id);
    }

    function test_claimBurnsSharesAndPaysAssetsAtClaimPps() public {
        uint256 shares = _depositAs(user, 100e6);
        uint256 id = _requestAs(user, shares, user, user);
        token.mint(address(vault), 10e6);
        vm.warp(block.timestamp + DELAY);
        _report(0, 1);
        uint256 expected = vault.previewRedeem(shares);
        uint256 before = token.balanceOf(user);
        vm.prank(user);
        vault.claim(id);
        assertEq(token.balanceOf(user) - before, expected);
        assertEq(vault.balanceOf(address(vault)), 0);
        assertEq(vault.balanceOf(user), 0);
    }

    function test_cancelRedemptionReturnsShares() public {
        uint256 shares = _depositAs(user, 100e6);
        uint256 id = _requestAs(user, shares, user, user);
        vm.prank(user);
        vault.cancelRedemption(id);
        assertEq(vault.balanceOf(user), shares);
        assertEq(vault.balanceOf(address(vault)), 0);
    }

    function test_cancelCannotAfterClaim() public {
        uint256 shares = _depositAs(user, 100e6);
        uint256 id = _requestAs(user, shares, user, user);
        vm.warp(block.timestamp + DELAY);
        _report(0, 1);
        vm.prank(user);
        vault.claim(id);
        vm.prank(user);
        vm.expectRevert(MeiVault.AlreadyClaimed.selector);
        vault.cancelRedemption(id);
    }

    function test_claimRevertsIfInsufficientLiquidity() public {
        uint256 shares = _depositAs(user, 100e6);
        uint256 id = _requestAs(user, shares, user, user);
        vm.warp(block.timestamp + DELAY);
        _report(100e6, 1);
        uint256 needed = vault.previewRedeem(shares);
        vm.prank(user);
        vm.expectRevert(
            abi.encodeWithSelector(MeiVault.InsufficientLiquidity.selector, needed, 100e6)
        );
        vault.claim(id);
    }

    function test_multipleConcurrentRequestsWork() public {
        uint256 s1 = _depositAs(user, 100e6);
        uint256 s2 = _depositAs(user2, 200e6);
        uint256 id1 = _requestAs(user, s1, user, user);
        uint256 id2 = _requestAs(user2, s2, user2, user2);
        vm.warp(block.timestamp + DELAY);
        _report(0, 1);
        vm.prank(user2);
        vault.claim(id2);
        vm.prank(user);
        vault.claim(id1);
        assertEq(vault.balanceOf(address(vault)), 0);
    }

    function test_claimWorksDuringPause() public {
        uint256 shares = _depositAs(user, 100e6);
        uint256 id = _requestAs(user, shares, user, user);
        _pause();
        vm.warp(block.timestamp + DELAY);
        _report(0, 1);
        vm.prank(user);
        vault.claim(id);
        assertEq(vault.balanceOf(address(vault)), 0);
    }

    function test_newRequestRedeemBlockedDuringPause() public {
        uint256 shares = _depositAs(user, 100e6);
        _pause();
        vm.prank(user);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        vault.requestRedeem(shares, user, user);
    }

    function test_requestRedeemRevertsOnStaleValuation() public {
        uint256 shares = _depositAs(user, 100e6);
        vm.warp(block.timestamp + STALE + 1);
        uint256 lastAt = vault.lastValuationAt();
        vm.prank(user);
        vm.expectRevert(
            abi.encodeWithSelector(MeiVault.ValuationStale.selector, lastAt, block.timestamp)
        );
        vault.requestRedeem(shares, user, user);
    }

    function test_onlyExecutorCanReportValuation() public {
        vm.prank(user);
        vm.expectRevert(MeiVault.NotExecutor.selector);
        vault.reportValuation(1, 1);
    }

    function test_reportRequiresMonotonicNonce() public {
        _report(1, 1);
        vm.prank(executor);
        vm.expectRevert(abi.encodeWithSelector(MeiVault.NonceNotMonotonic.selector, 1, 1));
        vault.reportValuation(1, 1);
    }

    function test_reportUpdatesTotalAssets() public {
        _depositAs(user, 100e6);
        _report(25e6, 1);
        assertEq(vault.lastValuation(), 25e6);
        assertEq(vault.totalAssets(), 125e6);
    }

    function test_staleValuationBlocksClaim() public {
        uint256 shares = _depositAs(user, 100e6);
        uint256 id = _requestAs(user, shares, user, user);
        vm.warp(block.timestamp + DELAY + STALE + 1);
        uint256 lastAt = vault.lastValuationAt();
        vm.prank(user);
        vm.expectRevert(
            abi.encodeWithSelector(MeiVault.ValuationStale.selector, lastAt, block.timestamp)
        );
        vault.claim(id);
    }

    function test_reportMintsMgmtFeeShares() public {
        _depositAs(user, 10_000e6);
        vm.warp(block.timestamp + 365 days);
        _report(0, 1);
        assertGt(vault.balanceOf(feeRecipient), 0);
    }

    function test_reportMintsPerfFeeSharesIfPpsAboveHwm() public {
        _depositAs(user, 10_000e6);
        token.mint(address(vault), 1_000e6);
        _report(0, 1);
        assertGt(vault.balanceOf(feeRecipient), 0);
    }

    function test_noPerfFeeIfPpsNotAboveHwm() public {
        _depositAs(user, 10_000e6);
        _report(0, 1);
        assertEq(vault.balanceOf(feeRecipient), 0);
    }

    function test_hwmUpdatesAfterPerfFee() public {
        _depositAs(user, 10_000e6);
        token.mint(address(vault), 1_000e6);
        _report(0, 1);
        assertGt(vault.highWaterMark(), 1e18);
        assertEq(vault.highWaterMark(), vault.pricePerShare());
    }

    function test_execOnlyExecutor() public {
        vm.prank(owner);
        vault.setAllowedTarget(address(target), true);
        vm.prank(user);
        vm.expectRevert(MeiVault.NotExecutor.selector);
        vault.exec(address(target), 0, abi.encodeWithSelector(target.ping.selector, 1));
    }

    function test_execOnlyAllowedTarget() public {
        vm.prank(executor);
        vm.expectRevert(abi.encodeWithSelector(MeiVault.TargetNotAllowed.selector, address(target)));
        vault.exec(address(target), 0, abi.encodeWithSelector(target.ping.selector, 1));
    }

    function test_execRevertsIfPaused() public {
        vm.prank(owner);
        vault.setAllowedTarget(address(target), true);
        _pause();
        vm.prank(executor);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        vault.exec(address(target), 0, abi.encodeWithSelector(target.ping.selector, 1));
    }

    function test_execBubblesTargetRevert() public {
        vm.prank(owner);
        vault.setAllowedTarget(address(target), true);
        vm.prank(executor);
        vm.expectRevert(bytes("mock revert"));
        vault.exec(address(target), 0, abi.encodeWithSelector(target.reverts.selector));
    }

    function test_execEmitsExecuted() public {
        vm.prank(owner);
        vault.setAllowedTarget(address(target), true);
        bytes memory data = abi.encodeWithSelector(target.ping.selector, 41);
        vm.prank(executor);
        vm.expectEmit(true, false, false, true);
        emit Executed(address(target), 0, data);
        vault.exec(address(target), 0, data);
    }

    function test_execNonReentrant() public {
        ReentrantExecTarget reentrant = new ReentrantExecTarget(vault);
        vm.prank(owner);
        vault.setAllowedTarget(address(reentrant), true);
        vm.prank(executor);
        vm.expectRevert();
        vault.exec(address(reentrant), 0, abi.encodeWithSelector(reentrant.attack.selector));
    }

    function test_execCanSendNativeEth() public {
        vm.deal(address(vault), 1 ether);
        vm.prank(owner);
        vault.setAllowedTarget(address(target), true);
        vm.prank(executor);
        bytes memory ret =
            vault.exec(address(target), 0.4 ether, abi.encodeWithSelector(target.ping.selector, 9));
        assertEq(abi.decode(ret, (uint256)), 10);
        assertEq(address(target).balance, 0.4 ether);
    }

    function test_execCanCallMultipleTargetsSequentially() public {
        MockTarget target2 = new MockTarget();
        vm.startPrank(owner);
        vault.setAllowedTarget(address(target), true);
        vault.setAllowedTarget(address(target2), true);
        vm.stopPrank();
        vm.prank(executor);
        vault.exec(address(target), 0, abi.encodeWithSelector(target.ping.selector, 1));
        vm.prank(executor);
        vault.exec(address(target2), 0, abi.encodeWithSelector(target2.ping.selector, 2));
        assertEq(target.calls(), 1);
        assertEq(target2.calls(), 1);
    }

    function test_ownerCannotMintWithoutAssets() public {
        vm.prank(owner);
        token.approve(address(vault), 100e6);
        vm.prank(owner);
        vm.expectRevert();
        vault.mint(100e18, owner);
    }

    function test_ownerCannotTransferUnderlyingWithMissingWithdrawFunction() public {
        _depositAs(user, 100e6);
        vm.prank(owner);
        (bool ok,) = address(vault)
            .call(abi.encodeWithSignature("withdrawAssets(address,uint256)", owner, 1));
        assertFalse(ok);
        assertEq(token.balanceOf(address(vault)), 100e6);
    }

    function test_emergencySweepCannotSweepAsset() public {
        _pause();
        vm.prank(owner);
        vm.expectRevert(MeiVault.CannotSweepAsset.selector);
        vault.emergencySweep(IERC20(address(token)), owner, 1);
    }

    function test_emergencySweepRequiresPause() public {
        MockERC20 reward = new MockERC20("Reward", "RWD", 18);
        reward.mint(address(vault), 1 ether);
        vm.prank(owner);
        vm.expectRevert(Pausable.ExpectedPause.selector);
        vault.emergencySweep(IERC20(address(reward)), owner, 1 ether);
    }

    function test_emergencySweepTransfersNonAssetWhenPaused() public {
        MockERC20 reward = new MockERC20("Reward", "RWD", 18);
        reward.mint(address(vault), 1 ether);
        _pause();
        vm.prank(owner);
        vault.emergencySweep(IERC20(address(reward)), owner, 0.4 ether);
        assertEq(reward.balanceOf(owner), 0.4 ether);
    }

    function test_pauseBlocksDepositRequestAndExec() public {
        uint256 shares = _depositAs(user, 100e6);
        vm.prank(owner);
        vault.setAllowedTarget(address(target), true);
        _pause();
        vm.startPrank(user);
        token.approve(address(vault), 100e6);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        vault.deposit(100e6, user);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        vault.requestRedeem(shares, user, user);
        vm.stopPrank();
        vm.prank(executor);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        vault.exec(address(target), 0, "");
    }

    function test_mgmtFeeStreamsLinearlyWithTime() public {
        _depositAs(user, 10_000e6);
        vm.warp(block.timestamp + 182 days);
        _report(0, 1);
        uint256 halfYearFee = vault.balanceOf(feeRecipient);
        assertGt(halfYearFee, 0);
        assertLt(halfYearFee, 50e18);
    }

    function test_noMgmtFeeIfNoTimeElapsed() public {
        _depositAs(user, 10_000e6);
        _report(0, 1);
        assertEq(vault.balanceOf(feeRecipient), 0);
    }

    function test_perfFeeChargesOnNavUp() public {
        _depositAs(user, 10_000e6);
        token.mint(address(vault), 1_000e6);
        _report(0, 1);
        assertGt(vault.balanceOf(feeRecipient), 40e18);
    }

    function test_noPerfFeeOnNavFlatOrDown() public {
        _depositAs(user, 10_000e6);
        _report(0, 1);
        uint256 fees = vault.balanceOf(feeRecipient);
        _report(0, 2);
        assertEq(vault.balanceOf(feeRecipient), fees);
    }

    function test_hwmNeverDecreases() public {
        _depositAs(user, 10_000e6);
        token.mint(address(vault), 1_000e6);
        _report(0, 1);
        uint256 hwm = vault.highWaterMark();
        _report(0, 2);
        assertGe(vault.highWaterMark(), hwm);
    }

    function test_feeSharesGoToFeeRecipient() public {
        _depositAs(user, 10_000e6);
        token.mint(address(vault), 1_000e6);
        _report(0, 1);
        assertGt(vault.balanceOf(feeRecipient), 0);
        assertEq(vault.balanceOf(owner), 0);
    }

    function test_ownerCanUpdateFeeRecipientMidFlight() public {
        vm.prank(owner);
        vault.setFeeRecipient(user2);
        _depositAs(user, 10_000e6);
        token.mint(address(vault), 1_000e6);
        _report(0, 1);
        assertGt(vault.balanceOf(user2), 0);
        assertEq(vault.balanceOf(feeRecipient), 0);
    }

    function test_feeConstructorBounds() public {
        assertEq(vault.MAX_MGMT_FEE_BPS(), 200);
        assertEq(vault.MAX_PERF_FEE_BPS(), 2500);
    }

    function test_previewDepositMatchesActualDeposit() public {
        uint256 preview = vault.previewDeposit(777e6);
        uint256 shares = _depositAs(user, 777e6);
        assertEq(shares, preview);
    }

    function test_previewRedeemMatchesActualClaimAtFreshValuation() public {
        uint256 shares = _depositAs(user, 100e6);
        assertEq(vault.previewRedeem(shares), 100e6);
    }

    function test_maxDepositReturnsRemainingCapacityWhenFresh() public {
        _depositAs(user, 100e6);
        assertEq(vault.maxDeposit(user), CAP - 100e6);
    }

    function test_maxDepositReturnsZeroWhenPaused() public {
        _pause();
        assertEq(vault.maxDeposit(user), 0);
    }

    function test_maxDepositReturnsZeroWhenStale() public {
        vm.warp(block.timestamp + STALE + 1);
        assertEq(vault.maxDeposit(user), 0);
    }

    function test_maxMintDerivedFromCapacity() public {
        _depositAs(user, 100e6);
        assertEq(vault.maxMint(user), (CAP - 100e6) * 1e12);
    }

    function test_maxRedeemAndMaxWithdrawUseOwnerBalance() public {
        _depositAs(user, 250e6);
        assertEq(vault.maxRedeem(user), 250e18);
        assertEq(vault.maxWithdraw(user), 250e6);
    }

    function test_pricePerShareZeroSupplyIsOne() public view {
        assertEq(vault.pricePerShare(), 1e18);
    }

    function test_redemptionDelayGetter() public view {
        assertEq(vault.redemptionDelay(), DELAY);
    }

    function test_getRedemptionReturnsStruct() public {
        uint256 shares = _depositAs(user, 100e6);
        uint256 id = _requestAs(user, shares, receiver, user);
        MeiVault.RedemptionRequest memory request = vault.getRedemption(id);
        assertEq(request.owner, receiver);
        assertEq(request.shares, shares);
    }

    function test_rawEthReceiveReverts() public {
        vm.deal(user, 1 ether);
        vm.prank(user);
        (bool ok,) = address(vault).call{value: 1 ether}("");
        assertFalse(ok);
    }

    function invariant_totalAssetsEqualsIdlePlusReported() public view {
        assertEq(vault.totalAssets(), token.balanceOf(address(vault)) + vault.lastValuation());
    }
}
