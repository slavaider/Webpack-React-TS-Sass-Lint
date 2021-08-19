import {GetUserDataResponse, IGitHubStore, PostSomeDataPrams} from "./types";
import ApiStore from "@shared/store/ApiStore";
import {ApiResponse, HTTPMethod} from '@shared/store/ApiStore/types';

export default class GitHubStore implements IGitHubStore {
    readonly api: ApiStore;

    constructor() {
        this.api = new ApiStore();
    }

    // https://docs.github.com/en/rest/reference/search#search-users
    getUserData(organisation: string): Promise<ApiResponse<GetUserDataResponse, any>> {
        const options = {
            method: HTTPMethod.GET,
            data: undefined,
            endpoint: `/search/users?q=${organisation}`,
            headers: {
                Accept: "application/vnd.github.v3+json"
            }
        }
        return this.api.request(options)
    }

    async postSomeData(params: PostSomeDataPrams): Promise<any> {
        return 1
    }
}
