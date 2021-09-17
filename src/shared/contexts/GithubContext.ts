import React from "react";

import RepoBranchesStore from "@store/RepoBranchesStore";
import ReposListStore from "@store/ReposListStore";

export type GithubContextType = {
  repoList: ReposListStore;
  repoBranches: RepoBranchesStore;
};

const GithubContext = React.createContext<GithubContextType | null>(null);

export default GithubContext;
