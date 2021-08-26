import React, { InputHTMLAttributes } from "react";

import classes from "./MyInput.module.scss";

export type MyInputProps = InputHTMLAttributes<HTMLInputElement>;

const MyInput: React.FC<MyInputProps> = ({ ...props }: MyInputProps) => (
  <input {...props} className={classes.MyInput} />
);

export default MyInput;
