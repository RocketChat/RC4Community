'use strict';

/**
 *  top-nav-item controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::top-nav-item.top-nav-item', ({ strapi }) =>  ({
    
    async find(ctx) {
      // some custom logic here
      
      // Calling the default core action
      const entity = await strapi.service('api::top-nav-item.top-nav-item').find({populate: true});
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
  
      // some more custom logic
  
      return this.transformResponse(sanitizedEntity);
    },
  }));
