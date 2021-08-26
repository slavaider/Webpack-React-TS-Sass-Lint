import React, { useCallback, useState } from "react";

import Loader from "@components/Loader";
import IUser from "@interfaces/user";
import GithubStore from "@store/GitHubStore/GitHubStore";

import CardWrapper from "./components/CardWrapper";
import SearchBar from "./components/SearchBar/SearchBar";
import classes from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  const store = new GithubStore();
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const onChangeUser = useCallback(
    (newData) => {
      setUserName(newData);

      if (newData) {
        setLoading(true);
        store.getUserData(newData).then((response) => {
          if (response.success) {
            setUsers(response.data.items);
          }
          setLoading(false);
        });
      }
    },
    [userName]
  );

  return (
    <div className={classes.HomePage}>
      <SearchBar handleChanged={onChangeUser} />
      {loading ? <Loader /> : <CardWrapper items={users} />}
    </div>
  );
};

export default HomePage;
