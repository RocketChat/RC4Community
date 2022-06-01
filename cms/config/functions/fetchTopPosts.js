const axios = require("axios");

module.exports.getLatestCommunityActivity = async (maximumPostCount) => {
  // only run if env var is set, and don't break server
  if ("DISCOURSE_DOMAIN" in Object.keys(process.env)) {
    const TopPost = await axios({
      url: `${process.env.DISCOURSE_DOMAIN}/top.json?period=all`,
      method: "GET",
      headers: {
        "Api-Username": process.env.DISCOURSE_API_USERNAME,
        "Api-Key": process.env.DISCOURSE_API_KEY,
      },
    });
    let currentTopPosts = await strapi.query("discourse").find();
    if (currentTopPosts.length !== 0) {
      let excessPostsCount = currentTopPost.length - maximumPostCount + 1;
      if (
        JSON.stringify(currentTopPosts[currentTopPosts.length - 1].TopPost) !==
        JSON.stringify(TopPost.data)
      ) {
        for (let post of currentTopPosts) {
          if (excessPostsCount > 0) {
            await strapi.query("discourse").delete({ id: post.id });
            excessPostsCount -= 1;
          }
        }
        await strapi.query("discourse").create({
          TopPost: TopPost.data,
        });
      }
    } else {
      await strapi.query("discourse").create({
        TopPost: TopPost.data,
      });
    }
  }
};
