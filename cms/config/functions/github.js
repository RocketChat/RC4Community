const { Octokit } = require("@octokit/core");

const octokit = new Octokit();

const getRepoData = async function(owner,repo){

  try{
      
      let returnedData = await octokit.request("GET /repos/{owner}/{repo}", {
          owner: owner,
          repo: repo,
      });
      const {data} = returnedData;
      const {id,name,owner,full_name , html_url , description , stargazers_count,forks_count,open_issues_count,topics } = data;
      const ownerName = owner.login;
      const compactData = {id,full_name , name,ownerName, html_url , description , stargazers_count,forks_count,open_issues_count,topics};
      return res.json({
          data : compactData
      })

  }catch(err){
      return res.json({
          error_message : err,
          success:false,
          message:"Internal Server Error!"
      })
  }

}


const getIssues = async (owner, repo) => {
  try {
    const res = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner,
      repo,
    });
    let issues = [];
    if (res.status === 200) {
      issues = res.data.filter((issue) => !issue.pull_request);
    }
    return issues;
  } catch (err) {
    return err;
  }
};


const getContributors = async (owner, repo) => {
  try {
    const res = await octokit.request(
      "GET /repos/{owner}/{repo}/contributors",
      {
        owner,
        repo,
        per_page: 100,
      }
    );
    let contributors = [];
    if (res.status === 200) {
      contributors = res.data;
    }
    return contributors;
  } catch (err) {
    return err.message;
  }
};

module.exports.getGithubIssues = async (owner, repo) => {
  const Issues = await getIssues(owner, repo);
  let currentIssues = await strapi.query("ghissue").find();
    if (currentIssues.length !== 0) {
      await strapi.query("ghissue").update(
        { id: currentIssues[0].id },
        {
          Issues
        }
      );
    } else {
      await strapi.query("ghissue").create({
        Issues
      });
    }
};

module.exports.getGithubContributors = async (owner, repo) => {
  const Contributors = await getContributors(owner, repo);
  let currentContributors = await strapi.query("ghcontributor").find();
  if (currentContributors.length !== 0) {
    await strapi.query("ghcontributor").update(
      { id: currentContributors[0].id },
      {
        Contributors
      }
    );
  } else {
    await strapi.query("ghcontributor").create({
      Contributors
    });
  }
}


module.exports.githubKit = async () => {
  
  let githubRepositories = await strapi.query('github-repositories').find({});
  githubKit.forEach(repo => {
    if(repo.fresh){
      let repoData = getRepoData(repo.owner,repo.name);
      repo.fresh = false;
      repo.repositoryData = repoData;
      repo.unqiueId;
      repo.unqiueId = repoData.id;
    }
    if(repo.get_issues){

    }

  });

}