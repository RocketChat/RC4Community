'use strict';

/**
 *  community controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::community.community', ({ strapi }) =>  ({
    
    async find(ctx) {
      // some custom logic here
      
      // Calling the default core action
      const entity = await await strapi.entityService.findMany('api::community.community', {
        populate: '*'
      })
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
  
      // some more custom logic
  
      return this.transformResponse(sanitizedEntity);
    },
  }));
