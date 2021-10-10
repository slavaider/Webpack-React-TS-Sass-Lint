import React, { useMemo } from "react";

import GithubContext from "@shared/contexts/GithubContext";
import useLocalStore from "@shared/hooks/useLocalStore";
import ReposListStore from "@store/ReposListStore";
import useQueryStoreInit from "@store/RootStore/hooks/useQueryStoreInit";
import { Redirect, Route, Switch } from "react-router-dom";

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
    </GithubContext.Provider>
  );
};

export default App;
