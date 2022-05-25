'use strict';

/**
 *  ghpull controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::ghpull.ghpull');
