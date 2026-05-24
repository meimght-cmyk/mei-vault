// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {MeiVault} from "../src/MeiVault.sol";

/// @notice Deploy the three MeiVault tiers (Conservative / Balanced / Edge) per
///         spec §11. Each tier is its own immutable deployment with its own
///         constructor parameters.
///
/// Required env vars:
///   EXECUTOR_PRIVATE_KEY     Deployer key. On testnet the deployer can double
///                            as the executor; on mainnet they MUST be separate
///                            (see VAULT_EXECUTOR / VAULT_OWNER below).
///
/// Optional env vars:
///   VAULT_OWNER              Initial owner. Mainnet: 3-of-5 Safe multisig.
///                            Default: deployer.
///   VAULT_FEE_RECIPIENT      Where mgmt + perf fee shares mint to.
///                            Mainnet: separate Safe. Default: deployer.
///   VAULT_EXECUTOR           Executor address set post-deploy via setExecutor.
///                            Default: deployer.
///   TIER                     "all" (default), "conservative", "balanced", or "edge"
///                            Useful for partial / re-deploys.
///   ASSET                    Override the asset address. If unset, picks the
///                            chain-default USDC from the table below.
///
/// Usage (Base Sepolia, all three tiers):
///   forge script script/DeployMeiVaults.s.sol --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast
///
/// Usage (Base mainnet, single tier with explicit roles):
///   VAULT_OWNER=0x... VAULT_FEE_RECIPIENT=0x... VAULT_EXECUTOR=0x... TIER=conservative \
///     forge script script/DeployMeiVaults.s.sol --rpc-url $BASE_RPC_URL --broadcast
contract DeployMeiVaults is Script {
    // ─── chain-default asset addresses ──────────────────────────────────

    address internal constant USDC_BASE_MAINNET = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
    address internal constant USDC_BASE_SEPOLIA = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;

    // ─── allowlist seed (Base Sepolia; mainnet TBD before deploy) ───────

    address internal constant V3_PM_BASE_SEPOLIA = 0x27F971cb582BF9E50F397e4d29a5C7A34f11faA2;
    address internal constant V4_PM_BASE_SEPOLIA = 0x4B2C77d209D3405F41a037Ec6c77F7F5b8e2ca80;
    address internal constant UNIVERSAL_ROUTER_BASE_SEPOLIA =
        0x492E6456D9528771018DeB9E87ef7750EF184104;

    // ─── per-tier parameters (spec §11) ─────────────────────────────────

    struct TierParams {
        string name;
        string symbol;
        uint256 capacityCap;
        uint256 minDeposit;
        uint256 withdrawalDelaySeconds;
        uint256 valuationStalenessSeconds;
        uint256 mgmtFeeBps;
        uint256 perfFeeBps;
    }

    function _conservative() internal pure returns (TierParams memory) {
        return TierParams({
            name: "Mei Conservative Vault",
            symbol: "mvUSDC-C",
            capacityCap: 250_000e6,
            minDeposit: 100e6,
            withdrawalDelaySeconds: 86_400,
            valuationStalenessSeconds: 3_600,
            mgmtFeeBps: 50,
            perfFeeBps: 500
        });
    }

    function _balanced() internal pure returns (TierParams memory) {
        return TierParams({
            name: "Mei Balanced Vault",
            symbol: "mvUSDC-B",
            capacityCap: 100_000e6,
            minDeposit: 500e6,
            withdrawalDelaySeconds: 604_800,
            valuationStalenessSeconds: 3_600,
            mgmtFeeBps: 100,
            perfFeeBps: 1_000
        });
    }

    function _edge() internal pure returns (TierParams memory) {
        return TierParams({
            name: "Mei Edge Vault",
            symbol: "mvUSDC-E",
            capacityCap: 25_000e6,
            minDeposit: 1_000e6,
            withdrawalDelaySeconds: 1_209_600,
            valuationStalenessSeconds: 1_800,
            mgmtFeeBps: 200,
            perfFeeBps: 2_000
        });
    }

    // ─── entry ──────────────────────────────────────────────────────────

    function run() external {
        uint256 deployerKey = _readDeployerKey();
        address deployer = vm.addr(deployerKey);

        address owner = _envOr("VAULT_OWNER", deployer);
        address feeRecipient = _envOr("VAULT_FEE_RECIPIENT", deployer);
        address executor = _envOr("VAULT_EXECUTOR", deployer);
        address asset = _resolveAsset();
        string memory tier = _envOrString("TIER", "all");

        console2.log("Chain id        :", block.chainid);
        console2.log("Deployer        :", deployer);
        console2.log("Vault owner     :", owner);
        console2.log("Fee recipient   :", feeRecipient);
        console2.log("Executor        :", executor);
        console2.log("Asset (USDC)    :", asset);
        console2.log("Tier to deploy  :", tier);

        if (owner == deployer || feeRecipient == deployer || executor == deployer) {
            console2.log("");
            console2.log("WARNING: roles collapsed onto deployer. OK for testnet, MUST separate for mainnet.");
        }

        vm.startBroadcast(deployerKey);

        if (_strEq(tier, "all") || _strEq(tier, "conservative")) {
            _deployTier("conservative", _conservative(), asset, owner, feeRecipient, executor);
        }
        if (_strEq(tier, "all") || _strEq(tier, "balanced")) {
            _deployTier("balanced", _balanced(), asset, owner, feeRecipient, executor);
        }
        if (_strEq(tier, "all") || _strEq(tier, "edge")) {
            _deployTier("edge", _edge(), asset, owner, feeRecipient, executor);
        }

        vm.stopBroadcast();
    }

    function _deployTier(
        string memory label,
        TierParams memory p,
        address asset,
        address owner,
        address feeRecipient,
        address executor
    ) internal returns (MeiVault vault) {
        vault = new MeiVault(
            IERC20(asset),
            p.name,
            p.symbol,
            owner,
            feeRecipient,
            p.capacityCap,
            p.minDeposit,
            p.withdrawalDelaySeconds,
            p.valuationStalenessSeconds,
            p.mgmtFeeBps,
            p.perfFeeBps
        );

        console2.log("");
        console2.log(string.concat("Deployed Mei", _capitalize(label), "Vault"));
        console2.log("  Address       :", address(vault));
        console2.log("  Symbol        :", p.symbol);
        console2.log("  Cap (asset)   :", p.capacityCap);

        // post-deploy wiring is owner-only. The deployer is only the initial
        // owner on testnet. On mainnet with a Safe owner, post-deploy txs must
        // be queued through the Safe; we skip the setExecutor/allowedTarget
        // calls here and emit a console hint instead.
        if (msg.sender == owner) {
            vault.setExecutor(executor);
            console2.log("  Executor set  :", executor);
            _seedAllowlist(vault);
        } else {
            console2.log(
                "  setExecutor + allowlist seed must be queued through the owner multisig"
            );
        }
    }

    function _seedAllowlist(MeiVault vault) internal {
        // Base Sepolia allowlist seed. Mainnet addresses must be confirmed and
        // set with separate owner calls before any capital is deposited.
        if (block.chainid == 84532) {
            vault.setAllowedTarget(V3_PM_BASE_SEPOLIA, true);
            vault.setAllowedTarget(V4_PM_BASE_SEPOLIA, true);
            vault.setAllowedTarget(UNIVERSAL_ROUTER_BASE_SEPOLIA, true);
            console2.log("  Allowlist     : V3PM + V4PM + UniversalRouter (Base Sepolia)");
        } else {
            console2.log("  Allowlist     : NOT seeded (chain not Base Sepolia; do this manually)");
        }
    }

    // ─── helpers ────────────────────────────────────────────────────────

    function _resolveAsset() internal view returns (address) {
        try vm.envAddress("ASSET") returns (address a) {
            return a;
        } catch {}
        if (block.chainid == 8453) return USDC_BASE_MAINNET;
        if (block.chainid == 84532) return USDC_BASE_SEPOLIA;
        revert("ASSET env var required for unknown chain");
    }

    function _readDeployerKey() internal view returns (uint256) {
        try vm.envUint("EXECUTOR_PRIVATE_KEY") returns (uint256 k) {
            return k;
        } catch {
            return vm.envUint("PRIVATE_KEY");
        }
    }

    function _envOr(string memory key, address fallback_) internal view returns (address) {
        try vm.envAddress(key) returns (address v) {
            return v;
        } catch {
            return fallback_;
        }
    }

    function _envOrString(string memory key, string memory fallback_)
        internal
        view
        returns (string memory)
    {
        try vm.envString(key) returns (string memory v) {
            return v;
        } catch {
            return fallback_;
        }
    }

    function _strEq(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    function _capitalize(string memory s) internal pure returns (string memory) {
        bytes memory b = bytes(s);
        if (b.length == 0) return s;
        if (b[0] >= 0x61 && b[0] <= 0x7A) b[0] = bytes1(uint8(b[0]) - 32);
        return string(b);
    }
}
