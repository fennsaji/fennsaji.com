---
title: Substrate Blockchain with Custom Consensus
description: Production-ready Substrate blockchain with a custom instant-confirmation consensus. Event-driven block production, fee-free transactions, and multi-layer spam protection.
tech: [Rust, Substrate, Blockchain]
featured: true
order: 1
year: 2025
problem: >
  Standard Substrate chains produce blocks on a fixed timer regardless of
  whether there's anything to confirm, wasting slots and adding latency
  between a transaction landing and it being final. The goal was
  instant confirmation without giving up Byzantine fault tolerance or
  opening the chain to spam once fees are removed.
architecture: >
  Custom event-driven block authoring on top of Substrate: a block is
  only produced when a transaction arrives, collapsing the usual
  slot-wait latency to near zero. GRANDPA handles finality so blocks
  are provably final rather than probabilistically final. Rate
  limiting and spam protection run as a separate multi-layer pipeline
  in front of the transaction pool, since fee-free transactions remove
  the usual economic spam deterrent.
decisions:
  - "Event-driven authoring instead of fixed slots: trades idle-CPU savings for lower latency, since the chain's load profile is bursty, not constant."
  - "Fee-free transactions: removes the friction the wallet UX needed, but pushed spam protection into a dedicated multi-layer filter instead of relying on gas costs."
  - "Environment-specific runtime configs (dev/staging/production) so consensus parameters can be tuned per environment without a runtime upgrade."
results: >
  Production-ready chain with sub-second confirmation and zero
  end-user transaction fees, running with environment-specific
  configurations across development, staging, and production.
---

Substrate-based blockchain with a custom consensus engine built for instant transaction confirmation. Blocks are produced only when transactions arrive — no empty blocks, no wasted slots. Transactions are fee-free with GRANDPA finality for Byzantine fault tolerance. Includes multi-layer rate limiting and spam protection, with environment-specific configurations for development, staging, and production deployments.
