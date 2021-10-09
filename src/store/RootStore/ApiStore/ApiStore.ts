import qs from "qs";

import { ApiResponse, IApiStore, RequestParams, StatusHTTP } from "./types";

export default class ApiStore implements IApiStore {
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<SuccessT, ErrorT = Error, ReqT = Record<string, unknown>>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    const query = params.data ? `?${qs.stringify(params.data)}` : "";
    const response = await fetch(
      `${this.baseUrl}${params.endpoint}${query}`,
      params
    );

    const data = await response.json();

    if (response.ok) {
      return {
        success: response.ok,
        status: response.status,
        data,
      };
    }
    return {
      success: response.ok,
      status: StatusHTTP.parseError,
      data: data.message,
    };
  }
}
