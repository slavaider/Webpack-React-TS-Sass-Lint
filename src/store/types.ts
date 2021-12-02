/** Интерфейс класса для работы с GitHub API
 * названия getSomeData и postSomeData
 * (а также типов GetSomeDataParams и PostSomeDataPrams)
 * поменяйте в соответствии с выполняемым запросом.
 * Выберите любой запрос из публичного API GitHub.
 */

export interface IGitHubStore {
  getRepositoryData?(organisation: string, page: number): Promise<void>;

  getRepositoryBranches?(owner: string, repo: string): Promise<void>;
}
