"use strict";

const { getLatestCommunityActivity } = require("../config/fetchTopPosts");
const fetchData = require("./fetchData");

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
  const result = await strapi.service("plugin::users-permissions.role").find();
  return result;
};

const setDefaultPermissions = async () => {
  const roles = await findPublicRole();

  const _public = await strapi
    .service("plugin::users-permissions.role")
    .findOne(roles.filter((role) => role.type === "public")[0].id);
  for (const permission of Object.keys(_public.permissions)) {
    if (permission.startsWith("api")) {
      for (const controller of Object.keys(
        _public.permissions[permission].controllers
      )) {
        _public.permissions[permission].controllers[
          controller
        ].find.enabled = true;
        if (
          _public.permissions[permission].controllers[controller].findOne
        ) {
          _public.permissions[permission].controllers[
            controller
          ].findOne.enabled = true;
        }
      }
    }
  }
  await strapi
    .service("plugin::users-permissions.role")
    .updateRole(_public.id, _public);
};

module.exports = async () => {
  // Fetches data and populates CMS from remote on server restart
  if (process.env.INITIALIZE_DATA) {
    await fetchData();
    await getLatestCommunityActivity();
    await setDefaultPermissions();
  }
};
