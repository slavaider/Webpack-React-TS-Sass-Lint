import React from "react";

import IUser from "@interfaces/user";

import Card from "../Card";
import classes from "./CardWrapper.module.scss";

export type CardWrapperProps = {
  items: Array<IUser>;
};

const CardWrapper: React.FC<CardWrapperProps> = ({
  items,
}: CardWrapperProps) => (
  <div className={classes.CardWrapper}>
    {items.map((item) => (
      <Card item={item} key={item.id} />
    ))}
  </div>
);

export default CardWrapper;
