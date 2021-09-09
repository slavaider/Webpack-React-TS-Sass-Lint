import React, { useCallback, useContext, useState } from "react";

import Loader from "@components/Loader";
import IRepository from "@interfaces/repository";
import GithubContext from "@shared/contexts/GithubContext";

import CardWrapper from "./components/CardWrapper";
import RepoBranchesDrawer from "./components/RepoBranchesDrawer";
import SearchBar from "./components/SearchBar/SearchBar";
import classes from "./ReposSearchPage.module.scss";

const ReposSearchPage: React.FC = () => {
  const context = useContext(GithubContext);
  const store = context?.store;

  const [repoName, setRepoName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedRepo, setSelectedRepo] = useState<IRepository | null>(null);

  const onChangeRepo = useCallback(
    async (rawData) => {
      const newData = rawData.trim();

      setRepoName(newData);

      if (newData) {
        setLoading(true);

        const response = await store?.getRepositoryData(newData);

        if (response?.success && Array.isArray(response.data)) {
          setRepositories(response.data);
        } else {
          setRepositories([]);
        }

        setLoading(false);
      }
    },
    [repoName]
  );

  const onClickCard = useCallback(
    (repository) => {
      setVisible(true);
      setSelectedRepo(repository);
    },
    [repositories]
  );

  const onCloseHandler = useCallback(() => {
    setVisible(false);
  }, [selectedRepo]);

  return (
    <div className={classes.HomePage}>
      <SearchBar handleChanged={onChangeRepo} />
      {loading ? (
        <Loader />
      ) : (
        <CardWrapper onClick={onClickCard} items={repositories} />
      )}
      <RepoBranchesDrawer
        visible={visible}
        onClose={onCloseHandler}
        selectedRepo={selectedRepo}
      />
    </div>
  );
};

export default ReposSearchPage;
