import React, { ButtonHTMLAttributes } from 'react';
import classes from './MyButton.module.scss';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const MyButton: React.FC<MyButtonProps> = ({
  children,
  ...props
}: MyButtonProps) => (
    <button className={classes.MyButton} {...props}>
        {children}
    </button>
);

export default MyButton;
