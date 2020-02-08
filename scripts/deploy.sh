#!/bin/bash

echo "Building"
yarn run build
echo "Running deploy script for $1 enviroment"
yarn run sls deploy -s $1