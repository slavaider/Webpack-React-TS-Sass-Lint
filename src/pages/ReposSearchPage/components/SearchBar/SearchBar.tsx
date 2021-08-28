import React, { memo, FormEvent } from "react";

import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import SearchIcon from "@components/SearchIcon";

import classes from "./SearchBar.module.scss";

export type SearchBarProps = {
  handleChanged: (nextValue: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  handleChanged,
}: SearchBarProps) => {
  const submitCompany = (event: FormEvent) => {
    event.preventDefault();
    const data = (event.target as HTMLFormElement).search.value;
    handleChanged(data);
  };

  return (
    <form onSubmit={submitCompany} className={classes.SearchBar}>
      <MyInput name="search" placeholder="Введите название организации" />
      <MyButton>
        <SearchIcon className="color-white" />
      </MyButton>
    </form>
  );
};

export default memo(SearchBar);
