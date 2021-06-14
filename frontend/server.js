const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = process.env.PORT || 8090;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const apiPaths = {
  "/admin": {
    target: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337",
    changeOrigin: true,
    pathRewrite: {
      "^/admin": "/admin",
    },
  },
  "/api": {
    target: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/",
    },
  },
  "/content-manager": {
    target: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337",
    changeOrigin: true,
    pathRewrite: {
      "^/content-manager": "/content-manager",
    },
  },
  "/i18n": {
    target: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337",
    changeOrigin: true,
    pathRewrite: {
      "^/i18n": "/i18n",
    },
  },
};

const isDevelopment = process.env.NODE_ENV !== "production";

app
  .prepare()
  .then(() => {
    const server = express();

    if (isDevelopment) {
      server.use("/admin", createProxyMiddleware(apiPaths["/admin"]));
      server.use("/api/*", createProxyMiddleware(apiPaths["/api"]));
      server.use(
        "/content-manager/*",
        createProxyMiddleware(apiPaths["/content-manager"])
      );
      server.use("/i18n/*", createProxyMiddleware(apiPaths["/i18n"]));
    }

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error:::::", err);
  });
