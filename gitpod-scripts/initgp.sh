#!/bin/sh

docker pull fauna/faunadb:4.15.0

cd app
npm i

cd ..
cd cms
npm i
