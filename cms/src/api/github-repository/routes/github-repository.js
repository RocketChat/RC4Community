'use strict';

/**
 * github-repository router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::github-repository.github-repository');
