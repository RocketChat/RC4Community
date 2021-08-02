#!/bin/sh

# Example deployment script for the application


# compressed into site.tgz file

tar zcvf ./site.tgz  -C ../app/out  .

# scp to your nginx host for deployment

scp ./site.tgz rcuser@mynginxhost:~/nginx/html
