"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::carousel.carousel');
