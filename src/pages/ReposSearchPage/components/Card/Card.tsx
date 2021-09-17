import React, { memo, useCallback } from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import { GithubRepoItemModel } from "@store/models/github";
import dayjs from "dayjs";

import classes from "./Card.module.scss";

export type CardProps = {
  item: GithubRepoItemModel;
  onClick?: (item: GithubRepoItemModel) => void;
};

const Card: React.FC<CardProps> = ({ item, onClick }: CardProps) => {
  const handleOnClick = useCallback(() => {
    onClick?.(item);
  }, [item, onClick]);

  return (
    <div className={classes.Card} onClick={handleOnClick}>
      <div className={classes.cardContent}>
        <Avatar
          width="80px"
          height="80px"
          src={item.owner.avatarUrl}
          letter={item.name[0].toUpperCase()}
          className={classes.cardImg}
          alt="card-img"
        />
        <div className={classes.cardText}>
          <div className={classes.cardHeader}>{item.name}</div>
          <a
            className={classes.cardSubHeader}
            href={item.htmlUrl}
            target="_blank"
            onClick={(event) => event.stopPropagation()}
            rel="noopener noreferrer"
          >
            Repository
          </a>
          <div className={classes.cardDate}>
            <StarIcon className={classes.starImg} />
            {item.stargazersCount}&nbsp;Updated&nbsp;
            {dayjs(item.updatedAt).format("DD MMMM")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
