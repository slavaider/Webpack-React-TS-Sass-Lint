import React from "react";

import ReposListStore from "@store/ReposListStore";

export type GithubContextType = {
  repoList: ReposListStore;
};

const GithubContext = React.createContext<GithubContextType | null>(null);

export default GithubContext;
