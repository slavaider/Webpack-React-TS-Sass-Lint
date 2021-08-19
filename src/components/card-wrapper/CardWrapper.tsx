import React from 'react';
import classes from './CardWrapper.module.scss';
import Card from "@components/card/Card";
import IUser from "@interfaces/user";

type CardWrapperProps = {
    items: Array<IUser>
}

const CardWrapper: React.FC<CardWrapperProps> = ({items}: CardWrapperProps) => {
    return (
        <div className={classes.CardWrapper}>
            {items.map((item) => <Card item={item} key={item.id}/>)}
        </div>
    );
};

export default CardWrapper;
