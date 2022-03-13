const { Octokit } = require("@octokit/core");

const octokit = new Octokit();

const getRepoData = async function (parent, repo) {
  try {
    let returnedData = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: parent,
      repo: repo,
    });
    const { data } = returnedData;
    const {
      id,
      name,
      owner,
      full_name,
      html_url,
      description,
      stargazers_count,
      forks_count,
      open_issues_count,
      topics,
    } = data;
    const ownerName = owner.login;
    const compactData = {
      id,
      full_name,
      name,
      ownerName,
      html_url,
      description,
      stargazers_count,
      forks_count,
      open_issues_count,
      topics,
    };
    return {
      success: true,
      data: compactData,
    };
  } catch (err) {
    return {
      error_message: err,
      success: false,
      message: "Internal Server Error!",
    };
  }
};

const getRepoIssues = async function (owner, repo) {
  try {
    let returnedData = await octokit.request(
      "GET /repos/{owner}/{repo}/issues",
      {
        owner: owner,
        repo: repo,
      }
    );
    let data = returnedData.data;
    let issueList = [];
    data.forEach((issue) => {
      let newIssue = new Object();
      if (typeof issue.pull_request === "undefined") {
        newIssue["id"] = issue.id;
        let { login, avatar_url, html_url } = issue.user;
        newIssue["user"] = { login, avatar_url, html_url };
        newIssue["title"] = issue.title;
        newIssue["number"] = issue.number;
        newIssue["html_url"] = issue.html_url;
        newIssue["reactions"] = issue.reactions;
        newIssue["comments"] = issue.comments;
        newIssue["body"] = issue.body;
        issueList.push(newIssue);
      }
    });
    return {
      success: true,
      data: issueList,
    };
  } catch (err) {
    return {
      error_message: err,
      success: false,
      message: "Internal Server Error!",
    };
  }
};

const getRepoPulls = async function (owner, repo) {
  try {
    let returnedData = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls",
      {
        owner: owner,
        repo: repo,
      }
    );
    let data = returnedData.data;
    let pullList = [];
    data.forEach((pull) => {
      let newPull = new Object();

      newPull["id"] = pull.id;
      let { login, avatar_url, html_url } = pull.user;
      newPull["user"] = { login, avatar_url, html_url };
      newPull["title"] = pull.title;
      newPull["number"] = pull.number;
      newPull["state"] = pull.state;

      newPull["html_url"] = pull.html_url;
      pullList.push(newPull);
    });
    return {
      success: true,
      data: pullList,
    };
  } catch (err) {
    return {
      error_message: err,
      success: false,
      message: "Internal Server Error!",
    };
  }
};

const getRepoContributors = async function (owner, repo) {
  try {
    const contributorData = await octokit.request(
      "GET /repos/{owner}/{repo}/contributors",
      {
        owner: owner,
        repo: repo,
      }
    );

    const data = contributorData.data;
    let contributorList = [];
    data.forEach((contributor) => {
      let newContributor = new Object();
      newContributor["login"] = contributor.login;
      newContributor["html_url"] = contributor.html_url;
      newContributor["avatar_url"] = contributor.avatar_url;
      newContributor["contributions"] = contributor.contributions;
      contributorList.push(newContributor);
    });

    return {
      success: true,
      data: contributorList,
    };
  } catch (err) {
    return {
      error_message: err,
      success: false,
      message: "Internal Server Error!",
    };
  }
};

module.exports.githubKit = async function (owner, name, needed) {
  try {
    
    let getIssues = false;
    let getPulls = false;
    let getContributors = false;
    if (Array.isArray(needed)) {
      needed.forEach((need) => {
        if (need === "issues") {
          getIssues = true;
        } else if (need === "pulls") {
          getPulls = true;
        } else if (need === "contributors") {
          getContributors = true;
        }
      });
    } else {
      if (needed === "issues") {
        getIssues = true;
      } else if (needed === "pulls") {
        getPulls = true;
      } else if (needed === "contributors") {
        getContributors = true;
      }
    }

    let repoData = await getRepoData(owner, name);

    let githubRepositoryCount = await strapi
      .query("github-repositories")
      .count({
        owner: owner,
        name: name,
      });
    let githubRepository = await strapi.query("github-repositories").findOne({
      owner: owner,
      name: name,
    });

    if (repoData.success) {
      if (githubRepositoryCount === 0) {
        githubRepository = await strapi.query("github-repositories").create({
          owner: owner,
          name: name,
          repositoryData: repoData.data,
          unqiueId: repoData.data.id,
        });
      } else {
        githubRepository.repositoryData = repoData.data;
        githubRepository.unqiueId = repoData.data.id;
        await strapi.query("github-repositories").update(
          {
            id: githubRepository.id,
          },
          githubRepository
        );
      }
    }

    if (getIssues) {
      const issuesData = await getRepoIssues(owner, name);

      if (issuesData.success) {
        const issueCount = await strapi.query("ghissue").count({
          github_repository: githubRepository.id,
        });
        if (issueCount === 0) {
          let newissueData = await strapi.query("ghissue").create({
            github_repository: githubRepository.id,
            Issues: issuesData.data,
          });
          issuesId = newissueData.id;
        } else {
          await strapi.query("ghissue").update(
            {
              github_repository: githubRepository.id,
            },
            {
              github_repository: githubRepository.id,
              Issues: issuesData.data,
            }
          );
        }
      }
    }

    if (getPulls) {
      const pullData = await getRepoPulls(owner, name);

      if (pullData.success) {
        const contributorsDataCount = await strapi.query("ghpulls").count({
          github_repository: githubRepository.id,
        });
        if (contributorsDataCount === 0) {
          let newPullsData = await strapi.query("ghpulls").create({
            github_repository: githubRepository.id,
            pulls: pullData.data,
          });
          pullsId = newPullsData.id;
        } else {
          await strapi.query("ghpulls").update(
            {
              github_repository: githubRepository.id,
            },
            {
              github_repository: githubRepository.id,
              pulls: pullData.data,
            }
          );
        }
      }
    }

    if (getContributors) {
      const contributorData = await getRepoContributors(owner, name);
      if (contributorData.success) {
        const contributorsDataCount = await strapi
          .query("ghcontributor")
          .count({
            github_repository: githubRepository.id,
          });

        if (contributorsDataCount === 0) {
          let newGithubContributor = await strapi
            .query("ghcontributor")
            .create({
              github_repository: githubRepository.id,
              Contributors: contributorData.data,
            });
        } else {
          await strapi.query("ghcontributor").update(
            {
              github_repository: githubRepository.id,
            },
            {
              github_repository: githubRepository.id,
              Contributors: contributorData.data,
            }
          );
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
