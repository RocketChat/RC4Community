'use strict';

/**
 *  github-repository controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::github-repository.github-repository', ({ strapi }) =>  ({
    
    async find(ctx) {
      // some custom logic here
      
      // Calling the default core action
      const entity = await await strapi.entityService.findMany('api::github-repository.github-repository', {
        populate: '*'
      })
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
  
      // some more custom logic
  
      return this.transformResponse(sanitizedEntity);
    },
  }));
