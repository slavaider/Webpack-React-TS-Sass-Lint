import ApiStore from "@shared/store/ApiStore";
import { ApiResponse, HTTPMethod } from "@shared/store/ApiStore/types";

import {
  GetBranchesResponse,
  GetRepositoryDataResponse,
  IGitHubStore,
} from "./types";

export default class GitHubStore implements IGitHubStore {
  private readonly api: ApiStore = new ApiStore("https://api.github.com");

  getRepositoryData(
    organisationName: string
  ): Promise<ApiResponse<GetRepositoryDataResponse, Error>> {
    const options = {
      method: HTTPMethod.GET,
      endpoint: `orgs/${organisationName}/repos`,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    };
    return this.api.request(options);
  }

  getRepositoryBranches(
    owner: string,
    repo: string
  ): Promise<ApiResponse<GetBranchesResponse, Error>> {
    const options = {
      method: HTTPMethod.GET,
      endpoint: `repos/${owner}/${repo}/branches`,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    };
    return this.api.request(options);
  }
}
