import { fetchAPI } from "./api";

export const contributorList = (contributors) => {
    contributors = contributors.data.sort((contributor1, contributor2) => {
        if (contributor1.attributes.mergedPRsNumber === contributor2.attributes.mergedPRsNumber) {
        if (contributor1.attributes.openPRsNumber === contributor2.attributes.openPRsNumber) {
            if (contributor1.attributes.issuesNumber < contributor2.attributes.issuesNumber) {
            return 1;
            }
            return -1;
        }
        if (contributor1.attributes.openPRsNumber < contributor2.attributes.openPRsNumber) {
            return 1;
        }
        return -1;
        }

        if (contributor1.attributes.mergedPRsNumber < contributor2.attributes.mergedPRsNumber) {
        return 1;
        }
        return -1;
    });
    return contributors;
}

export const getCommunityIds = async () => {
    let communities = await fetchAPI("/communities");
    let paths = [];
    communities.data.forEach((community) => {
        paths.push({
            params: { id: community.attributes.communityId },
        });
    });
    return paths;
} 