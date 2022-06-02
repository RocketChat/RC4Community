'use strict';

/**
 * community service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::community.community');
