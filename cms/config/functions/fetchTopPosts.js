const axios = require("axios");

module.exports.getLatestCommunityActivity = async () => {
  const TopPost = await axios({
    url: `${process.env.DISCOURSE_DOMAIN}/top.json?period=all`,
    method: "GET",
    headers: {
      "Api-Username": process.env.DISCOURSE_API_USERNAME,
      "Api-Key": process.env.DISCOURSE_API_KEY,
    },
  });
  let currentTopPost = await strapi.query("discourse").find();
  if (currentTopPost.length !== 0) {
    await strapi.query("discourse").update(
      { id: currentTopPost[0].id },
      {
        TopPost: TopPost.data,
      }
    );
  } else {
    await strapi.query("discourse").create({
      TopPost: TopPost.data,
    });
  }
};
