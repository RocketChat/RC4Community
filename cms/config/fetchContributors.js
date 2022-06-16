const axios = require("axios");

module.exports.getCommunityContributors = async (
  leaderBoardApi,
  communityId,
  communityName
) => {
  try {
    let community = null;
    let communityCount = await strapi.db
      .query("api::community.community")
      .count({ communityId: communityId });
    if (communityCount === 0) {
      community = await strapi.service("api::community.community").create({
        data: {
          communityId: communityId,
          communityName: communityName,
        },
      });
    } else {
      community = await strapi.db.query("api::community.community").findOne({
        where: { communityId: communityId }
      });
    }

    let res = await axios({
      url: leaderBoardApi,
      method: "GET",
    });
    let data = res.data;
    const list = Object.keys(data);
    let contributors = [];
    list.forEach((username) => {
      contributors.push({
        username,
        avatarUrl: data[username].avatarUrl,
        profileUrl: data[username].home,
        mergedPRsNumber: data[username].mergedPRsNumber,
        mergedPRsLink: data[username].mergedPRsLink,
        openPRsNumber: data[username].openPRsNumber,
        openPRsLink: data[username].openPRsLink,
        issuesNumber: data[username].issuesNumber,
        issuesLink: data[username].issuesLink,
        community: community.id,
      });
    });

    contributors.forEach(async (contributor) => {
      let contributorCount = await strapi.db
        .query("api::g-so-c-contributor.g-so-c-contributor")
        .count({
          username: contributor.username,
          community: community.id,
        });
      if (contributorCount === 0) {
        await strapi
          .service("api::g-so-c-contributor.g-so-c-contributor")
          .create({ data: contributor });
      } else {
        await strapi
          .db.query("api::g-so-c-contributor.g-so-c-contributor")
          .update({
            where: {
              username: contributor.username,
              community: community.id,
            },
            data: contributor,
          });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
