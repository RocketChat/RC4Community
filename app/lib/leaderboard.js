export function contributorList(data) {
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
        });
    });

    contributors = contributors.sort((contributor1, contributor2) => {
        if (contributor1.mergedPRsNumber === contributor2.mergedPRsNumber) {
        if (contributor1.openPRsNumber === contributor2.openPRsNumber) {
            if (contributor1.issuesNumber < contributor2.issuesNumber) {
            return 1;
            }
            return -1;
        }
        if (contributor1.openPRsNumber < contributor2.openPRsNumber) {
            return 1;
        }
        return -1;
        }

        if (contributor1.mergedPRsNumber < contributor2.mergedPRsNumber) {
        return 1;
        }
        return -1;
    });
    return contributors;
}