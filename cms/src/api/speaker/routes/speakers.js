'use strict';

/**
 * speaker router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::speaker.speaker');
