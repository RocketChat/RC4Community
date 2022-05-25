'use strict';

/**
 * release-note service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::release-note.release-note');
