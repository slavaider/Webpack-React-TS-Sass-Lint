import { ComponentType } from "react";

import BranchesDrawerPage from "../pages/BranchesDrawerPage";
import ReposSearchPage from "../pages/ReposSearchPage";

export type Route = {
  path: string;
  exact: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
};

const routes: Route[] = [
  {
    path: "/repos",
    exact: true,
    component: ReposSearchPage,
  },
  { path: "/repos/:owner/:repo", exact: true, component: BranchesDrawerPage },
];

export default routes;
