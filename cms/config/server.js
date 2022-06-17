const cronTasks = require("./cron");

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', ["km0QgjouyuXrRtyclpqncQ==","eJRdLckHY4J5cOfQNmKs+w==","zHVrFOcuFTLlwsabLJNIaw==","P9XerXlU/TTeIzsOdizoOQ=="]),
  },
  cron: {
    enabled: true,
    tasks: cronTasks,
  },
});
