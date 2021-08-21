import React from 'react';
import { ReactComponent as StarIcon } from '@assets/star.svg';
import IUser from '@interfaces/user';
import classes from './Card.module.scss';

type CardProps = {
  item: IUser;
};

const Card: React.FC<CardProps> = ({ item }: CardProps) => (
    <div className={classes.Card}>
        <div className={classes.cardContent}>
            <img src={item.avatar_url} className={classes.cardImg} alt="card-img"/>
            <div className={classes.cardText}>
                <div className={classes.cardHeader}>{item.login}</div>
                <a className={classes.cardSubHeader} href={item.html_url} target="_blank" rel="noopener noreferrer">
                    {item.type}
                </a>
                <div className={classes.cardDate}>
                    <StarIcon className={classes.starImg}/>
                    {item.score}
                </div>
            </div>
        </div>
    </div>
);

export default React.memo(Card);
