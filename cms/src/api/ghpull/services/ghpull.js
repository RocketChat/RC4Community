'use strict';

/**
 * ghpull service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ghpull.ghpull');
