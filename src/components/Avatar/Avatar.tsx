import React from "react";

import classes from "./Avatar.module.scss";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  letter?: string;
}

const Avatar: React.FC<AvatarProps> = ({ letter, ...props }: AvatarProps) => {
  return (
    <>
      {props.src ? (
        <img
          {...props}
          src={props.src}
          alt={props.alt}
          className={classes.Avatar}
        />
      ) : (
        <div
          {...props}
          className={classes.Alt}
          style={{ width: props.width, height: props.height }}
          data-letter={letter || ""}
        />
      )}
    </>
  );
};

export default Avatar;
