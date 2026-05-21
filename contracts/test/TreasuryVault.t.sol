// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {TreasuryVault} from "../src/TreasuryVault.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

contract MockERC20 is ERC20 {
    constructor(string memory n, string memory s) ERC20(n, s) {}
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

/// @notice Target the executor is allowed to call. Has a "withdraw token to
///         arbitrary address" function — if exec is misused, this would let
///         a compromised executor drain the vault. Tests use it to confirm
///         that's *only* possible when the target is allowlisted.
contract MockTarget {
    event Pinged(uint256 value, bytes data);
    uint256 public lastValue;
    bytes public lastData;

    function ping(uint256 magic) external payable returns (uint256) {
        lastValue = msg.value;
        lastData = abi.encode(magic);
        emit Pinged(msg.value, lastData);
        return magic + 1;
    }

    function reverts() external pure {
        revert("MockTarget: intentional revert");
    }
}

/// @notice Reentrancy attack contract — when exec() calls into this, this
///         tries to re-enter exec() from within. ReentrancyGuard must block.
contract ReentrantTarget {
    TreasuryVault public vault;

    constructor(TreasuryVault v) {
        vault = v;
    }

    function attack() external payable returns (bool) {
        // Try to re-enter via another exec call. Should revert.
        vault.exec(address(this), 0, abi.encodeWithSelector(this.attack.selector));
        return true;
    }
}

contract TreasuryVaultTest is Test {
    TreasuryVault vault;
    MockERC20 token;
    MockTarget target;
    address owner = address(0xA11CE);
    address executor = address(0xE0E0);
    address user = address(0xBEEF);
    address pendingOwner = address(0xCAFE);

    function setUp() public {
        vm.prank(owner);
        vault = new TreasuryVault(owner);

        token = new MockERC20("Mock", "MCK");
        target = new MockTarget();
    }

    // ─── constructor ────────────────────────────────────────────────────

    function test_constructor_setsOwner() public view {
        assertEq(vault.owner(), owner);
    }

    function test_constructor_revertsOnZeroOwner() public {
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableInvalidOwner.selector, address(0)));
        new TreasuryVault(address(0));
    }

    // ─── ownership transfer (Ownable2Step) ──────────────────────────────

    function test_ownershipTransfer_requiresAcceptance() public {
        vm.prank(owner);
        vault.transferOwnership(pendingOwner);
        // Old owner still owner until pendingOwner accepts.
        assertEq(vault.owner(), owner);
        assertEq(vault.pendingOwner(), pendingOwner);

        vm.prank(pendingOwner);
        vault.acceptOwnership();
        assertEq(vault.owner(), pendingOwner);
    }

    // ─── setExecutor ────────────────────────────────────────────────────

    function test_setExecutor_byOwner() public {
        vm.prank(owner);
        vault.setExecutor(executor);
        assertEq(vault.executor(), executor);
    }

    function test_setExecutor_revertsForNonOwner() public {
        vm.prank(user);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user));
        vault.setExecutor(executor);
    }

    function test_setExecutor_canDisable() public {
        vm.startPrank(owner);
        vault.setExecutor(executor);
        vault.setExecutor(address(0));
        vm.stopPrank();
        assertEq(vault.executor(), address(0));
    }

    // ─── setAllowedTarget ───────────────────────────────────────────────

    function test_setAllowedTarget_byOwner() public {
        vm.prank(owner);
        vault.setAllowedTarget(address(target), true);
        assertTrue(vault.allowedTarget(address(target)));

        vm.prank(owner);
        vault.setAllowedTarget(address(target), false);
        assertFalse(vault.allowedTarget(address(target)));
    }

    function test_setAllowedTarget_revertsOnZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert(TreasuryVault.ZeroAddress.selector);
        vault.setAllowedTarget(address(0), true);
    }

    function test_setAllowedTarget_revertsForNonOwner() public {
        vm.prank(user);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user));
        vault.setAllowedTarget(address(target), true);
    }

    // ─── pause / unpause ────────────────────────────────────────────────

    function test_pause_blocksExec() public {
        vm.startPrank(owner);
        vault.setExecutor(executor);
        vault.setAllowedTarget(address(target), true);
        vault.pauseExecutor();
        vm.stopPrank();

        vm.prank(executor);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        vault.exec(address(target), 0, abi.encodeWithSelector(target.ping.selector, 42));
    }

    function test_unpause_restoresExec() public {
        vm.startPrank(owner);
        vault.setExecutor(executor);
        vault.setAllowedTarget(address(target), true);
        vault.pauseExecutor();
        vault.unpauseExecutor();
        vm.stopPrank();

        vm.prank(executor);
        bytes memory ret = vault.exec(address(target), 0, abi.encodeWithSelector(target.ping.selector, 42));
        assertEq(abi.decode(ret, (uint256)), 43);
    }

    function test_pause_revertsForNonOwner() public {
        vm.prank(user);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user));
        vault.pauseExecutor();
    }

    // ─── depositERC20 ───────────────────────────────────────────────────

    function test_depositERC20_pullsTokens() public {
        token.mint(user, 1000e18);
        vm.startPrank(user);
        token.approve(address(vault), 1000e18);
        vault.depositERC20(IERC20(address(token)), 1000e18);
        vm.stopPrank();
        assertEq(token.balanceOf(address(vault)), 1000e18);
        assertEq(token.balanceOf(user), 0);
    }

    function test_depositERC20_anyoneCanCall() public {
        token.mint(executor, 500e18);
        vm.startPrank(executor);
        token.approve(address(vault), 500e18);
        vault.depositERC20(IERC20(address(token)), 500e18);
        vm.stopPrank();
        assertEq(token.balanceOf(address(vault)), 500e18);
    }

    // ─── receive (ETH deposit) ──────────────────────────────────────────

    function test_receive_acceptsETH() public {
        vm.deal(user, 1 ether);
        vm.prank(user);
        (bool ok,) = address(vault).call{value: 1 ether}("");
        assertTrue(ok);
        assertEq(address(vault).balance, 1 ether);
    }

    // ─── withdrawERC20 ──────────────────────────────────────────────────

    function test_withdrawERC20_byOwner() public {
        token.mint(address(vault), 1000e18);
        vm.prank(owner);
        vault.withdrawERC20(IERC20(address(token)), user, 600e18);
        assertEq(token.balanceOf(user), 600e18);
        assertEq(token.balanceOf(address(vault)), 400e18);
    }

    function test_withdrawERC20_revertsForNonOwner() public {
        token.mint(address(vault), 1000e18);
        vm.prank(user);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user));
        vault.withdrawERC20(IERC20(address(token)), user, 600e18);
    }

    function test_withdrawERC20_revertsOnZeroAddress() public {
        token.mint(address(vault), 1000e18);
        vm.prank(owner);
        vm.expectRevert(TreasuryVault.ZeroAddress.selector);
        vault.withdrawERC20(IERC20(address(token)), address(0), 600e18);
    }

    // ─── withdrawETH ────────────────────────────────────────────────────

    function test_withdrawETH_byOwner() public {
        vm.deal(address(vault), 2 ether);
        vm.prank(owner);
        vault.withdrawETH(payable(user), 1 ether);
        assertEq(user.balance, 1 ether);
        assertEq(address(vault).balance, 1 ether);
    }

    function test_withdrawETH_revertsForNonOwner() public {
        vm.deal(address(vault), 1 ether);
        vm.prank(user);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user));
        vault.withdrawETH(payable(user), 1 ether);
    }

    // ─── exec ───────────────────────────────────────────────────────────

    function test_exec_succeedsForAllowedTarget() public {
        vm.startPrank(owner);
        vault.setExecutor(executor);
        vault.setAllowedTarget(address(target), true);
        vm.stopPrank();

        vm.prank(executor);
        bytes memory ret = vault.exec(address(target), 0, abi.encodeWithSelector(target.ping.selector, 100));
        assertEq(abi.decode(ret, (uint256)), 101);
    }

    function test_exec_forwardsETH() public {
        vm.deal(address(vault), 1 ether);
        vm.startPrank(owner);
        vault.setExecutor(executor);
        vault.setAllowedTarget(address(target), true);
        vm.stopPrank();

        vm.prank(executor);
        vault.exec(address(target), 0.5 ether, abi.encodeWithSelector(target.ping.selector, 7));
        assertEq(address(target).balance, 0.5 ether);
        assertEq(target.lastValue(), 0.5 ether);
    }

    function test_exec_revertsForUnauthorizedCaller() public {
        vm.startPrank(owner);
        vault.setExecutor(executor);
        vault.setAllowedTarget(address(target), true);
        vm.stopPrank();

        vm.prank(user);
        vm.expectRevert(TreasuryVault.NotExecutor.selector);
        vault.exec(address(target), 0, abi.encodeWithSelector(target.ping.selector, 1));
    }

    function test_exec_revertsForDisallowedTarget() public {
        vm.prank(owner);
        vault.setExecutor(executor);

        vm.prank(executor);
        vm.expectRevert(abi.encodeWithSelector(TreasuryVault.TargetNotAllowed.selector, address(target)));
        vault.exec(address(target), 0, abi.encodeWithSelector(target.ping.selector, 1));
    }

    function test_exec_bubblesUpRevert() public {
        vm.startPrank(owner);
        vault.setExecutor(executor);
        vault.setAllowedTarget(address(target), true);
        vm.stopPrank();

        vm.prank(executor);
        vm.expectRevert(bytes("MockTarget: intentional revert"));
        vault.exec(address(target), 0, abi.encodeWithSelector(target.reverts.selector));
    }

    function test_exec_blocksReentrancy() public {
        ReentrantTarget reentrant = new ReentrantTarget(vault);
        vm.startPrank(owner);
        vault.setExecutor(executor);
        vault.setAllowedTarget(address(reentrant), true);
        vm.stopPrank();

        // exec → reentrant.attack() → vault.exec() (should revert)
        // The outer call bubbles up the inner ReentrancyGuardReentrantCall.
        vm.prank(executor);
        vm.expectRevert();
        vault.exec(address(reentrant), 0, abi.encodeWithSelector(reentrant.attack.selector));
    }
}
