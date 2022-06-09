const axios = require("axios");

module.exports.getLatestCommunityActivity = async () => {
  // only run if env var is set, and don't break server
  if ('DISCOURSE_DOMAIN' in Object.keys(process.env)) {
    const TopPost = await axios({
      url: `${process.env.DISCOURSE_DOMAIN}/top.json?period=all`,
      method: "GET",
      headers: {
        "Api-Username": process.env.DISCOURSE_API_USERNAME,
        "Api-Key": process.env.DISCOURSE_API_KEY,
      },
    });
    let currentTopPost = await strapi.service("api::discourse.discourse").find();
    if (currentTopPost.length !== 0) {
      await strapi.service("api::discourse.discourse").update(
        { id: currentTopPost[0].id },
        {
          TopPost: TopPost.data,
        }
      );
    } else {
      await strapi.service("api::discourse.discourse").create({
        TopPost: TopPost.data,
      });
    }
  }
};
