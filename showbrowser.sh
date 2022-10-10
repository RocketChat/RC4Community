#!/bin/sh

echo "\n\n"

echo "Please wait while we start the crm and app server and superprofile..."

sleep 60   # pause for 1 minute

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     osname=Linux;;
    Darwin*)    osname=Mac;;
    *)          osname="UNKNOWN:${unameOut}"
esac

echo "OS is detected to be $osname"
URL="http://localhost:$1"

echo "App ready, now starting browser with RC4Community..."
echo "URL is set to $URL"
if [ "$osname" = "Linux" ]  
then
   xdg-open $URL
else
   open $URL
fi
