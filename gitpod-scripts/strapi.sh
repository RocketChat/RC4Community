cd cms
export PORT=$1
npm run build
INITIALIZE_DATA=true npm run develop 