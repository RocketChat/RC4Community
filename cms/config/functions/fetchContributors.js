const axios = require("axios");

module.exports.getCommunityContributors = async (
  leaderBoardApi,
  communityId,
  communityName
) => {
  try {
    let community = null;
    let communityCount = await strapi
      .query("communities")
      .count({ communityId: communityId });
    if (communityCount === 0) {
      community = await strapi.query("communities").create({
        communityId: communityId,
        communityName: communityName,
      });
    } else {
      community = await strapi.query("communities").findOne({
        communityId: communityId,
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
      let contributorCount = await strapi.query("g-so-c-contributor").count({
        username: contributor.username,
        community: community.id,
      });
      if (contributorCount === 0) {
        await strapi.query("g-so-c-contributor").create(contributor);
      } else {
        await strapi.query("g-so-c-contributor").update(
          {
            username: contributor.username,
            community: community.id,
          },
          contributor
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
};