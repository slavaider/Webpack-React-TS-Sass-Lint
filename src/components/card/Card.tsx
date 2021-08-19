import React from 'react';
import classes from './Card.module.scss';
import star from '@assets/star.svg';
import IUser from "@interfaces/user";

type CardProps = {
    item: IUser
}

const Card: React.FC<CardProps> = ({item}: CardProps) => {
    return (
        <div className={classes.Card}>
            <div className={classes.cardContent}>
                <img
                    src={item.avatar_url}
                    className={classes.cardImg} alt="card-img"/>
                <div className={classes.cardText}>
                    <div className={classes.cardHeader}>
                        {item.login}
                    </div>
                    <div className={classes.cardSubHeader}>
                        <a href={item.html_url} target="_blank" rel="noreferrer">{item.type}</a>
                    </div>
                    <div className={classes.cardDate}>
                        <img src={star} alt="star" className={classes.starImg}/> {item.score}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
