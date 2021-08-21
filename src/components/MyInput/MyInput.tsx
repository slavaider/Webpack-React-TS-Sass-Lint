import React, { InputHTMLAttributes } from 'react';
import classes from './MyInput.module.scss';

const MyInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => <input {...props} className={classes.MyInput}/>;

export default MyInput;
