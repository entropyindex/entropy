
.PHONY: build test clippy fmt check

build:
	cargo build --all

test:
	cargo test --all

clippy:
	cargo clippy --all -- -D warnings

fmt:
	cargo fmt --all -- --check

check: fmt clippy test
	@echo "All checks passed"

bench:
	cargo bench --all
