#!/usr/bin/env bash

echo "Publishing for version $1"
docker build -t morpher-client ./packages/web
docker tag morpher-client szgabsz91/morpher-client:$1
echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
docker push szgabsz91/morpher-client:$1
