import React from "react";

import GithubContext from "@shared/contexts/GithubContext";
import useLocalStore from "@shared/hooks/useLocalStore";
import RepoBranchesStore from "@store/RepoBranchesStore";
import ReposListStore from "@store/ReposListStore";
import useQueryStoreInit from "@store/RootStore/hooks/useQueryStoreInit";
import Meta from "@utils/meta";
import { observer } from "mobx-react-lite";
import { Redirect, Route, Switch } from "react-router-dom";

import routes from "./routes";

const App: React.FC = () => {
  useQueryStoreInit();

  const repoList = useLocalStore(() => new ReposListStore());
  const repoBranches = useLocalStore(() => new RepoBranchesStore());

  if (repoList.meta === Meta.error) {
    return <h1>Ошибка в списке репозиториях</h1>;
  }

  if (repoBranches.meta === Meta.error) {
    return <h1>Ошибка в списке веток</h1>;
  }
  // can't use because of infinite scroll
  /*
      if (repoList.meta === Meta.loading || repoBranches.meta === Meta.loading) {
        return <Loader />;
      }
  */
  return (
    <GithubContext.Provider value={{ repoList, repoBranches }}>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Redirect from="*" to="/repos" />
      </Switch>
    </GithubContext.Provider>
  );
};

export default observer(App);
