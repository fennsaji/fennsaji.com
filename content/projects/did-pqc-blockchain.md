---
title: DID-Native Post-Quantum Blockchain
description: Quantum-safe blockchain where decentralised identity is the core primitive, plus the Rust backend services around it. Custom Rust framework, post-quantum signatures from genesis, instant finality.
tech: [Rust, Blockchain, Cryptography, DID, TypeScript]
featured: true
order: 2
year: 2025
problem: >
  Most identity chains bolt DIDs onto an account-based ledger and sign
  with classical curves a quantum computer breaks. This one needed
  identity to be the primitive — no account IDs anywhere — and needed to
  be post-quantum from the first block rather than migrated later.
architecture: >
  Started in 2021 as a Substrate chain; rebuilt as a custom Rust
  framework. Every transaction and block is signed with Falcon-512,
  with ML-KEM-768 for encrypted DID messaging. Consensus is
  threshold-signature based: blocks are produced on demand when
  transactions arrive and are final once a validator threshold signs,
  typically in well under a second. Rust backend services handle DID
  authentication, pairwise trust, and real-time DID-to-DID messaging
  over WebSockets — they relay and verify but never hold signing keys.
decisions:
  - "DID as the only identity primitive: keys, nonces, and authorisation all resolve through the on-chain DID registry, so there is no account layer to reconcile against."
  - "Post-quantum from genesis, not a later migration: one set of primitives shared by on-chain and off-chain protocols, no classical-crypto legacy to unwind."
  - "Thin chain, conduit services: verification lives on-chain; backend services orchestrate but hold no fund-moving authority."
results: >
  Production chain with DID, balances, governance, and bridge pallets,
  native Rust and TypeScript SDKs, a block explorer, and a migration
  path from the original Substrate network. Actively developed.
---
