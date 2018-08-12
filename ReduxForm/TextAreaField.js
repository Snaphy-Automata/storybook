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
const TextAreaField = (props) => {
    let {
        input,
        required,
        label,
        rows,
        type,
        autoHeight,
        placeholder,
        meta: { touched, error, warning }
    } = props;

    rows = rows || 2;
    return(
        <Form.TextArea
            error={(touched && error)?true:false}
            required={required}
            rows={rows}
            {...input}
            label={label}
            placeholder={placeholder}
        >
        </Form.TextArea>
    );
}

export default TextAreaField;
