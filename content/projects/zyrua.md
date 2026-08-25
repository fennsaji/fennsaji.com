---
title: Zyrua
description: Privacy-first KYC platform using zero-knowledge proofs. Verify identity attributes without revealing personal data. GDPR-compliant, ongoing.
tech: [Rust, TypeScript, React, ZKP]
github: https://github.com/fennsaji/zyrua
featured: true
order: 4
year: 2025
problem: >
  KYC and age/nationality checks normally require handing raw personal
  data to whoever's asking, and storing that data anywhere creates a
  breach liability and a GDPR problem. The goal was to let a user prove
  a fact about their identity — "I'm over 18," "I'm a resident of X" —
  without the verifier ever seeing the underlying document or data.
architecture: >
  Zero-knowledge circuits (Circom) generate proofs client-side over
  identity attributes; snarkjs verifies them without the raw data ever
  leaving the user's device. Backend in Rust (Actix-web) handles proof
  verification and session state; frontend in React + Vite handles
  attribute selection and proof generation.
decisions:
  - "Client-side proof generation: keeps raw identity data off the wire entirely, which is the actual GDPR win, not just a compliance checkbox."
  - "Circom + snarkjs over a heavier ZK stack: smaller circuit development surface for attribute-style proofs (age, residency) versus general-purpose computation."
  - "Rust for verification: proof verification is the security-critical path, and Actix-web's throughput matters if verification runs per-request at scale."
results: >
  Working end-to-end flow from attribute selection to proof
  verification; ongoing development toward production GDPR
  compliance review.
---

Privacy-first identity verification using zero-knowledge proofs (Circom + snarkjs). Users prove attributes like age or nationality without exposing raw data. Backend in Rust (Actix-web), frontend in React + Vite. Ongoing project.
