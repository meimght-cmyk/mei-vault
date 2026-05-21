// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {TreasuryVault} from "../src/TreasuryVault.sol";

/// @notice Deploy script for TreasuryVault.
///
/// Required env vars:
///   VAULT_OWNER       Address that will own the deployed vault.
///   PRIVATE_KEY       Deployer key (broadcast).
///
/// Usage:
///   forge script script/DeployTreasuryVault.s.sol --rpc-url $BASE_RPC_URL --broadcast
contract DeployTreasuryVault is Script {
    function run() external {
        address owner = vm.envAddress("VAULT_OWNER");
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        TreasuryVault vault = new TreasuryVault(owner);
        vm.stopBroadcast();

        console2.log("TreasuryVault deployed:", address(vault));
        console2.log("Owner:", owner);
    }
}
