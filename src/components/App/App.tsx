import React, { useCallback, useState } from 'react';

import SearchBar from '@components/SearchBar';
import CardWrapper from '@components/CardWrapper';
import IUser from '@interfaces/user';
import GithubStore from '@store/GitHubStore';
import classes from './App.module.scss';

const App: React.FC = () => {
  const store = new GithubStore();
  const [userName, setUserName] = useState<string>('');
  const [users, setUsers] = useState<IUser[]>([]);

  const onChangeUser = useCallback((newData) => {
    setUserName(newData);

    if (newData) {
      store.getUserData(newData).then((response) => {
        if (response.success) {
          setUsers(response.data.items);
        }
      });
    }
  }, [userName]);

  return (
        <div className={classes.App}>
            <SearchBar
                handleChanged={onChangeUser}
            />
            <CardWrapper items={users}/>
        </div>
  );
};

export default App;
