import React, {FormEvent} from 'react';
import search from "@assets/search.svg";
import classes from './SearchBar.module.scss';
import MyInput from "@ui/input/MyInput";
import MyButton from "@ui/button/MyButton";

type SearchBarProps = {
    onChangeHandler: (arg0: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({onChangeHandler}: SearchBarProps) => {

    function submitCompany(event: FormEvent) {
        event.preventDefault();
        const data = (event.target as HTMLFormElement).search.value;
        onChangeHandler(data);
    }

    return (
        <form onSubmit={submitCompany} className={classes.SearchBar}>
            <MyInput name="search" placeholder="Введите название организации"/>
            <MyButton>
                <img src={search} alt="search"/>
            </MyButton>
        </form>
    );
};

export default SearchBar;
