# Headless CMS (Strapi) server

This stores the structure and data used to statically generate the community system.   All elements of the system can be dynaically modified and changed via Strapi's user friendly interface.    

### Developer quick start

By default, strapi listens on port 1337.   If you're using WSL2 on Windows and also running Docker Desktop,  port 1337 may not be available on your system.   To use port 3000 instead, set the environment variable `PORT` to 3000.

#### If migrating form Strapi v3 to v4, please -

> Delete the old `.tmp` and `build` folders (if exists).

> **Optional: Add the `APP_KEYS`, and `JWT_SECRET` environment variables. (For a quick start, you could use the same keys as in `.env.example`)

```
export PORT=3000
```

Start strapi: 

```
git clone https://github.com/rocketchat/RC4Community
cd cms
npm i
npm run build
INITIALIZE_DATA=true npm run develop
```

Note:
1. `INITIALIZE_DATA` environment variable is only needed the first time you startup the cms for development.   It will seed the cms with a default set of components for you to start your own customization.  (see [fetch data](https://github.com/RonLek/RC4Community/blob/master/cms/config/functions/fetchData.js)  for the actual default initialization code)
2. On subsequent runs, if you want to activate Discourse Integration, set the environment variables `DISCOURSE_DOMAIN`, `DISCOURSE_API_USERNAME`, `DISCOURSE_API_KEY`.  These  environment variables are required for the cron job to fetch the latest top activity on discourse with the time interval of 5 mins.

 
