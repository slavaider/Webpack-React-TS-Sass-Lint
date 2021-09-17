import React from "react";

import cn from "classnames";

import classes from "./Loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={classes.Loader}>
      <div className={cn(classes.Point, classes.Point1)} />
      <div className={cn(classes.Point, classes.Point2)} />
      <div className={cn(classes.Point, classes.Point3)} />
    </div>
  );
};

export default Loader;
