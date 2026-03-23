#!/bin/bash
# Run benchmarks and output results
set -e

echo "Running Solder benchmarks..."
echo ""

cargo bench --all 2>/dev/null || {
    echo "No benchmarks configured yet."
    echo "Run `cargo test --all` to verify correctness."
}
