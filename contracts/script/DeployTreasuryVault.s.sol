// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {TreasuryVault} from "../src/TreasuryVault.sol";

/// @notice Deploy script for TreasuryVault.
///
/// Required env vars:
///   EXECUTOR_PRIVATE_KEY  Deployer key (broadcast). Matches the signer
///                         library's env var so the same key can serve as
///                         deployer + initial owner + executor on testnet.
///                         For production, SEPARATE these roles — collapsed
///                         keys mean compromising one rotates everything.
///   PRIVATE_KEY           Fallback name for the deployer key (legacy).
///
/// Optional env vars:
///   VAULT_OWNER           Initial owner address. Defaults to the deployer
///                         address (vm.addr of the broadcast key).
///
/// Usage:
///   forge script script/DeployTreasuryVault.s.sol \
///     --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast
contract DeployTreasuryVault is Script {
    function run() external {
        uint256 deployerKey;
        try vm.envUint("EXECUTOR_PRIVATE_KEY") returns (uint256 k) {
            deployerKey = k;
        } catch {
            deployerKey = vm.envUint("PRIVATE_KEY");
        }
        address deployer = vm.addr(deployerKey);

        address owner;
        try vm.envAddress("VAULT_OWNER") returns (address o) {
            owner = o;
        } catch {
            owner = deployer;
        }

        console2.log("Chain id:", block.chainid);
        console2.log("Deployer:", deployer);
        console2.log("Initial owner:", owner);

        vm.startBroadcast(deployerKey);
        TreasuryVault vault = new TreasuryVault(owner);
        vm.stopBroadcast();

        console2.log("TreasuryVault deployed:", address(vault));
    }
}
