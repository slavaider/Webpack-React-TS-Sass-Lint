export type GithubBranchApi = {
  name: string;
  commit: {
    url: string;
    sha: string;
  };
  protected: true;
  protection_url: string;
};

export type GithubBranchModel = {
  name: string;
  commit: {
    url: string;
    sha: string;
  };
  protected: true;
  protectionUrl: string;
};

export const normalizeGithubBranch = (
  from: GithubBranchApi
): GithubBranchModel => ({
  commit: { sha: from.commit.sha, url: from.commit.url },
  name: from.name,
  protected: from.protected,
  protectionUrl: from.protection_url,
});
