/**
 * Created by Nikita Mittal
 * 16th June 2018
 */

import React from "react";
import {
    Label,
    Input,
    Form,
  } from 'semantic-ui-react';


/**
 * Used for Redux Form For Material Input UI
 * @param {*} props 
 */
const CustomInputField = (props) => {
    let {
        input,
        required,
        label,
        width,
        type,
        size,
        placeholder,
        meta: { touched, error, warning }
    } = props;  

    size = size || "large";
    
    return(
        <Form.Input
            error={(touched && error)?true:false}
            fluid  
            required
            size={size}
            width={width}
            {...input}
            label={label}
            placeholder={placeholder}
        >
        </Form.Input>
    );
}

export default CustomInputField;