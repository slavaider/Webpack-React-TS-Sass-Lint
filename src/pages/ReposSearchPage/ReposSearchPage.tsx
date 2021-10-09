import React from "react";

import Loader from "@components/Loader";
import GithubContext from "@shared/contexts/GithubContext";
import useRepoListContext from "@shared/hooks/useRepoListContext";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route } from "react-router-dom";

import routes from "../../routes";
import CardWrapper from "./components/CardWrapper";
import SearchBar from "./components/SearchBar/SearchBar";
import classes from "./ReposSearchPage.module.scss";

const ReposSearchPage: React.FC = () => {
  const store = useRepoListContext(GithubContext);

  return (
    <div className={classes.HomePage}>
      <SearchBar handleChanged={store?.changeRepo} />
      <Route {...routes.branches} />
      {store?.repoName ? (
        <InfiniteScroll
          hasMore={true}
          loader={store?.repos.length ? <Loader /> : ""}
          next={store.setPage}
          dataLength={store?.repos.length || 0}
        >
          <CardWrapper items={store?.repos} />
        </InfiniteScroll>
      ) : (
        ""
      )}
    </div>
  );
};

export default observer(ReposSearchPage);
