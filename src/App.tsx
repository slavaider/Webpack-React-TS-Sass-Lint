import React, { useMemo } from "react";

import GithubContext from "@shared/contexts/GithubContext";
import useLocalStore from "@shared/hooks/useLocalStore";
import ReposListStore from "@store/ReposListStore";
import useQueryStoreInit from "@store/RootStore/hooks/useQueryStoreInit";
import Meta from "@utils/meta";
import { observer } from "mobx-react-lite";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import routes from "./routes";

const App: React.FC = () => {
  useQueryStoreInit();

  const repoList = useLocalStore(() => new ReposListStore());

  const value = useMemo(() => {
    return { repoList };
  }, []);

  return (
    <GithubContext.Provider value={value}>
      <Switch>
        <Route {...routes.homepage} />;
        <Redirect from="*" to="/repos" />
      </Switch>
      {repoList.meta === Meta.error && (
        <h1 className="error">Ошибка в списке репозиториев</h1>
      )}
    </GithubContext.Provider>
  );
};

export default withRouter(observer(App));
