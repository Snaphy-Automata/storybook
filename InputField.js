/**
 * Created by Robins Gupta
 * 24th March 2018
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
const InputField = (props) => {
    let {
        input,
        required,
        label,
        type,
        size,
        placeholder,
        autocomplete,
        width,
        fluid,
        meta: { touched, error, warning }
    } = props;

    autocomplete = autocomplete || "off";

    size = size || "large";

    return(
        <Form.Input
            width={width}
            error={(touched && error)?true:false}
            fluid
            required
            size={size}
            {...input}
            autoComplete={autocomplete}
            label={label}
            placeholder={placeholder}
        >
        </Form.Input>
    );
}

export default InputField;
