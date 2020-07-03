#!/bin/bash

# Build image
docker build ./api -t mock-api

# Start mock server
docker run -p 4040:4040 mock-api:latest