import {ApiResponse} from "@shared/store/ApiStore/types";
import IUser from "@interfaces/user";

/** Интерфейс класса для работы с GitHub API
 * названия getSomeData и postSomeData
 * (а также типов GetSomeDataParams и PostSomeDataPrams)
 * поменяйте в соответствии с выполняемым запросом.
 * Выберите любой запрос из публичного API GitHub.
 */

// POST
export type PostSomeDataResp = {
    id: number,
    name: string,
}

export type PostSomeDataPrams = {
    org: string;
    body: any
}

// GET
export type GetUserDataResponse = {
    total_count: number,
    items: Array<IUser>,
    incomplete_results: boolean
}

export interface IGitHubStore {
    getUserData(organisation: string): Promise<ApiResponse<GetUserDataResponse, any>>;

    // Необязательный пункт, т.к. требует авторизации. Понадобится в будущем
    postSomeData(params: PostSomeDataPrams): Promise<ApiResponse<PostSomeDataResp, any>>;
}
