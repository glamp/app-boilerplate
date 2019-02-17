#!/bin/bash

docker run \
  --rm \
  -e POSTGRES_USER=rebatist \
  -e POSTGRES_PASSWORD=expect-no-mercy-from-our-owl \
  -e POSTGRES_DB=rebatist \
  -p 5432:5432 \
  -i \
  postgres:latest
