import React, { FormEvent } from 'react';
import { ReactComponent as SearchIcon } from '@assets/search.svg';
import MyInput from '@components/MyInput';
import MyButton from '@components/MyButton';
import classes from './SearchBar.module.scss';

type SearchBarProps = {
  handleChanged: (nextValue: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  handleChanged,
}: SearchBarProps) => {
  function submitCompany(event: FormEvent) {
    event.preventDefault();
    const data = (event.target as HTMLFormElement).search.value;
    handleChanged(data);
  }

  return (
        <form onSubmit={submitCompany} className={classes.SearchBar}>
            <MyInput name="search" placeholder="Введите название организации"/>
            <MyButton>
                <SearchIcon className="color-white"/>
            </MyButton>
        </form>
  );
};

export default React.memo(SearchBar);
