# Pool ranking — 2026-05-08T17:47:15.469Z

## prism
pools=44 healthy=4 dead=16 avgRiskBps=3727
findings:
  - [high] P1 Factory owner is an EOA, not a multisig
  - [high] P2 16/44 pools (36%) are dead-on-arrival
  - [high] P3 7 pool(s) pair a known scam-template token
  - [medium] P4 36/44 pools (82%) have oracle cardinality = 1
  - [medium] P5 15 pool(s) pair a token with mint() selector

## kumbaya
pools=108 healthy=0 dead=2 avgRiskBps=1306
findings:
  - [high] P1 Factory owner is an EOA, not a multisig
  - [medium] P4 102/108 pools (94%) have oracle cardinality = 1
  - [medium] P5 25 pool(s) pair a token with mint() selector

## kumbaya
pools=680 healthy=1 dead=52 avgRiskBps=1765
findings:
  - [medium] P4 673/680 pools (99%) have oracle cardinality = 1
  - [medium] P5 35 pool(s) pair a token with mint() selector

## Top 10 safest pools (ascending riskBps)
| protocol | pool | fee | riskBps | liquidity | cardinality | reasons |
|---|---|---|---|---|---|---|
| prism | 0xC2FaC0B5… | 3000 | 0 | 167635009493907629956080 | 2000 | — |
| prism | 0x41cB3DD6… | 100 | 0 | 4292227237343696860635 | 2000 | — |
| prism | 0xd2C7D4B8… | 3000 | 0 | 199097622119044 | 2000 | — |
| prism | 0xad284761… | 3000 | 0 | 209649495 | 2000 | — |
| kumbaya | 0x6bD9eeF2… | 10000 | 0 | 398134912017050790482087 | 100 | — |
| prism | 0xF80aA221… | 3000 | 500 | 167270473651135962871805 | 1 | shallow oracle cardinality: 1 |
| prism | 0x4907d5a1… | 3000 | 500 | 1581138830084189665999 | 1 | shallow oracle cardinality: 1 |
| prism | 0x529D809b… | 3000 | 500 | 1079580839626683677727 | 1 | shallow oracle cardinality: 1 |
| prism | 0x6c9BF019… | 100 | 500 | 214747572508465216608 | 1 | shallow oracle cardinality: 1 |
| prism | 0x72918230… | 3000 | 500 | 5285637813288 | 1 | shallow oracle cardinality: 1 |

Wrote /Users/meimighty/Desktop/Trading/riskclaw-daemon/audits/ranked.json (827 pools)
