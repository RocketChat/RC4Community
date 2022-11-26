#!/bin/sh

STRAPI_PORT=1337
counter=0
watchdog=5

check_and_set_strapi_port() {

    if lsof -Pi :$STRAPI_PORT -sTCP:LISTEN -t >/dev/null && [ "$counter" -lt $watchdog ]; then
        echo "Strapi port $STRAPI_PORT already occupied, changing to the next consecutive port"
        STRAPI_PORT=$((STRAPI_PORT+1))
        counter=$((counter+1))
        check_and_set_strapi_port
    elif [ "$counter" -ge $watchdog ]; then
        echo "\033[31m Unable to allocate an empty port for Strapi, the last tried port was $STRAPI_PORT\e[0m"
        echo "Please either change the $STRAPI_PORT to an other random number or to an unused port number"
        exit 1
    else
        echo "🚀 An empty port found for Strapi🚀"
    fi
}

check_and_set_strapi_port

printf '\nNEXT_PUBLIC_STRAPI_API_URL'="http://127.0.0.1:$STRAPI_PORT" >> app/.env


cd cms
INITIALIZE_DATA=true npm run develop 
export PORT=STRAPI_PORT