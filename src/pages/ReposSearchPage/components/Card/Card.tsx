import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import IRepository from "@interfaces/repository";

import classes from "./Card.module.scss";

export type CardProps = {
  item: IRepository;
  onClick?: (item: IRepository) => void;
};

const Card: React.FC<CardProps> = ({ item, onClick }: CardProps) => {
  function handleOnClick() {
    if (onClick) {
      onClick(item);
    }
  }

  return (
    <div className={classes.Card} onClick={handleOnClick}>
      <div className={classes.cardContent}>
        <Avatar
          width="80px"
          height="80px"
          src={item.owner.avatar_url}
          className={classes.cardImg}
          alt="card-img"
        />
        <div className={classes.cardText}>
          <div className={classes.cardHeader}>{item.name}</div>
          <a
            className={classes.cardSubHeader}
            href={item.html_url}
            target="_blank"
            onClick={(event) => event.stopPropagation()}
            rel="noopener noreferrer"
          >
            Repository
          </a>
          <div className={classes.cardDate}>
            <StarIcon className={classes.starImg} />
            {item.stargazers_count}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
