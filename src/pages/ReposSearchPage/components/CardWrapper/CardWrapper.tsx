import React, { memo } from "react";

import endponts from "@config/endpoints";
import { GithubRepoItemModel } from "@store/models/github";
import { Link } from "react-router-dom";

import Card from "../Card";
import classes from "./CardWrapper.module.scss";

export type CardWrapperProps = {
  items?: GithubRepoItemModel[];
};

const CardWrapper: React.FC<CardWrapperProps> = ({
  items = [],
}: CardWrapperProps) => (
  <div className={classes.CardWrapper}>
    {items?.map((item) => (
      <Link
        key={item.id}
        to={endponts.repoBranches(item.owner.login, item.name)}
      >
        <Card item={item} />
      </Link>
    ))}
  </div>
);

export default memo(CardWrapper);
