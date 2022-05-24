'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

 const { createCoreService } = require('@strapi/strapi').factories;

 module.exports = createCoreService('api::discourse.discourse');