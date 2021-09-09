import { Context, useContext, useState } from "react";

import IBranch from "@interfaces/branch";
import IRepository from "@interfaces/repository";
import { GithubContextType } from "@shared/contexts/GithubContext";

export type ReposContextType = {
  repositories: IRepository[];
  branches: IBranch[];
  isLoading: boolean;
  loadRepos: (newData: string, page: number) => Promise<void>;
  loadBranches: (owner: string, repo: string) => Promise<void>;
};

const useReposContext = (
  context: Context<GithubContextType | null>
): ReposContextType => {
  const reposContext = useContext(context);
  const store = reposContext?.store;

  const [isLoading, setLoading] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [branches, setBranches] = useState<IBranch[]>([]);

  const loadRepos = async (newData: string, page: number) => {
    setLoading(true);

    const response = await store?.getRepositoryData(newData, page);

    if (response?.success && Array.isArray(response.data)) {
      const items = [...repositories];
      items.push(...response.data);
      setRepositories(items);
    } else {
      setRepositories([]);
    }

    setLoading(false);
  };

  const loadBranches = async (owner: string, repo: string) => {
    setLoading(true);

    const response = await store?.getRepositoryBranches(owner, repo);

    if (response?.success && Array.isArray(response.data)) {
      setBranches(response.data);
    }

    setLoading(false);
  };

  return { repositories, branches, isLoading, loadRepos, loadBranches };
};

export default useReposContext;
