import {ApiResponse, IApiStore, RequestParams} from "./types";

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.github.com'
    }

    async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        try {
            const response = await fetch(this.baseUrl + params.endpoint, params);
            const data = await response.json();
            return {
                data, status: response.status, success: response.status === 200
            }
        } catch (err) {
            throw Error(err);
        }
    }
}
