'use strict';

/**
 * guide service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::guide.guide');
