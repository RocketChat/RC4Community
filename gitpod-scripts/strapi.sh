#!/bin/sh

cd cms
INITIALIZE_DATA=true npm run develop 
export PORT=$1