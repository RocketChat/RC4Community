#!/bin/sh

waittime=30
ALREADY_INITIALIZED="log/init_key_flag"

counter=0
watchdog=6

DOMAIN="localhost"
if [ ! -z "$1" ]; then DOMAIN="$1"; fi

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
constainer_health_status="starting"

check_and_start_fauna_container() {
    container_state="$( docker inspect -f '{{ .State.Health.Status }}' ${container_name} )"

    if [ "$container_state" == $constainer_health_status ]; then
        if [ "$counter" -lt $watchdog ]; then
            counter=$((counter+1))
            waittime=$((waittime+5))
            echo "Increased wait time to $waittime seconds..."
            sleep 5
            check_and_start_fauna_container
        elif [ "$counter" -ge $watchdog ]; then
            echo "Docker container needs extra startup time, please increase the \$waittlist value in initFaunaOnce.sh"
            echo "Process ended with health status of Container: $container_state"
        fi
    else
        docker exec -it faunadb /bin/sh  /var/log/faunadb/initialize.sh $1
        if [ -f log/dbkey ] && [ ! -f log/init_key_flag ]; then
            echo "Copying over secrets to ../app/.env"
            printf '\nNEXT_PUBLIC_FAUNA_SECRET=' | cat - ./log/dbkey >> ../app/.env &&
            printf '\nNEXT_PUBLIC_FAUNA_DOMAIN'="http://$DOMAIN:8084/graphql" >> ../app/.env
            touch $DBF &&
            echo "-- All set, superprofile launch 🚀"
        else
            echo "-- Env variables are already copied, no need to copy over twice 😉 --" 
        fi
    fi
}

check_and_start_fauna_container