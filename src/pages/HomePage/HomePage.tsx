import React, { useCallback, useState } from "react";

import IUser from "@interfaces/user";
import GithubStore from "@store/GitHubStore/GitHubStore";

import CardWrapper from "./components/CardWrapper";
import SearchBar from "./components/SearchBar/SearchBar";
import classes from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  const store = new GithubStore();
  const [userName, setUserName] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);

  const onChangeUser = useCallback(
    (newData) => {
      setUserName(newData);

      if (newData) {
        store.getUserData(newData).then((response) => {
          if (response.success) {
            setUsers(response.data.items);
          }
        });
      }
    },
    [userName]
  );

  return (
    <div className={classes.HomePage}>
      <SearchBar handleChanged={onChangeUser} />
      <CardWrapper items={users} />
    </div>
  );
};

export default HomePage;
