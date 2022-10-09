cd cms
npm i
export PORT=$1
npm run build
INITIALIZE_DATA=true npm run develop 