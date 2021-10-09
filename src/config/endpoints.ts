const endponts = {
  repoBranches: (owner: string, repo: string): string =>
    `/repos/${owner}/${repo}/branches`,
  repoData: (organisationName: string): string =>
    `/orgs/${organisationName}/repos`,
};

export default endponts;
