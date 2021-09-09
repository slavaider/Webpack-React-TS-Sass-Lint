import React from "react";

import classes from "./Avatar.module.scss";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  letter?: string;
}

const Avatar: React.FC<AvatarProps> = ({ letter, ...props }: AvatarProps) => {
  return (
    <div
      {...props}
      className={classes.Avatar}
      style={{
        width: props.width,
        height: props.height,
        backgroundImage: props.src ? `url(${props.src})` : "",
      }}
    >
      {!props.src ? letter : ""}
    </div>
  );
};

export default Avatar;
