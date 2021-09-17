import React, { useCallback, useState } from "react";

import Loader from "@components/Loader";
import GithubContext from "@shared/contexts/GithubContext";
import useReposContext from "@shared/hooks/useReposContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route, useHistory } from "react-router-dom";

import BranchesDrawerPage from "../BranchesDrawerPage/RepoBranchesDrawer";
import CardWrapper from "./components/CardWrapper";
import SearchBar from "./components/SearchBar/SearchBar";
import classes from "./ReposSearchPage.module.scss";

const ReposSearchPage: React.FC = () => {
  const { repositories, loadRepos } = useReposContext(GithubContext);
  const history = useHistory();

  const [repoName, setRepoName] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const onChangeRepo = useCallback(
    async (rawData) => {
      const newData = rawData.trim();
      await loadRepos(newData, page);
      setRepoName(newData);
    },
    [repoName]
  );

  const onClickCard = useCallback(
    (repository) => {
      history.push(`/repos/${repository.owner.login}/${repository.name}`);
    },
    [repositories]
  );

  const getData = async () => {
    await loadRepos(repoName, page + 1);
    setPage(page + 1);
  };

  return (
    <div className={classes.HomePage}>
      <SearchBar handleChanged={onChangeRepo} />
      <Route
        path={"/repos/:owner/:repo"}
        exact={true}
        component={BranchesDrawerPage}
      />
      {repoName ? (
        <InfiniteScroll
          hasMore={true}
          loader={<Loader />}
          next={getData}
          dataLength={repositories.length}
        >
          <CardWrapper onClick={onClickCard} items={repositories} />
        </InfiniteScroll>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReposSearchPage;
