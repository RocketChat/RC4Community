module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '9e07dfd3396d88a43609466615259199'),
    },
  },
  cron: {
    enabled: true,
  },
});
