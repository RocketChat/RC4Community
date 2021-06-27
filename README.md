## Build and grow massive on-line communities with Rocket.Chat


### Developer quick start

Start backend in a shell: 

```
git clone https://github.com/rocketchat/RC4Community
cd backend
npm i
npm run develop
```
Check http://localhost:1337 to access strapi.   

If you're using WSL2 on Windows also running Docker Desktop,  port 1337 may not be available on your system.   To use port 3000 instead,  change this line in  `config/server.js` file:

```
  port: env.int('PORT', 3000),
``` 

Start frontend in a shell:

```
cd ../frontend
npm i
npm run dev
```

Now RC4Community should be accessible from http://localhost:8090 

If you've changed the strapi (backend) port to 3000,  use the following line to start the frontend instead:

```
export NEXT_PUBLIC_STRAPI_API_URL=http://localhost:3000;npm run dev
```


You can now modify code in the frontend via standard nextjs dev best practices.

