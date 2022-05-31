'use strict';

/**
 *  top-nav-item controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::top-nav-item.top-nav-item', ({ strapi }) =>  ({
    
    async find(ctx) {
      // some custom logic here
      
      // Calling the default core action
      const entity = await await strapi.entityService.findMany('api::top-nav-item.top-nav-item', {
        populate: {
          body: {
            populate: '*'
          }
        },
      })
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
  
      // some more custom logic
  
      return this.transformResponse(sanitizedEntity);
    },
  }));
