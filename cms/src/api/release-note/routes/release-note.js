'use strict';

/**
 * release-note router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::release-note.release-note');
