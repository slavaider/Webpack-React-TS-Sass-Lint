import { ComponentType, ReactNode } from "react";

import ReposSearchPage from "./pages/ReposSearchPage";

export type Route = {
  path: string;
  exact: boolean;
  component: ComponentType<ReactNode>;
};
// Что значит оставить пути, но убрать компоненты
// Как тогда прописывать их, если всё итерируется по циклу?
const routes: Route[] = [
  {
    path: "/repos",
    exact: false,
    component: ReposSearchPage,
  },
];

export default routes;
