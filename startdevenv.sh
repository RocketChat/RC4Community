#!/bin/sh

STRAPI_PORT=1337
NEXTJS_PORT=3000
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

check_and_set_next_port() {
    if lsof -Pi :$NEXTJS_PORT -sTCP:LISTEN -t >/dev/null && [ "$counter" -lt $watchdog ]; then
        echo "NextJS port $NEXTJS_PORT already occupied, changing to the next consecutive port"
        NEXTJS_PORT=$((NEXTJS_PORT+1))
        counter=$((counter+1))
        check_and_set_next_port
    elif [ "$counter" -ge $watchdog ]; then
        echo "\033[31mUnable to allocate an empty port for NextJS, the last tried port was $NEXTJS_PORT\e[0m"
        echo "Please either change the $NEXTJS_PORT to an other random number/unused port number"
        echo "After changes re-run the script"
        exit 1
    else
        echo "🚀 An empty port found for NextJS 🚀"
    fi
}

sh startBackend.sh $1

check_and_set_strapi_port
counter=0
check_and_set_next_port

export NEXT_PUBLIC_PORT=$NEXTJS_PORT

printf '\nNEXT_PUBLIC_STRAPI_API_URL'="http://127.0.0.1:$STRAPI_PORT" >> app/.env
printf '\nNEXT_PUBLIC_EVENT_SPK_MAIL'="dhgysfmedomihkzkwv@kvhrr.com" >> app/.env

sh strapi.sh $STRAPI_PORT > /dev/null 2>/dev/null  &

cd app
export PORT=$NEXTJS_PORT
export NEXT_PUBLIC_PORT=$NEXTJS_PORT
npm i
sh ../showbrowser.sh  $NEXTJS_PORT 2>/dev/null  &
npm run dev

