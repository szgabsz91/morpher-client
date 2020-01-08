#!/usr/bin/env bash

function publish() {
    echo "Publishing for version $1"
    docker build -t morpher-client ./packages/web
    docker tag morpher-client szgabsz91/morpher-client:$1
    echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
    docker push szgabsz91/morpher-client:$1
}

BRANCH=${TRAVIS_PULL_REQUEST_BRANCH:-${TRAVIS_BRANCH}}

echo "TRAVIS_TAG: $TRAVIS_TAG"
echo "TRAVIS_PULL_REQUEST_BRANCH: $TRAVIS_PULL_REQUEST_BRANCH"
echo "TRAVIS_BRANCH: $TRAVIS_BRANCH"
echo "BRANCH: $BRANCH"

if [[ $BRANCH == "master" ]]; then
    # master branch - latest version
    publish "latest"
elif [ ! -z "$TRAVIS_TAG" ]; then
    # tag - read the version from lerna.json
    dockerImageVersion=$(cat lerna.json \
        | grep version \
        | head -1 \
        | awk -F: '{ print $2 }' \
        | sed 's/[",]//g')
    publish $dockerImageVersion
else
    echo "Not pushing Docker image from a feature branch"
fi
