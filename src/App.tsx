import React from "react";

import GithubContext from "@shared/contexts/GithubContext";
import GithubStore from "@store/GitHubStore/GitHubStore";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import routes from "./routes";

const App: React.FC = () => {
  const store = new GithubStore();

  return (
    <GithubContext.Provider value={{ store }}>
      <BrowserRouter>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect from="*" to="/repos" />
        </Switch>
      </BrowserRouter>
    </GithubContext.Provider>
  );
};

export default App;
