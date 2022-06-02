'use strict';

/**
 * ghcontributor service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ghcontributor.ghcontributor');
