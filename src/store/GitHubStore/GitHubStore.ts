import ApiStore from "@shared/store/ApiStore";
import { ApiResponse, HTTPMethod } from "@shared/store/ApiStore/types";

import { GetUserDataResponse, IGitHubStore } from "./types";

export default class GitHubStore implements IGitHubStore {
  private readonly api: ApiStore = new ApiStore("https://api.github.com");

  // https://docs.github.com/en/rest/reference/search#search-users
  getUserData(
    userName: string
  ): Promise<ApiResponse<GetUserDataResponse, Error>> {
    const options = {
      method: HTTPMethod.GET,
      data: {
        q: userName,
      },
      endpoint: "search/users",
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    };
    return this.api.request(options);
  }
}
