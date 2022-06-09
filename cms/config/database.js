module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: env("DATABASE_FILENAME", ".tmp/data.db"),
    },
    useNullAsDefault: true,
    debug: false,
    pool: {
      idleTimeoutMillis: 30000,
      createTimeoutMillis: 30000,
      acquireTimeoutMillis: 30000,
    },
  },
});
