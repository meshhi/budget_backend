#!/bin/bash

docker run -it --rm --network some-network postgres psql -h some-postgres -U postgres