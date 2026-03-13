# Architecture

## Overview

Anvil is structured as a collection of thin CPI (Cross-Program Invocation) wrappers that compile to near-optimal BPF bytecode. Each module targets a specific on-chain program and provides ergonomic Rust functions that construct and invoke CPI instructions with zero allocations.

## Design

```
┌─────────────────────────────────────────────┐
│                  anvil                      │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐ │
│  │ system   │  │  token   │  │ assoc_tok │ │
│  │          │  │          │  │           │ │
│  │ transfer │  │ transfer │  │  create   │ │
│  │ create   │  │ mint_to  │  │  create_  │ │
│  │ allocate │  │ burn     │  │  idempot  │ │
│  │ assign   │  │ approve  │  │           │ │
│  │          │  │ revoke   │  │           │ │
│  │          │  │ close    │  │           │ │
│  │          │  │ freeze   │  │           │ │
│  │          │  │ thaw     │  │           │ │
│  └────┬─────┘  └────┬─────┘  └─────┬─────┘ │
│       │             │              │        │
│       └─────────────┼──────────────┘        │
│                     │                       │
│              ┌──────┴──────┐                │
│              │   invoke    │                │
│              │             │                │
│              │ invoke()    │                │
│              │ invoke_     │                │
│              │  signed()   │                │
│              └──────┬──────┘                │
│                     │                       │
│              ┌──────┴──────┐                │
│              │  syscall    │                │
│              │             │                │
│              │ sol_invoke_ │                │
│              │ signed_c()  │                │
│              └─────────────┘                │
└─────────────────────────────────────────────┘
```

## Module Responsibilities

### `invoke.rs`
The foundation layer. Provides raw `invoke()` and `invoke_signed()` wrappers that directly call the Solana runtime's `sol_invoke_signed_c` syscall. All other modules build on top of this.

Key types:
- `Instruction` — C-repr struct matching the runtime's expected layout
- `AccountMeta` — per-account signer/writable flags
- `AccountInfo` — opaque handle passed through from the runtime

### `program_ids.rs`
Compile-time constants for all supported program IDs. These are `[u8; 32]` arrays, not `Pubkey` types — we avoid importing any Solana SDK types.

### `system.rs`
System Program CPI helpers:
- `transfer` / `transfer_signed` — move SOL between accounts
- `create_account` — create a new account with space and owner
- `allocate` — allocate data space
- `assign` — change account ownership

### `token.rs`
SPL Token Program CPI helpers covering all common operations:
- Transfers (regular and checked)
- Minting and burning
- Approvals and revocations
- Account freezing/thawing
- Account closing

Every mutating function has a `_signed` variant for PDA-based authority patterns.

### `associated_token.rs`
ATA Program helpers:
- `create` — create an associated token account
- `create_idempotent` — create if not exists (no error on duplicate)

### `error.rs`
Minimal error enum. No `thiserror`, no `anyhow` — just a simple `#[derive(Debug)]` enum.

## Binary Size

Each CPI wrapper compiles to approximately 200 bytes of BPF bytecode. By comparison, importing `anchor-spl` for the same functionality adds ~8KB+ to your binary.

## Zero-Copy Guarantee

No data is ever copied during CPI construction. Instruction data is built on the stack, account metas reference existing pointers, and everything is passed directly to the syscall.

## Safety Model

All `unsafe` code is confined to `invoke.rs` where we call the FFI syscall. The rest of the library is safe Rust. The `unsafe` boundary is minimal and well-documented.
