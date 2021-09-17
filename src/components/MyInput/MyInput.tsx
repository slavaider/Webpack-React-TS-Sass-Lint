import React, { InputHTMLAttributes } from "react";

import classes from "./MyInput.module.scss";

export interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  myOnChange?: (value: string) => void;
}

const MyInput: React.FC<MyInputProps> = ({ ...props }: MyInputProps) => (
  <input
    {...props}
    className={classes.MyInput}
    onChange={(event) => props.myOnChange?.(event.target.value)}
  />
);

export default MyInput;
