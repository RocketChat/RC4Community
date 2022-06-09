"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


const { parseMultipartData } = require("@strapi/utils");

module.exports = createCoreController('api::form.form', ({ strapi }) => ({
  // wrap a core action, leaving core logic in place
  async create(ctx) {
    let entity;
    let sanitizedEntity;

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.service('api::form.form').create(data, { files });
      sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    } else {
      entity = await strapi.service('api::form.form').create(ctx.request.body);
      sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    }
    return this.transformResponse(sanitizedEntity);
  },
}));
