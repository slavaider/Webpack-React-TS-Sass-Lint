import ApiStore from '@shared/store/ApiStore';
import { ApiResponse, HTTPMethod } from '@shared/store/ApiStore/types';
import { GetUserDataResponse, IGitHubStore, PostSomeDataPrams } from './types';

export default class GitHubStore implements IGitHubStore {
  private readonly api: ApiStore = new ApiStore();

  // https://docs.github.com/en/rest/reference/search#search-users
  getUserData(
    userName: string,
  ): Promise<ApiResponse<GetUserDataResponse, Error>> {
    const options = {
      method: HTTPMethod.GET,
      data: {
        q: userName,
      },
      endpoint: 'search/users',
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    };
    return this.api.request(options);
  }

  // Next task \ rip eslint :)
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any,class-methods-use-this
  async postSomeData(params: PostSomeDataPrams): Promise<any> {
    return 1;
  }
}
