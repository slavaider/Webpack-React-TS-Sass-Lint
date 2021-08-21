import React from 'react';
import Card from '@components/Card';
import IUser from '@interfaces/user';
import classes from './CardWrapper.module.scss';

type CardWrapperProps = {
  items: Array<IUser>;
};

const CardWrapper: React.FC<CardWrapperProps> = ({
  items,
}: CardWrapperProps) => (
    <div className={classes.CardWrapper}>
        {items.map((item) => (
            <Card item={item} key={item.id}/>
        ))}
    </div>
);

export default CardWrapper;
