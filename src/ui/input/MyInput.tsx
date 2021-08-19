import React, {InputHTMLAttributes} from 'react';
import classes from './MyInput.module.scss';

const MyInput = ({...props}: InputHTMLAttributes<any>) => {
    return (
        <input {...props} className={classes.MyInput}/>
    );
};

export default MyInput;
