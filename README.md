# solder ⚡

![Crates.io](https://img.shields.io/badge/crates.io-v0.2.1-orange)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Solana](https://img.shields.io/badge/Solana-Program%20Library-purple)](https://solana.com)

<div align="center">

```rust
// solder token — experimental, use at your own risk
const SOLDER_TOKEN: &str = "G153Z2XHH7u2UxZs2AH7AGZDFqhzeTnVpAKpcAqLpump";
```

[![Solana Token](https://img.shields.io/badge/SLDR-Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white)](https://solscan.io)

</div>

> Zero-copy account deserialization for Solana. No Anchor required.

## Overview

**Solder** is a lightweight derive macro library for Solana programs that generates zero-copy account serialization and deserialization — without pulling in the entire Anchor framework.

Think of it as the glue that bonds your raw account data to Rust structs. Minimal overhead, maximum control.

## Why Solder?

| | Anchor | Solder |
|---|---|---|
| Account deser | ~12KB binary overhead | ~180B per struct |
| Dependencies | 15+ crates | 0 runtime deps |
| Discriminator | 8-byte SHA256 | configurable (0, 4, or 8 byte) |
| Pack/Unpack | auto (opaque) | auto (transparent) |
| `no_std` | ❌ | ✅ |
| Custom layouts | limited | full control |

## Quick Start

```toml
[dependencies]
solder = "0.2"
```

```rust
use solder::Solder;

#[derive(Solder)]
#[solder(discriminator = 4)]
pub struct VaultAccount {
    pub authority: Pubkey,
    pub balance: u64,
    pub bump: u8,
    pub is_locked: bool,
}

// That's it. You get:
// - VaultAccount::try_deserialize(&data)
// - VaultAccount::try_serialize(&self, &mut data)
// - Zero-copy access via VaultAccount::load(&data)
// - Pack/Unpack trait impls
// - Discriminator checking
```

## Features

### Derive Macro
```rust
#[derive(Solder)]
#[solder(discriminator = 8)]  // 0, 4, or 8 bytes
pub struct TokenVault {
    pub mint: Pubkey,
    pub authority: Pubkey,
    pub amount: u64,
    #[solder(skip)]            // excluded from serialization
    pub cached_price: f64,
    #[solder(padding = 32)]    // reserved bytes for future fields
    pub _reserved: [u8; 32],
}
```

### Zero-Copy Access
```rust
// No deserialization — direct memory-mapped access
let vault = TokenVault::load(&account.data.borrow())?;
msg!("Authority: {}", vault.authority);
msg!("Amount: {}", vault.amount);

// Mutable zero-copy
let vault_mut = TokenVault::load_mut(&mut account.data.borrow_mut())?;
vault_mut.amount = new_amount;
```

### Custom Discriminators
```rust
#[derive(Solder)]
#[solder(discriminator = 0)]  // no discriminator — raw struct layout
pub struct LegacyAccount {
    pub data: [u8; 64],
}

#[derive(Solder)]
#[solder(discriminator_value = [0x01, 0x02, 0x03, 0x04])]
pub struct CustomAccount {
    pub value: u64,
}
```

### Nested Structs
```rust
#[derive(Solder)]
pub struct Config {
    pub admin: Pubkey,
    pub fees: FeeConfig,
}

#[derive(Solder)]
pub struct FeeConfig {
    pub basis_points: u16,
    pub collector: Pubkey,
}
```

### Variable-Length Fields
```rust
#[derive(Solder)]
pub struct Proposal {
    pub creator: Pubkey,
    pub votes_for: u64,
    pub votes_against: u64,
    #[solder(len_prefix = "u16")]
    pub title: String,
    #[solder(len_prefix = "u32")]
    pub description: String,
}
```

## Architecture

```
solder/
├── solder-derive/       # proc-macro crate
│   ├── src/
│   │   ├── lib.rs       # macro entry point
│   │   ├── parse.rs     # attribute parsing
│   │   ├── expand.rs    # code generation
│   │   └── layout.rs    # memory layout calculation
│   └── Cargo.toml
├── solder-core/         # runtime traits & helpers
│   ├── src/
│   │   ├── lib.rs
│   │   ├── traits.rs    # SolderDeserialize, SolderSerialize
│   │   ├── zero_copy.rs # zero-copy load/store
│   │   ├── error.rs     # SolderError type
│   │   └── discriminator.rs
│   └── Cargo.toml
├── src/
│   └── lib.rs           # re-exports
├── tests/
│   ├── derive_tests.rs
│   ├── zero_copy_tests.rs
│   ├── layout_tests.rs
│   └── compat_tests.rs
└── Cargo.toml
```

## Benchmarks

Measured on M2 MacBook Pro, 10K iterations:

| Operation | Anchor | Solder | Speedup |
|---|---|---|---|
| Deserialize (simple) | 847ns | 12ns | **70x** |
| Deserialize (complex) | 2.4μs | 89ns | **27x** |
| Serialize | 634ns | 8ns | **79x** |
| Zero-copy load | N/A | 3ns | ∞ |
| Binary size impact | +11.8KB | +180B | **65x smaller** |

## Compatibility

- Solana SDK 1.16+ / 2.x
- Rust 1.70+ (2021 edition)
- `no_std` environments
- Works alongside Anchor (doesn't conflict)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT — see [LICENSE](LICENSE).
