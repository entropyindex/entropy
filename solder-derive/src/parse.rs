//! Attribute parsing for #[solder(...)] attributes.

use syn::{Attribute, DeriveInput, Field, Lit, Meta, NestedMeta, Result};
use proc_macro2::Span;

/// Parsed container-level attributes.
pub struct ContainerAttrs {
    pub discriminator_size: usize,
    pub discriminator_value: Option<Vec<u8>>,
}

/// Parsed field-level attributes.
pub struct FieldAttrs {
    pub skip: bool,
    pub padding: Option<usize>,
    pub len_prefix: Option<String>,
}

impl ContainerAttrs {
    pub fn from_input(input: &DeriveInput) -> Result<Self> {
        let mut discriminator_size = 8;
        let mut discriminator_value = None;

        for attr in &input.attrs {
            if !attr.path().is_ident("solder") {
                continue;
            }
            // parse solder attributes
            attr.parse_nested_meta(|meta| {
                if meta.path.is_ident("discriminator") {
                    let value = meta.value()?;
                    let lit: Lit = value.parse()?;
                    if let Lit::Int(lit_int) = lit {
                        discriminator_size = lit_int.base10_parse()?;
                    }
                }
                Ok(())
            })?;
        }

        Ok(Self {
            discriminator_size,
            discriminator_value,
        })
    }
}

impl FieldAttrs {
    pub fn from_field(field: &Field) -> Result<Self> {
        let mut skip = false;
        let mut padding = None;
        let mut len_prefix = None;

        for attr in &field.attrs {
            if !attr.path().is_ident("solder") {
                continue;
            }
            attr.parse_nested_meta(|meta| {
                if meta.path.is_ident("skip") {
                    skip = true;
                } else if meta.path.is_ident("padding") {
                    let value = meta.value()?;
                    let lit: Lit = value.parse()?;
                    if let Lit::Int(lit_int) = lit {
                        padding = Some(lit_int.base10_parse()?);
                    }
                } else if meta.path.is_ident("len_prefix") {
                    let value = meta.value()?;
                    let lit: Lit = value.parse()?;
                    if let Lit::Str(s) = lit {
                        len_prefix = Some(s.value());
                    }
                }
                Ok(())
            })?;
        }

        Ok(Self { skip, padding, len_prefix })
    }
}
