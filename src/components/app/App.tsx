import React, {useEffect, useState} from 'react';
import SearchBar from "@components/search-bar/SearchBar";
import CardWrapper from "@components/card-wrapper/CardWrapper";
import store from "@root/root";
import classes from './App.module.scss';

const App: React.FC = () => {
    const [organisation, setOrganisation] = useState('');
    const [organisations, setOrganisations] = useState([]);

    useEffect(() => {
        if (organisation)
            store.getUserData(organisation).then((response) => {
                setOrganisations(response.data.items);
            })
    }, [organisation]);


    return (
        <div className={classes.App}>
            <SearchBar
                onChangeHandler={(newData: string) => setOrganisation(newData)}
            />
            <CardWrapper
                items={organisations}
            />
        </div>
    )
};

export default App;
