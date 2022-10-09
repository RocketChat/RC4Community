#!/bin/sh

echo "Please wait while we start the crm and app server and superprofile..."

sleep 15   # pause for 15 seconds

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    *)          machine="UNKNOWN:${unameOut}"
esac

echo "OS is detected to be  $machine"
URL="http://localhost:$1"

echo "App ready, now starting browser with RC4Community..."
echo "URL is set to $URL"
if [ "$machine" = "Linux" ]  
then
   xdg-open $URL
else
   open $URL
fi
