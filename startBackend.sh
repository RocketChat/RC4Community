#!/bin/sh
FAUNA_CONTAINER_ID=$( docker ps -q -f name=faunadb )


echo "--Starting Superprofile Backend--"
cd superprofile
sh initFaunaOnce.sh
cd ..

if [ -z $FAUNA_CONTAINER_ID ]; then
    echo $FAUNA_CONTAINER_ID
    echo "\033[31m***FaunaDB container was unable to install and start, please rerun the script***\e[0m"
fi
