import { ComponentType, ReactNode } from "react";

import BranchesDrawerPage from "./pages/BranchesDrawerPage";
import ReposSearchPage from "./pages/ReposSearchPage";

export type Route = {
  [key: string]: {
    path: string;
    exact: boolean;
    component: ComponentType<ReactNode>;
  };
};

const routes: Route = {
  homepage: {
    path: "/repos",
    exact: false,
    component: ReposSearchPage,
  },
  branches: {
    path: "/repos/:owner/:repo/branches",
    exact: true,
    component: BranchesDrawerPage,
  },
};

export default routes;
