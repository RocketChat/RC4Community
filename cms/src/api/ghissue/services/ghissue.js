'use strict';

/**
 * ghissue service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ghissue.ghissue');
