<h1 align='center'>Rocket.Chat for Communities </h1>

![build and grow massive online communities with rocket.chat](./assets/readme-banner.png)

![build and grow massive online communities with rocket.chat](./assets/readme-hero.png)

<h2 align='center'>🚀 Features 🚀</h2>
<ul>
  <li>every part of the system scalable to handle from one to over a million online community members</li>
  <li>engage your community at Rocket.Chat, Github, Discourse, Discord - wherever they may be</li>
  <li>innovative reactJS components enhanced with fullstack behaviors</li>
  <li>choice of Identity Management - popular SaaS (auth0, firebase) and open source (gluu, keycloak OpenID Connect)</li>
  <li>full virtual conference handling</li>
  <li>modern profile and superprofile factoring</li>
  <li>supports flauna for scaled persistence</li>
  <li>fine-grained full-stack optimization control - static, server side generation, per-request</li>
  <li>designed for world-scale computing at the edge from day one</li>
  <li>JAMStack and beyond, "no compromises" design</li>
  <li>supports NextJS and Vercel pay-as-you-grow scaled deployments</li>
  <li>easy assembly of reusable components for flexible adaptive systems</li>
  <li>ultra-light-weight and re-imagined UX for next generation community builder / developer experience</li>
</uL>

<h2 align='center'>🚀 Community Builder quick start 🚀</h2>
<p align='center'> Customize - Deploy - Manage </p>

## 💻 Work from any browser or Chromebook

Paste the following into your browser:

```
gitpod.io/#https://github.com/RocketChat/RC4Community
```

Start designing and customizing your community management system!

 
<h2 align='center'>🚀 Developer quick start 🚀</h2>
<p align='center'> Development - Build - Production </p>

## 💻 Design and Development Time

During development, our data provider is a headless CMS, strapi.

Note that it is used only during development and build time, not during production.

Nodejs versioning is managed by [volta](https://docs.volta.sh/guide/). You can install it by running `curl https://get.volta.sh | bash` in your terminal. This assures that appropriate versions of nodeJS and npm are used and ensures compatibility for all distributed development teams.

By default, strapi listens on port 1337. If you're using WSL2 on Windows and also running Docker Desktop, port 1337 may not be available on your system. To use port 3000 instead, set the environment variable `PORT` to 3000.

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
INITIALIZE_DATA=true npm run develop
```

Note:

1. `INITIALIZE_DATA` environment variable is only needed the first time you start the cms for development. It will seed the cms with a default set of components for you to start your own customization. (see [fetch data](https://github.com/RonLek/RC4Community/blob/master/cms/config/functions/fetchData.js) for the actual default initialization code)
2. On subsequent runs, if you want to activate Discourse integration, set the environment variables `DISCOURSE_DOMAIN`, `DISCOURSE_API_USERNAME`, `DISCOURSE_API_KEY`. These environment variables are required for the cron job to fetch the latest top activity on discourse with the time interval of 5 mins.

The application is written on nextjs and deployable on all nextjs compatible CDN + microservices and scaled deployment platforms. For build and design, start it in a shell:

```
cd app
npm i
npm run dev
```

You can use the environment variable `NEXT_PUBLIC_STRAPI_API_URL` to override the location of strapi cms, if it is not running on the same host.

```
NEXT_PUBLIC_STRAPI_API_URL=http://127.0.0.1:1337  npm run dev
```

Now RC4Community should be accessible from http://localhost:3000

You can now have designers and devs modify the portal content directly and independently from the dev and devOps folks working on the app.

Devs can now enjoy the hot refresh and rapid iterations of the nextjs dev environment.

## 🛠 Application build time

This app is deployable on all nextjs compatible CDN + microservices and scaled deployment platforms.

To build for deployment, first make sure cms (strapi) is up and running, then:

```
cd app
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337   npm run build
```

Upon successful build, the cms (strapi) is no longer needed for deployemnt. For example, you may want to deploy to vercel via a `git push`.

For a workable but simple minded, non-scalable, never to be used in production deployment:

```
cd app
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337   npm run prod
```

Again, note that cms/strapi is not required in production and should not be started.

## 🗄 Deployment time (production deployment)

Production should be deployed as a statically generated website (with associated microservices and/or serverless execution support).

Make sure you have built the bundle (with the cms running):

```
cd app
npm i
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337  npm run build
```

Once you have finshed the build, the optimized files are ready in the `out` folder. You will no no longer need the CMS running and can stop strapi. This is key, deployment does not depend on the cms, in fact the same `tgz` can be immediately deployed to 1000s of smart edge nginx PoP as in modern CDNs.

Take a look at `deploy/deploy.sh` to see how to zip up the `out` content into a `site.tgz` file and transfer to your web server (such as nginx in this example) for deployment.

<h3 align='center'>✨ About the repository ✨</h3>

Since 2015, [Rocket.Chat](https://rocket.chat) has been used globally by groups and organizations to create and build online communities of all shapes and sizes. Today, with millions of end users and hundreds of thousands of deployed servers, Rocket.Chat has uniquely become a networked community of community builders - a community of communities.

With its upcoming decentralized federation refactor, Rocket.Chat stands to become the next level Internet fabric that will loosely unite all on-line communities in a decentralized yet consistent manner.

This project is an extension to Rocket.Chat that aims to satisfy the immediate demands of today's community builders. Those who are intentionally building massive on-line communities (membership into the millions) centered around Rocket.Chat's core functionalities (sharing of information, collaboration, video and audio meet-ups, virtual conferences, and so on).

Unlike the team chat heritage of Rocket.Chat, this area is a trending but nascent field where major innovations are yet to be imagined. Participants in both open source and closed source space are diligently working on scalability of their platforms and systems. Rocket.Chat for Communities uniquely features an already proven scalable collaboration engine right from day number one.

If you are involved in some ways in the creation, building, and growth of massive communities online - we invite you to participate in this project; help us steer its direction and ensure its long term success.


