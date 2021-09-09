import React from "react";

import routes from "@config/routes";
import GithubContext from "@shared/contexts/GithubContext";
import GithubStore from "@store/GitHubStore/GitHubStore";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const App: React.FC = () => {
  const store = new GithubStore();

  return (
    <GithubContext.Provider value={{ store }}>
      <BrowserRouter>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
          <Redirect from="*" to="/repos" />
        </Switch>
      </BrowserRouter>
    </GithubContext.Provider>
  );
};

export default App;
