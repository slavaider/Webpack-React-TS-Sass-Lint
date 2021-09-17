import React, { memo } from "react";

import { GithubRepoItemModel } from "@store/models/github";

import Card from "../Card";
import classes from "./CardWrapper.module.scss";

export type CardWrapperProps = {
  items: GithubRepoItemModel[] | undefined;
  onClick?: (item: GithubRepoItemModel) => void;
};

const CardWrapper: React.FC<CardWrapperProps> = ({
  items,
  onClick,
}: CardWrapperProps) => (
  <div className={classes.CardWrapper}>
    {items?.map((item) => (
      <Card onClick={onClick} item={item} key={item.id} />
    ))}
  </div>
);

export default memo(CardWrapper);
