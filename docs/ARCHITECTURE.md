# Architecture

## Crate Structure

Solder is split into three crates:

### solder-derive
The proc-macro crate. Handles parsing of `#[derive(Solder)]` and `#[solder(...)]` attributes, computes memory layouts, and generates trait implementations.

### solder-core
Runtime traits and helpers. Contains:
- `SolderDeserialize` / `SolderSerialize` — standard deser/ser traits
- `SolderZeroCopy` — zero-copy memory-mapped access
- `SolderError` — error types
- `Discriminator` / `AccountSize` — metadata traits

### solder (root)
Re-exports everything from core and derive for convenience.

## Design Decisions

1. **Zero runtime dependencies** — The core crate has no required dependencies. solana-program is optional.

2. **Configurable discriminators** — Unlike Anchor's fixed 8-byte scheme, Solder allows 0, 4, or 8 byte discriminators, or fully custom values.

3. **Zero-copy first** — The primary access pattern is `load()` which provides a direct reference without any copying.

4. **`no_std` compatible** — Works in constrained environments.

5. **Anchor compatible** — Uses the same discriminator scheme by default, so Solder-deserialized accounts can be read by Anchor programs and vice versa.

## How Code Generation Works

1. Parse struct definition and attributes
2. Compute memory layout (field sizes, alignment, padding)
3. Generate discriminator bytes from struct name hash
4. Emit implementations for all traits
5. Validate at compile time that the struct is compatible
