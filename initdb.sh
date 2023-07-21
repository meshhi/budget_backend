#!/bin/bash

docker run --name pg -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=1q2w341q2w34 -e POSTGRES_DB=budget -d postgres:latest