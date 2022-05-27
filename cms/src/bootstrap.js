"use strict";

const { getLatestCommunityActivity } = require("../config/fetchTopPosts");


/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

 const findPublicRole = async () => {
  const result = await strapi
  .query("plugin::users-permissions.role")
  .findOne({
    where: {
      type: "public",
    },
  });
  return result;
};

const setDefaultPermissions = async () => {
  const role = await findPublicRole();
  const permissions = await strapi
  .query("plugin::users-permissions.permission")
    .find({
      where: { type: "application", role: role.id },
    });
  await Promise.all(
    permissions.map(p =>
      strapi
        .query("plugin::users-permissions.permission")
        .update({
          where: { id: p.id},
          data: {
            enabled: true,
          },
        })
    )
  );
};



module.exports = async () => {
  // Fetches data and populates CMS from remote on server restart
  if (process.env.INITIALIZE_DATA) {
    await strapi.config.functions.fetchData();
    await getLatestCommunityActivity();
    await setDefaultPermissions();
  }
};
