"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {

  const role = await strapi
    .query("role", "users-permissions")
    .findOne({ type: "public" });
  const permissions = await strapi
    .query("permission", "users-permissions")
    .find({ type: "application", role: role.id });

  await Promise.all(
    permissions.map((p) => {
      if (p.action === "find") {
        strapi
          .query("permission", "users-permissions")
          .update({ id: p.id }, { enabled: true });
      }
    })
  );

  // Fetches data and populates CMS from remote on server restart
  if (process.env.INITIALIZE_DATA) {
    await strapi.config.functions.fetchData();
  }
};
