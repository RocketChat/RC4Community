import { fetchAPI } from "./api";

export const githubKitData = async (owner, name, needed) => {
  try {
    const res = await fetchAPI("/github-repositories");
    let neededRepository = new Object();
    res.forEach((repo) => {
      if (repo.owner === owner && repo.name === name) {
        neededRepository["id"] = repo.id;
        neededRepository["name"] = repo.name;
        neededRepository["owner"] = repo.owner;
        neededRepository["repositoryData"] = repo.repositoryData;
        if(Array.isArray(needed)){
          needed.forEach((neededData) => {
            neededRepository[neededData] = repo[neededData];
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
