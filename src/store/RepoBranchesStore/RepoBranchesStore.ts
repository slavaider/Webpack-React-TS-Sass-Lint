import endpoints from "@config/endpoints";
import { ILocalStore } from "@shared/hooks/useLocalStore";
import {
  GithubBranchApi,
  GithubBranchModel,
  normalizeGithubBranch,
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
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { IGitHubStore } from "../types";

type PrivateFields = "_meta" | "_branches";

export default class RepoBranchesStore implements IGitHubStore, ILocalStore {
  private _branches: CollectionModel<string, GithubBranchModel> =
    getInitialCollectionModel();

  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RepoBranchesStore, PrivateFields>(this, {
      _branches: observable.ref,
      _meta: observable,

      meta: computed,
      branches: computed,

      getRepositoryBranches: action,
    });
  }

  get branches(): GithubBranchModel[] {
    return linearizedCollection(this._branches);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRepositoryBranches(owner: string, repo: string): Promise<void> {
    this._meta = Meta.loading;
    this._branches = getInitialCollectionModel();

    const options = {
      method: HTTPMethod.GET,
      endpoint: endpoints.repoBranches(owner, repo),
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    };
    const response = await RootStore.api.request<GithubBranchApi[]>(options);

    runInAction(() => {
      if (response.success) {
        try {
          this._meta = Meta.success;

          const list: GithubBranchModel[] = response.data.map(
            normalizeGithubBranch
          );

          this._branches = normalizeCollection(list, (item) => item.name);

          return;
        } catch (err) {
          this._meta = Meta.error;
          this._branches = getInitialCollectionModel();
        }
      }

      this._meta = Meta.error;
    });
  }

  destroy(): void {
    console.log("destroy", this);
  }
}
