#!/bin/bash

curl -H "Content-Type: application/json" -X PUT -d "{\"TopPost\": $(curl -H "Api-Key: $1" -H "Api-Username: $2" $3/top.json?period=all)}" "$4/discourses/$5"