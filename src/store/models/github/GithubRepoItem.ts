import {
  GithubRepoOwnerApi,
  GithubRepoOwnerModel,
  normalizeGithubRepoOwner,
} from "./GithubRepoOwner";

export type GithubRepoItemApi = {
  id: number;
  node_id: string;
  updated_at: string;
  name: string;
  stargazers_count: number;
  owner: GithubRepoOwnerApi;
  html_url: string;
};

export type GithubRepoItemModel = {
  id: number;
  nodeId: string;
  updatedAt: string;
  name: string;
  stargazersCount: number;
  owner: GithubRepoOwnerModel;
  htmlUrl: string;
};

export const normalizeGithubRepoItem = (
  from: GithubRepoItemApi
): GithubRepoItemModel => ({
  id: from.id,
  nodeId: from.node_id,
  updatedAt: from.updated_at,
  name: from.name,
  stargazersCount: from.stargazers_count,
  owner: normalizeGithubRepoOwner(from.owner),
  htmlUrl: from.html_url,
});
