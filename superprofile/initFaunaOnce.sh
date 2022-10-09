#!/bin/sh

waittime=30
ALREADY_INITIALIZED="log/init_key_flag"

FAUNA_CONTAINER_ID=$( docker ps -q -f name=faunadb )

if [ -e $ALREADY_INITIALIZED ] && [ ! -z $FAUNA_CONTAINER_ID ]; then
    echo "-- Superprofile is already up and running --"
    exit 0
fi

docker compose up -d
echo "Waiting $waittime seconds for container to get shipped..."
sleep $waittime

DBF="log/init_key_flag"
container_name="faunadb"
healthy="healthy"
container_state="$( docker inspect -f '{{ .State.Health.Status }}' ${container_name} )"

if [ "$container_state" != $healthy ]; then
    echo "Docker container needs extra startup time, please increase the \$waittlist value in initFaunaOnce.sh"
    echo "Process ended with health status of Container: $container_state"
else
    docker exec -it faunadb /bin/sh  /var/log/faunadb/initialize.sh
    if [ -f log/dbkey ] && [ ! -f log/init_key_flag ]; then
        echo "Copying over secrets to ../app/.env"
        printf '\nNEXT_PUBLIC_FAUNA_SECRET=' | cat - ./log/dbkey >> ../app/.env &&
        printf '\nNEXT_PUBLIC_FAUNA_DOMAIN'="http://localhost:8084/graphql" >> ../app/.env
        touch $DBF &&
        echo "-- All set, superprofile launch 🚀"
    else
        echo "-- Env variables are already copied, no need to copy over twice 😉 --" 
    fi
fi