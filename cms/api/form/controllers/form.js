"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;

    console.log("type", ctx.request.body)

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.form.create(data, { files });
    } else {
      entity = await strapi.services.form.create(ctx.request.body);
      console.log("entiy", entity, "body", ctx.request.body)
    }
    return sanitizeEntity(entity, { model: strapi.models.form });
  },
};
