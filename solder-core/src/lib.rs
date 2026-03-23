//! Core traits and runtime helpers for Solder.

#![cfg_attr(feature = "no-std", no_std)]

mod traits;
mod zero_copy;
mod error;
mod discriminator;

pub use traits::{SolderDeserialize, SolderSerialize};
pub use zero_copy::SolderZeroCopy;
pub use error::{SolderError, SolderResult};
pub use discriminator::{Discriminator, AccountSize};
