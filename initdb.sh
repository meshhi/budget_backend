#!/bin/bash

docker run --name pg -p 5432:3003 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=welbex_db -d postgres:latest