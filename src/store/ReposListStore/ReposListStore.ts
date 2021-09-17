import endpoints from "@config/endpoints";
import { ILocalStore } from "@shared/hooks/useLocalStore";
import { IGitHubStore } from "@store/index";
import {
  GithubRepoItemApi,
  GithubRepoItemModel,
  normalizeGithubRepoItem,
} from "@store/models/github";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizedCollection,
  normalizeCollection,
} from "@store/models/shared/collection";
import RootStore from "@store/RootStore";
import { HTTPMethod } from "@store/RootStore/ApiStore/types";
import Meta from "@utils/meta";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

type PrivateFields = "_repos" | "_meta";

export default class ReposListStore implements IGitHubStore, ILocalStore {
  private _repos: CollectionModel<number, GithubRepoItemModel> =
    getInitialCollectionModel();

  private _meta: Meta = Meta.initial;

  public page = 1;

  public repoName = "";

  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
      _repos: observable.ref,
      _meta: observable,
      page: observable,
      repoName: observable,

      repos: computed,
      meta: computed,

      getRepositoryData: action,
      setPage: action.bound,
      changeRepo: action.bound,
    });
  }

  get repos(): GithubRepoItemModel[] {
    return linearizedCollection(this._repos);
  }

  get meta(): Meta {
    return this._meta;
  }

  async changeRepo(rawData: string): Promise<void> {
    const newData = rawData.trim();

    this._repos = getInitialCollectionModel();
    this.page = 1;
    await this.getRepositoryData(newData, this.page);
    runInAction(() => {
      this.repoName = newData;
      RootStore.query.setParam("search", newData);
    });
  }

  async setPage(): Promise<void> {
    await this.getRepositoryData(this.repoName, this.page + 1);
    runInAction(() => {
      this.page += 1;
    });
  }

  async getRepositoryData(
    organisationName: string,
    page: number
  ): Promise<void> {
    this._meta = Meta.loading;

    const options = {
      method: HTTPMethod.GET,
      data: {
        per_page: 12,
        page,
      },
      endpoint: endpoints.repoData(organisationName),
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    };
    const response = await RootStore.api.request<GithubRepoItemApi[]>(options);

    runInAction(() => {
      if (response.success) {
        try {
          this._meta = Meta.success;

          const list: GithubRepoItemModel[] = [...this.repos];
          response.data.forEach((element) => {
            list.push(normalizeGithubRepoItem(element));
          });
          this._repos = normalizeCollection(list, (item) => item.id);

          return;
        } catch (err) {
          this._meta = Meta.error;
          this._repos = getInitialCollectionModel();
        }
      }

      this._meta = Meta.error;
    });
  }

  destroy(): void {
    this._qsReaction();
  }

  private readonly _qsReaction: IReactionDisposer = reaction(
    () => RootStore.query.getParam("search"),
    (search) => {
      console.log(search);
    }
  );
}
