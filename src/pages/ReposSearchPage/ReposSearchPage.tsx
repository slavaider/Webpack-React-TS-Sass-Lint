import React from "react";

import Loader from "@components/Loader";
import GithubContext from "@shared/contexts/GithubContext";
import useRepoListContext from "@shared/hooks/useRepoListContext";
import Meta from "@utils/meta";
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

      {store?.meta === Meta.loading && !store?.repos.length && <Loader />}

      <Route {...routes.branches} />

      {store?.repoName ? (
        <InfiniteScroll
          hasMore={true}
          next={store.setPage}
          dataLength={store?.repos.length || 0}
          loader={
            store?.repos.length && store?.meta !== Meta.empty ? <Loader /> : ""
          }
        >
          <CardWrapper items={store?.repos} />
        </InfiniteScroll>
      ) : (
        ""
      )}
      {store?.meta === Meta.error && (
        <h1 className="error">Репозиториев нет</h1>
      )}
    </div>
  );
};

export default observer(ReposSearchPage);
