import IUser from "@interfaces/user";
import { ApiResponse } from "@shared/store/ApiStore/types";

/** Интерфейс класса для работы с GitHub API
 * названия getSomeData и postSomeData
 * (а также типов GetSomeDataParams и PostSomeDataPrams)
 * поменяйте в соответствии с выполняемым запросом.
 * Выберите любой запрос из публичного API GitHub.
 */

export type GetUserDataResponse = {
  total_count: number;
  items: Array<IUser>;
  incomplete_results: boolean;
};

export interface IGitHubStore {
  getUserData(
    organisation: string
  ): Promise<ApiResponse<GetUserDataResponse, Error>>;
}
