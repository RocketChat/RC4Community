import { fetchAPI } from "./api";

export const gitlabKitData = async (project_id , needed) => {
  try {
    const res = await fetchAPI("/gitlab-repositories");
    const databaseMap = {
      "issues" : "gitlab_issue",
      "merges" : "gitlab_merge_request",
      "members" : "gitlab_member"
    };
    let neededRepository = new Object();
    res.forEach((repo) => {
      if (repo.project_id === project_id) {
        neededRepository["id"] = repo.id;
        neededRepository["project_id"] = repo.project_id;
        neededRepository["project_data"] = repo.project_data;
        if(Array.isArray(needed)){
          needed.forEach((neededData) => {
            neededRepository[neededData] = repo[databaseMap[neededData]];
          });
        }else if(typeof needed !== 'undefined'){
          neededRepository[needed] = repo[needed];
        } 
      }
    });
    return neededRepository;
  } catch (error) {
    console.log(error);
  }
};