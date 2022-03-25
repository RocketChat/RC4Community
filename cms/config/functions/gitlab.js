const axios = require('axios');

const getRepoData = async function (project_id,token) {
  try {
    let returnedData = await axios({
        method: 'GET',
        url: `https://gitlab.com/api/v4/projects/${project_id}`,
        headers: { Authorization: `Bearer ${token}` }
      });

      const { data } = returnedData;
      const {
        id,
        name,
        namespace,
        name_with_namespace,
        http_url_to_repo,
        description,
        star_count,
        forks_count,
        open_issues_count,
        topics,
      } = data;
      const html_url = http_url_to_repo;
      const ownerName = namespace.name;
      const full_name = name_with_namespace;
      const compactData = {
        id,
        full_name,
        name,
        ownerName,
        html_url,
        description,
        star_count,
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

const getRepoIssues = async function (project_id,token) {
  try {
    let returnedData = await axios({
        method: 'GET',
        url: `https://gitlab.com/api/v4/projects/${project_id}/issues`,
        headers: { Authorization: `Bearer ${token}` }
      });
    let data = returnedData.data; 
    let issueList = [];

    data.forEach((issue)=>{
        let newIssue = new Object();
        if(issue.state === 'opened' ){
            newIssue['id'] = issue.id;
            newIssue['author'] = issue.author;
            newIssue['title'] = issue.title;
            newIssue['iid'] = issue.iid;
            newIssue['web_url'] = issue.web_url;
            newIssue['created_at'] = issue.created_at;
            newIssue['upvotes'] = issue.upvotes;
            newIssue['downvotes'] = issue.downvotes;
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

const getRepoMerges = async function (project_id,token) {
  try {
    let returnedData = await axios({
        method: 'GET',
        url: `https://gitlab.com/api/v4/projects/${project_id}/merge_requests`,
        headers: { Authorization: `Bearer ${token}` }
      });
    let data = returnedData.data; 

    let mergeRequestList = [];
    data.forEach((mergeRequest)=>{
       
        let newMergeRequest = new Object();
        if(mergeRequest.closed_at === null ){
            newMergeRequest['id'] = mergeRequest.id;
            newMergeRequest['author'] = mergeRequest.author;
            newMergeRequest['title'] = mergeRequest.title;
            newMergeRequest['iid'] = mergeRequest.iid;
            newMergeRequest['web_url'] = mergeRequest.web_url;
            newMergeRequest['created_at'] = mergeRequest.created_at;
            newMergeRequest['upvotes'] = mergeRequest.upvotes;
            newMergeRequest['downvotes'] = mergeRequest.downvotes;
            mergeRequestList.push(newMergeRequest);
        }
    });
    return {
      success: true,
      data: mergeRequestList,
    };
  } catch (err) {
    return {
      error_message: err,
      success: false,
      message: "Internal Server Error!",
    };
  }
};

const getProjectMembers = async function (project_id,token) {
  try {
    let returnedData = await axios({
        method: 'GET',
        url: `https://gitlab.com/api/v4/projects/${project_id}/members`,
        headers: { Authorization: `Bearer ${token}` }
      });
    
     const { data } = returnedData;
   

     
    let contributorList = [];
    data.forEach((contributor) => {
    let newContributor = new Object();
    newContributor["id"] = contributor.id;
    newContributor["web_url"] = contributor.web_url;
    newContributor["name"] = contributor.name;
    newContributor["username"] = contributor.username;
    newContributor["avatar_url"] = contributor.avatar_url;
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

module.exports.gitlabKit = async function (project_id , needed) {
  try {
    let getIssues = false;
    let getMerges = false;
    let getMembers = false;
    if (Array.isArray(needed)) {
      needed.forEach((need) => {
        if (need === "issues") {
          getIssues = true;
        } else if (need === "merges") {
          getMerges = true;
        } else if (need === "members") {
          getMembers = true;
        }
      });
    } else {
      if (needed === "issues") {
        getIssues = true;
      } else if (needed === "merges") {
        getMerges = true;
      } else if (needed === "members") {
        getMembers = true;
      }
    }
    const token = process.env.GITLAB_TOKEN;
    let repoData = await getRepoData(project_id,token);

    let gitlabRepositoryCount = await strapi
      .query("gitlab-repositories")
      .count({
        project_id:project_id
      });
    let gitlabRepository = await strapi.query("gitlab-repositories").findOne({
        project_id:project_id
    });

    if (repoData.success) {
      if (gitlabRepositoryCount === 0) {
        gitlabRepository = await strapi.query("gitlab-repositories").create({
          project_id: repoData.data.id,
          project_data: repoData.data,
        });
      } else {
        gitlabRepository.project_data = repoData.data;
        gitlabRepository.project_id = repoData.data.id;
        await strapi.query("gitlab-repositories").update(
          {
            id: gitlabRepository.id,
          },
          gitlabRepository
        );
      }
    }

    if (getIssues) {
      const issuesData = await getRepoIssues(project_id , token);

      if (issuesData.success) {
        const issueCount = await strapi.query("gitlab-issues").count({
            gitlab_repository: gitlabRepository.id,
        });
        if (issueCount === 0) {
          let newissueData = await strapi.query("gitlab-issues").create({
            gitlab_repository: gitlabRepository.id,
            issues: issuesData.data,
          });
          issuesId = newissueData.id;
        } else {
          await strapi.query("gitlab-issues").update(
            {
                gitlab_repository: gitlabRepository.id,
            },
            {
                gitlab_repository: gitlabRepository.id,
                issues: issuesData.data,
            }
          );
        }
      }
    }

    if (getMerges) {
      const mergeData = await getRepoMerges(project_id, token);
      if (mergeData.success) {
        const mergeDataCount = await strapi.query("gitlab-merge-requests").count({
          gitlab_repository: gitlabRepository.id,
        });
        if (mergeDataCount === 0) {
            await strapi.query("gitlab-merge-requests").create({
            gitlab_repository: gitlabRepository.id,
            merges: mergeData.data,
          });
        } else {
          await strapi.query("gitlab-merge-requests").update(
            {
              gitlab_repository: gitlabRepository.id,
            },
            {
              gitlab_repository: gitlabRepository.id,
              merges: mergeData.data,
            }
          );
        }
      }
    }

    if (getMembers) {
      const memberData = await getProjectMembers(project_id, token);
      if (memberData.success) {
        const membersDataCount = await strapi
          .query("gitlab-members")
          .count({
            gitlab_repository: gitlabRepository.id,
          });

        if (membersDataCount === 0) {
          await strapi
            .query("gitlab-members")
            .create({
              gitlab_repository: gitlabRepository.id,
              members: memberData.data,
            });
        } else {
          await strapi.query("gitlab-members").update(
            {
              gitlab_repository: gitlabRepository.id,
            },
            {
              gitlab_repository: gitlabRepository.id,
              members: memberData.data,
            }
          );
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};