'use strict';

/**
 *  speaker controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::speaker.speaker');
