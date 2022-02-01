export function contributorList(contributors) {
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