'use strict';

/**
 * top-nav-item service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::top-nav-item.top-nav-item', ({ strapi }) =>  ({

    // Method 2: Wrapping a core service (leaves core logic in place)
    async create(...args) {  
      // Calling the default core controller
      const { data, meta } = await super.createOrUpdate(...args);  
      // some custom logic
  
      return { data, meta };
    },
  }));
