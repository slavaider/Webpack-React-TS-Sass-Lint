import React from "react";

import GithubContext from "@shared/contexts/GithubContext";
import GithubStore from "@store/GitHubStore/GitHubStore";

import ReposSearchPage from "./pages/ReposSearchPage";

const App: React.FC = () => {
  const store = new GithubStore();

  return (
    <GithubContext.Provider value={{ store }}>
      <ReposSearchPage />
    </GithubContext.Provider>
  );
};

export default App;
