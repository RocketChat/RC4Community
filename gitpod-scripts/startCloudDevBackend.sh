#!/bin/sh

if ! docker info > /dev/null 2>&1; then
  echo "Docker is not running, please start the Docker daemon and try again! 💪"
  exit 1
fi

echo "--Starting Superprofile Backend--"

cd superprofile
sh initFaunaOnce.sh $1
cd ..

FAUNA_CONTAINER_ID=$( docker ps -q -f name=faunadb )
echo fauna container name $FAUNA_CONTAINER_ID

if [ -z $FAUNA_CONTAINER_ID ]; then
    echo $FAUNA_CONTAINER_ID
    echo "\033[31m***FaunaDB container was unable to install and start, please rerun the script***\e[0m"
fi
