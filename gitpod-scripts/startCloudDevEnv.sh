#!/bin/sh

NEXTJS_PORT=3000
counter=0
watchdog=5

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
        printf "🚀 An empty port found for NextJS 🚀 \n"
    fi
}

check_and_set_next_port

export NEXT_PUBLIC_PORT=$NEXTJS_PORT

printf '\nNEXT_PUBLIC_EVENT_SPK_MAIL'="dhgysfmedomihkzkwv@kvhrr.com" >> app/.env

cd app
export PORT=$NEXTJS_PORT
export NEXT_PUBLIC_PORT=$NEXTJS_PORT
printf "\nPlease wait while we initialize strapi for development....🚀\n"
gp ports await 1337 
printf "\nPlease wait while we initialize the backend....🚀\n"
gp sync-await Initialization_of_Backend && npm run dev