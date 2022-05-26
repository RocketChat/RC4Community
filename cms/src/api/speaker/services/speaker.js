'use strict';

/**
 * speaker service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::speaker.speaker');
