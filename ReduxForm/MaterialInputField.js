/**
 * Created by Robins Gupta 
 * 24th March 2018
 */

import React from "react";
import {
    Label,
  } from 'semantic-ui-react';
import SnaphyInput from "../materialUI/SnaphyInput";


/**
 * Used for Redux Form For Material Input UI
 * @param {*} props 
 */
const MaterialInputField = (props) => {
    const {
        input,
        label,
        type,
        placeholder,
        meta: { touched, error, warning }
    } = props;    
    return(
        <div>
            {touched && (error && <Label basic color='red' pointing='below'>{error}</Label>)}
            <SnaphyInput error={(touched && error)?true:false} {...input}  placeholder={placeholder} type={type} ></SnaphyInput>
        </div>
    );
}

export default MaterialInputField;