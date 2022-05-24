module.exports = ({ env }) => ({
  apiToken: {
    salt: env("API_TOKEN_SALT", "d9b0df66ff97a666027e665707b4e3e7"),
  },
  auth: {
    secret: env("ADMIN_JWT_SECRET", "9e07dfd3396d88a43609466615259199"),
  },
});
