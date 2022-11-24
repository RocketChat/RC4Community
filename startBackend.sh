#!/bin/sh

echo "--Starting Superprofile Backend--"
cd superprofile
sh initFaunaOnce.sh $1
cd ..

FAUNA_CONTAINER_ID=$( docker ps -q -f name=faunadb )

if [ -z $FAUNA_CONTAINER_ID ]; then
    echo $FAUNA_CONTAINER_ID
    echo "\033[31m***FaunaDB container was unable to install and start, please rerun the script***\e[0m"
fi
