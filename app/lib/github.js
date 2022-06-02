import { fetchAPI } from "./api";

export const githubKitData = async (owner, name, needed) => {
  try {
    const res = await fetchAPI("/github-repositories");
    let neededRepository = new Object();
    res.data.forEach((repo) => {
      if (repo.attributes.owner === owner && repo.attributes.name === name) {
        neededRepository["id"] = repo.id;
        neededRepository["name"] = repo.attributes.name;
        neededRepository["owner"] = repo.attributes.owner;
        neededRepository["repositoryData"] = repo.attributes.repositoryData;
        console.log("need", needed, Array.isArray(needed))
        if(Array.isArray(needed)){
          needed.forEach((neededData) => {
            neededRepository[neededData] = repo.attributes[neededData];
          });
        }else if(typeof needed !== 'undefined'){
          neededRepository[needed] = repo.attributes[needed];
        } 
      }
    });
    return neededRepository;
  } catch (error) {
    console.log(error);
  }
};
