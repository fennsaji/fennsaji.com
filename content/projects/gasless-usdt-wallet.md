---
title: Gasless USDT Wallet
description: Cross-platform USDT wallet with zero gas fees for users. Uses EIP-7702 account delegation for sponsored transactions on BSC.
tech: [Solidity, TypeScript, Kotlin, Blockchain, Hardhat]
featured: false
year: 2025
---

Gasless wallet using EIP-7702 account delegation — a relayer sponsors gas so users transfer USDT without holding BNB. Smart contracts include a Treasury Circuit Breaker that routes fees to escrow if the treasury is unavailable, ensuring user transfers never revert. Ships as Web, Android, and iOS demos.
