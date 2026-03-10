---
title: Call Shield
description: AI-powered spam call screening for Android. Blocks unwanted calls before they ring. Custom blocking rules available.
tech: [Android, Kotlin, Firebase, Supabase]
github: https://github.com/fennsaji/call-guard
featured: false
year: 2024
---

Built a real-time call screening system that intercepts incoming calls and scores them for spam probability using an on-device model. The core inference engine is written in Rust (compiled to a native Android library), called from a Kotlin `CallScreeningService`. Zero latency from cloud round-trips.
