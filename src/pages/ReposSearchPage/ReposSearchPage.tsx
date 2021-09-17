import React, { useCallback } from "react";

import Loader from "@components/Loader";
import GithubContext from "@shared/contexts/GithubContext";
import useRepoListContext from "@shared/hooks/useRepoListContext";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route, useHistory } from "react-router-dom";

import BranchesDrawerPage from "../BranchesDrawerPage/RepoBranchesDrawer";
import CardWrapper from "./components/CardWrapper";
import SearchBar from "./components/SearchBar/SearchBar";
import classes from "./ReposSearchPage.module.scss";

const ReposSearchPage: React.FC = () => {
  const store = useRepoListContext(GithubContext);
  const history = useHistory();

  const onClickCard = useCallback((repository) => {
    history.push(`/repos/${repository.owner.login}/${repository.name}`);
  }, []);

  return (
    <div className={classes.HomePage}>
      <SearchBar handleChanged={store?.changeRepo} />
      <Route
        path={"/repos/:owner/:repo"}
        exact={true}
        component={BranchesDrawerPage}
      />
      {store?.repoName ? (
        <InfiniteScroll
          hasMore={true}
          loader={<Loader />}
          next={store.setPage}
          dataLength={store?.repos.length || 0}
        >
          <CardWrapper onClick={onClickCard} items={store?.repos} />
        </InfiniteScroll>
      ) : (
        ""
      )}
    </div>
  );
};

export default observer(ReposSearchPage);
