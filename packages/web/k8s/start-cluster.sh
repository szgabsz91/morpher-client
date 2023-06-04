#!/usr/bin/env bash

minikube config set memory 4096
minikube start --driver=docker

kubectl apply -f morpher-api.yaml
kubectl wait deployment -n default morpher-api --for condition=Available=True --timeout=90s

kubectl apply -f morpher-client.yaml
kubectl wait deployment -n default morpher-client --for condition=Available=True --timeout=90s

kubectl get po -A

kubectl port-forward service/morpher-client 8080:80
