cd /var/log/faunadb
ALREADY_INITIALIZED="init_flag"
DOMAIN="localhost"
if [ ! -z "$1" ]; then DOMAIN="$1"; fi
if [ ! -e $ALREADY_INITIALIZED ]; then
   touch $ALREADY_INITIALIZED
   echo "-- initializing fauna... --"
   fauna create-database RC4Community 
   fauna create-key RC4Community | awk '/secret: */{print $2}' -  > dbkey
   echo "-- uploading graphql schema... --"
   fauna upload-graphql-schema /var/log/faunadb/schema.gql --domain="$DOMAIN" --port="8443" --scheme="http"  --secret=`cat dbkey` --graphqlHost=$DOMAIN --graphqlPort=8084 --mode=replace
   echo "-- schema uploaded successfully... --"
   echo "-- initializing fauna collection User... --"
   fauna eval RC4Community --file=/var/log/faunadb/initUser.fql
else
   echo "-- already initialized, do nothing --"
fi
