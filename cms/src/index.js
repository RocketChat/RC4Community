"use strict";
const bootstrap = require("./bootstrap");

module.exports = {
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
   async bootstrap() {
    await bootstrap();
  },
};