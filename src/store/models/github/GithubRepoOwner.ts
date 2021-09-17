export type GithubRepoOwnerApi = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
};

export type GithubRepoOwnerModel = {
  login: string;
  id: number;
  nodeId: string;
  avatarUrl: string;
};

export const normalizeGithubRepoOwner = (
  from: GithubRepoOwnerApi
): GithubRepoOwnerModel => ({
  avatarUrl: from.avatar_url,
  id: from.id,
  login: from.login,
  nodeId: from.node_id,
});
