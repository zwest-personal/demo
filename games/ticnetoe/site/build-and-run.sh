#!/bin/bash

docker build -t local-proxy:latest .
docker run -it \
  -p 8083:443 \
  -p 8080:8080 \
  --rm \
  local-proxy:latest
