// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable2Step, Ownable} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title TreasuryVault
/// @notice Mei-vault Phase 4 treasury. Owner-funded, executor-operated.
/// @dev    The executor is a bounded-delegation signer (off-chain TEE policy
///         enforces riskclaw gates). On-chain, the executor is constrained
///         to call only contracts on an owner-managed allowlist (e.g. Uniswap
///         V3/V4 PositionManager, swap routers). The vault itself enforces
///         only *what* the executor can hit, not *how* — that's deliberate:
///         it keeps the audit surface small and the off-chain policy is the
///         actual safety layer.
///
///         Security model:
///           - Owner (Ownable2Step) can deposit, withdraw, set executor,
///             manage target allowlist, pause/unpause executor.
///           - Executor can only invoke exec() while not paused, only against
///             allowlisted targets. Cannot transfer arbitrary tokens out of
///             the vault except via approved router/PositionManager contracts.
///           - Pause is owner-only and only blocks new exec() calls. Existing
///             positions stay live; owner withdraws them via direct calls
///             through exec() while paused — wait, no: pause blocks exec()
///             entirely. To unwind a position while paused, owner must first
///             unpause. This is by design: pause is the "stop everything"
///             switch and unpause is the deliberate re-engagement.
contract TreasuryVault is Ownable2Step, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ─── state ──────────────────────────────────────────────────────────

    /// @notice Bounded-delegation signer authorized to call exec().
    ///         address(0) disables the executor without touching the allowlist.
    address public executor;

    /// @notice Contracts the executor is allowed to call via exec().
    mapping(address => bool) public allowedTarget;

    // ─── events ─────────────────────────────────────────────────────────

    event ExecutorSet(address indexed previous, address indexed current);
    event TargetAllowed(address indexed target, bool allowed);
    event Executed(address indexed target, uint256 value, bytes data);
    event WithdrawnERC20(address indexed token, address indexed to, uint256 amount);
    event WithdrawnETH(address indexed to, uint256 amount);
    event DepositedERC20(address indexed token, address indexed from, uint256 amount);
    event DepositedETH(address indexed from, uint256 amount);

    // ─── errors ─────────────────────────────────────────────────────────

    error NotExecutor();
    error TargetNotAllowed(address target);
    error ZeroAddress();
    error ETHTransferFailed();

    // ─── constructor ────────────────────────────────────────────────────

    /// @param initialOwner The single-key owner. Migrate to a multisig before
    ///        the vault holds material capital; Ownable2Step makes that safe.
    constructor(address initialOwner) Ownable(initialOwner) {
        if (initialOwner == address(0)) revert ZeroAddress();
    }

    // ─── modifiers ──────────────────────────────────────────────────────

    modifier onlyExecutor() {
        if (msg.sender != executor) revert NotExecutor();
        _;
    }

    // ─── owner: configuration ───────────────────────────────────────────

    /// @notice Set the bounded-delegation signer. Pass address(0) to disable.
    function setExecutor(address newExecutor) external onlyOwner {
        emit ExecutorSet(executor, newExecutor);
        executor = newExecutor;
    }

    /// @notice Add or remove a target from the executor's allowlist.
    function setAllowedTarget(address target, bool allowed) external onlyOwner {
        if (target == address(0)) revert ZeroAddress();
        allowedTarget[target] = allowed;
        emit TargetAllowed(target, allowed);
    }

    /// @notice Pause the executor. Existing positions are unaffected; only
    ///         new exec() calls are blocked.
    function pauseExecutor() external onlyOwner {
        _pause();
    }

    /// @notice Unpause the executor.
    function unpauseExecutor() external onlyOwner {
        _unpause();
    }

    // ─── owner: capital management ──────────────────────────────────────

    /// @notice Withdraw ERC20 tokens to an arbitrary address. Owner-only.
    function withdrawERC20(IERC20 token, address to, uint256 amount) external onlyOwner {
        if (to == address(0)) revert ZeroAddress();
        token.safeTransfer(to, amount);
        emit WithdrawnERC20(address(token), to, amount);
    }

    /// @notice Withdraw native ETH to an arbitrary address. Owner-only.
    function withdrawETH(address payable to, uint256 amount) external onlyOwner nonReentrant {
        if (to == address(0)) revert ZeroAddress();
        (bool ok,) = to.call{value: amount}("");
        if (!ok) revert ETHTransferFailed();
        emit WithdrawnETH(to, amount);
    }

    // ─── public: deposits ───────────────────────────────────────────────

    /// @notice Pull ERC20 tokens into the vault. Anyone can deposit (the
    ///         depositor must first approve the vault to spend their tokens).
    function depositERC20(IERC20 token, uint256 amount) external {
        token.safeTransferFrom(msg.sender, address(this), amount);
        emit DepositedERC20(address(token), msg.sender, amount);
    }

    /// @notice Accept native ETH deposits.
    receive() external payable {
        emit DepositedETH(msg.sender, msg.value);
    }

    // ─── executor: bounded delegation ───────────────────────────────────

    /// @notice Execute a call against an allowlisted target. The executor's
    ///         off-chain TEE policy is the actual riskclaw gate; the contract
    ///         only constrains the set of contracts the executor can hit.
    /// @param target Contract to call. Must be in allowedTarget.
    /// @param value  Native ETH to send.
    /// @param data   Calldata to forward.
    /// @return result Raw return data from the target call.
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
            // bubble up the revert reason for off-chain debuggability
            assembly {
                revert(add(ret, 32), mload(ret))
            }
        }
        emit Executed(target, value, data);
        return ret;
    }
}
