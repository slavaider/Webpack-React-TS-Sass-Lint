import { Context, useContext } from "react";

import { GithubContextType } from "@shared/contexts/GithubContext";
import ReposListStore from "@store/ReposListStore";

const useRepoListContext = (
  context: Context<GithubContextType | null>
): ReposListStore | undefined => {
  const store = useContext(context);
  return store?.repoList;
};

export default useRepoListContext;
