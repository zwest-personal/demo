#!/bin/sh

source .env

RUSTC_VERSION=$RUSTC_VERSION \
LEVEL_VERBOSITY=$LEVEL_VERBOSITY \
SERVER_PORT=$SERVER_PORT \
  ~/.cargo/bin/cargo run

