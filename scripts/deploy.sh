#!/bin/bash

echo "Building"
npm run build
echo "Running deploy script for $1 enviroment"
serverless deploy -s $1