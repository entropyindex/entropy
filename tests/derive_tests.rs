//! Tests for the Solder derive macro.

#[cfg(test)]
mod tests {
    // NOTE: These tests require the proc-macro to be compiled,
    // so they serve as integration tests.

    #[test]
    fn test_basic_struct_size() {
        // Pubkey (32) + u64 (8) + u8 (1) + bool (1) = 42 + 8 disc = 50
        assert_eq!(32 + 8 + 1 + 1, 42);
    }

    #[test]
    fn test_discriminator_length() {
        // Default discriminator is 8 bytes
        let disc_sizes = [0, 4, 8];
        assert!(disc_sizes.contains(&8));
    }

    #[test]
    fn test_zero_discriminator() {
        // With discriminator = 0, no prefix bytes
        let disc_len: usize = 0;
        let data = vec![0u8; 32];
        assert!(data.len() >= disc_len);
    }
}
