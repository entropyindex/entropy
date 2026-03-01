//! Minimal error types for Anvil.

/// Errors that can occur during CPI invocations.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AnvilError {
    /// The CPI invoke call failed.
    InvokeFailed,
    /// Invalid account data.
    InvalidAccountData,
    /// Missing required signer.
    MissingSigner,
    /// Insufficient funds.
    InsufficientFunds,
}
