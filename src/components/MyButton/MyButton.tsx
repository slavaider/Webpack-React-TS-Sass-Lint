import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

import classes from "./MyButton.module.scss";

export type MyButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

const MyButton: React.FC<MyButtonProps> = ({
  children,
  ...props
}: MyButtonProps) => (
  <button className={classes.MyButton} {...props}>
    {children}
  </button>
);

export default MyButton;
