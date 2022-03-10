const { Octokit } = require("@octokit/core");

const octokit = new Octokit();

const getRepoData = async function(parent,repo){

  try{
      
      let returnedData = await octokit.request("GET /repos/{owner}/{repo}", {
        owner : parent,
          repo,
      });
      const {data} = returnedData;
      const {id,name,owner,full_name , html_url , description , stargazers_count,forks_count,open_issues_count,topics } = data;
      const ownerName = owner.login;
      const compactData = {id,full_name , name,ownerName, html_url , description , stargazers_count,forks_count,open_issues_count,topics};
      return {
          success : true,
          data : compactData
      }

  }catch(err){
      return {
          error_message : err,
          success:false,
          message:"Internal Server Error!"
      }
  }

}

const getIssues = async function(owner,repo){

  try{
      let returnedData = await octokit.request("GET /repos/{owner}/{repo}/issues", {
          owner ,
          repo
        });
      let data = returnedData.data;
      let issueList = [];
      data.forEach((issue)=>{
         
          let newIssue = new Object();
          if(typeof issue.pull_request === 'undefined' ){
              newIssue['id'] = issue.id;
              let {login,avatar_url,html_url} = issue.user;
              newIssue['user'] = {login,avatar_url,html_url};
              newIssue['title'] = issue.title;
              newIssue['number'] = issue.number;
              newIssue['html_url'] = issue.html_url;
              issueList.push(newIssue);
          }
      });
      return {
          success : true ,
          data : issueList
      }
  }catch(err){
      return {
          error_message : err,
          success:false,
          message:"Internal Server Error!"
      }
  }

}

const getPulls = async function(owner,repo){

  try{
      let returnedData = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
          owner: owner,
          repo: repo,
        });
      let data = returnedData.data;
      let pullList = [];
      data.forEach((pull)=>{
         
          let newPull = new Object();
         
              newPull['id'] = pull.id;
              let {login,avatar_url,html_url} = pull.user;
              newPull['user'] = {login,avatar_url,html_url};
              newPull['title'] = pull.title;
              newPull['number'] = pull.number;
              newPull['state'] = pull.state;
              // console.log(pull.state);
              newPull['html_url'] = pull.html_url;
              pullList.push(newPull);
        
      });
      return {
          success : true,
          data : pullList
      }
  }catch(err){
      return {
          error_message : err,
          success:false,
          message:"Internal Server Error!"
      }
  }

}

module.exports.githubKit = async function() {
  
  let githubRepositories = await strapi.query('github-repositories').find({});
  for(const repo of githubRepositories){
    // console.log(repo.fresh);
    if(repo.fresh){
      let repoData = await getRepoData(repo.owner,repo.name);
      // console.log(repoData);
      if(repoData.success){
        repo.fresh = false;
        repo.repositoryData = repoData.data;
        repo.unqiueId = repoData.data.id;
      }
      
      await strapi.query('github-repositories').update({ 
        id : repo.id,
      },repo);
    }
    if(repo.get_issues){
      let issuesData = await getIssues(repo.owner,repo.name);
      if(issuesData.success){
        let issueCount = await strapi.query('ghissue').count({
          github_repository : repo.id
        });
        if(issueCount === 0){
          let newIssues = await strapi.query('ghissue').create({
            github_repository : repo.id,
            Issues : issuesData.data
          });
        }else{
          await strapi.query('ghissue').update({ 
            github_repository : repo.id,
          },{
            github_repository : repo.id,
            Issues : issuesData.data
          });
        }
      }

    }

  }

}