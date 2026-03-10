---
title: DID Identity Backend
description: Rust backend suite for decentralised identity. Handles DID authentication, pairwise trust, WebSocket-based DID communication, and public identity subscriptions.
tech: [Rust, TypeScript, Blockchain]
featured: false
year: 2023
---

Two cooperating Rust services for a DID-native identity platform. The auth server implements pairwise trust establishment, DID-based authentication, and public identity subscriptions (fiat + token payments) using a clean Router → Handler → Controller → Service architecture. The communication service handles real-time DID-to-DID messaging over WebSockets with Redis-backed session caching, multi-network agent support, and Dockerised deployment.
