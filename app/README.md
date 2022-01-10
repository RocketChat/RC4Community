# ReactJS Fully Componentized App

This community system is a web app dynaically generated and packaged by NextJS during build time, by combinaing structure and data from a headless CMS - strapi.

The app is 100% composed of ReactJS components.  See the `components` directory for the set of ReactJS components used, and see the `styles` directory for the CSS module associated with each of the components.

The application is written for nextjs and deployable on all nextjs compatible CDN + microservices and scaled deployment platforms. For build and design, start it in a shell:
```
npm i
npm run dev
```
You can use ethe environment variable `NEXT_PUBLIC_STRAPI_API_URL` to override the location of strapi cms, if it is not running on the same host.

```
NEXT_PUBLIC_STRAPI_API_URL=http://127.0.0.1:1337  npm run dev
```
Now RC4Community should be accessible from http://localhost:3000
