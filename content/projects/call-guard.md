---
title: Call Shield
description: AI-powered spam call screening for Android. Blocks unwanted calls before they ring. Custom blocking rules available.
tech: [Android, Kotlin, Firebase, Supabase]
github: https://github.com/fennsaji/call-guard
featured: false
year: 2024
problem: >
  Spam-call screening on Android has a hard latency budget — the OS
  gives a CallScreeningService a narrow window to decide whether to
  block a call before it rings. A cloud round-trip for scoring risks
  missing that window entirely.
architecture: >
  Spam-probability inference runs entirely on-device: a Rust inference
  engine compiled to a native Android library (via JNI), invoked
  directly from a Kotlin CallScreeningService. No network call sits on
  the call-screening critical path.
decisions:
  - "On-device Rust inference instead of a cloud API call: eliminates round-trip latency inside Android's strict CallScreeningService time budget."
  - "Rust compiled to a native library rather than a pure-Kotlin model: keeps inference fast and portable, and reuses scoring logic that isn't JVM-specific."
results: >
  Zero-latency spam scoring with custom user-defined blocking rules,
  shipping as a native Android library callable from Kotlin.
---

Built a real-time call screening system that intercepts incoming calls and scores them for spam probability using an on-device model. The core inference engine is written in Rust (compiled to a native Android library), called from a Kotlin `CallScreeningService`. Zero latency from cloud round-trips.
