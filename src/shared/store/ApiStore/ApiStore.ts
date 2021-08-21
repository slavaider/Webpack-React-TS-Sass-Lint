import qs from 'qs';
import {
  ApiResponse, IApiStore, RequestParams, StatusHTTP,
} from './types';

export default class ApiStore implements IApiStore {
  readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api.github.com';
  }

  async request<SuccessT, ErrorT = Error, ReqT = Record<string, unknown>>(
    params: RequestParams<ReqT>,
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    try {
      const query = qs.stringify(params.data);
      const response = await fetch(
        `${this.baseUrl}/${params.endpoint}?${query}`,
        params,
      );
      const data = await response.json();

      return {
        success: true,
        status: response.status,
        data,
      };
    } catch (error) {
      return {
        success: false,
        status: StatusHTTP.parseError,
        data: error,
      };
    }
  }
}
