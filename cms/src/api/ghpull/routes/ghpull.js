'use strict';

/**
 * ghpull router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::ghpull.ghpull');
