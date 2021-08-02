# Rocket.Chat for Communities 

## Build and grow massive on-line communities with Rocket.Chat

Since 2015,  Rocket.Chat has been used globally by groups and organizations to create and build online communities of all shapes and sizes.    Today, with millions of end users and hundreds of thousands of deployed servers,  Rocket.Chat has uniquely become a networked community of community builders - a community of communities.   

With its upcoming decentralized federation refactor,   Rocket.Chat stands to become the next level Internet fabric that will loosely unite all on-line communities in a decentralized yet consistent manner.

This project is an extension to Rocket.Chat that aims to satisfy the immediate demands of today's community builders.   Those who are intentionally building massive on-line communities (membership into the millions) centered around Rocket.Chat's core functionalities  (sharing of information, collaboration,  video and audio meet-ups, virtual conferences, and so on).  

Unlike the team chat heritage of Rocket.Chat, this area is a trending but nascent field where major innovations are yet to be imagined. Participants in both open source and closed source space are diligently working on scalability of their platforms and systems.   Rocket.Chat for Communities uniquely features an already proven scalable collaboration engine right from day number one.

If you are involved in some ways in the creation, building, and growth of massive communities online - we invite you to participate in this project; help us steer its direction and ensure its long term success. 


### Developer quick start

##### Design and Development Time

During development, our data provider is a headless CMS, strapi.  

Note that it is used only during development and build time, not during production.

Start strapi: 

```
git clone https://github.com/rocketchat/RC4Community
cd cms
npm i
npm run develop
```
Check http://localhost:1337 to access strapi.   

If you're using WSL2 on Windows also running Docker Desktop,  port 1337 may not be available on your system.   To use port 3000 instead,  change this line in  `config/server.js` file:

```
  port: env.int('PORT', 3000),
``` 
Restart strapi as above and you should be good to go.

The application is written on nextjs and deployable on all nextjs compatible CDN + microservices and scaled deployment platforms. For build and design, start it in a shell:

```
cd app
npm i
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337  npm run dev
```

Of course, change the port to `3000` if you need to.

Now RC4Community should be accessible from http://localhost:8090 

You can now have designers and devs modify the portal content directly and independently from the dev and devOps folks working on the app.

Devs can now enjoy the hot refresh and rapid iterations of the nextjs dev environment.

## Application build time

This app is deployable on all nextjs compatible CDN + microservices and scaled deployment platforms. 

To build for deployment, first make sure cms (strapi) is up and running, then:
```
cd app
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337   npm run build
```

Upon successful build, the cms (strapi) is no longer needed for deployemnt.  For example, you may want to deploy to vercel via a `git push`.

For a workable but simple minded, non-scalable, never to be used in production deployment:

```
cd app
npm run prod
```

Again, note that cms/strapi is not required in production and should not be started.

## Deployment time  (production deployment)

Production should be deployed as a statically generated website (with associated microservices and/or serverless execution support).

Make sure you have build the bundle  (with the cms running):

```
cd app
npm i
npm run build
```

Once you have finshed the build,  the optimized files are ready in the `out` folder.  You will no no longer need the CMS running and can stop strapi.  This is key, deployment does not depend on the cms, in fact the same `tgz` can be immediately deployed to 1000s of smart edge nginx PoP as in modern CDNs.

Take a look at `deploy/deploy.sh` to see how to zip up the `out` content into a `site.tgz` file and transfer to your web server  (such as nginx in this example) for deployment.




