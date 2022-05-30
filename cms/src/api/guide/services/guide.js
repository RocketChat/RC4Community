'use strict';

/**
 * guide service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::guide.guide', ({ strapi }) =>  ({

    // Method 2: Wrapping a core service (leaves core logic in place)
    async create(...args) {  
      // Calling the default core controller
      const { data, meta } = await super.createOrUpdate(...args);
  
      // some custom logic
  
      return { data, meta };
    },
  }));
