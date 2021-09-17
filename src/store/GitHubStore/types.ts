import IBranch from "@interfaces/branch";
import IRepository from "@interfaces/repository";
import { ApiResponse } from "@shared/store/ApiStore/types";

/** Интерфейс класса для работы с GitHub API
 * названия getSomeData и postSomeData
 * (а также типов GetSomeDataParams и PostSomeDataPrams)
 * поменяйте в соответствии с выполняемым запросом.
 * Выберите любой запрос из публичного API GitHub.
 */

export type GetRepositoryDataResponse = {
  data: Array<IRepository>;
};

export type GetBranchesResponse = {
  data: Array<IBranch>;
};

export interface IGitHubStore {
  getRepositoryData(
    organisation: string,
    page: number
  ): Promise<ApiResponse<GetRepositoryDataResponse, Error>>;

  getRepositoryBranches(
    owner: string,
    repo: string
  ): Promise<ApiResponse<GetBranchesResponse, Error>>;
}
