'use strict';

/**
 * github-repository service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::github-repository.github-repository');
