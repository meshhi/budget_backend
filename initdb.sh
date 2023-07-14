#!/bin/bash

docker run --name pg -p 3003:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=backend_db -d postgres:latest