//! Discriminator and sizing utilities.

/// Trait for types with a known discriminator.
pub trait Discriminator {
    /// The discriminator bytes for this account type.
    const DISCRIMINATOR: &'static [u8];

    /// Length of the discriminator in bytes.
    fn discriminator_len() -> usize {
        Self::DISCRIMINATOR.len()
    }
}

/// Trait for types with a known serialized size.
pub trait AccountSize {
    /// Total space needed for this account, including discriminator.
    const SPACE: usize;
}
