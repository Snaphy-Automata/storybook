/**
 * Created by Robins Gupta 
 * 24th March 2018
 */
import React from "react";
import {
    Label,
    Input,
    Form,
    Button,
  } from 'semantic-ui-react';


/**
 * Used for Redux Form For Material Input UI
 * @param {*} props 
 */
const SubmitButton = (props) => {
   
    return(
        <Form.Button
            size={props.size} 
            primary 
            type="submit"
            {...props}
        >
        </Form.Button>
    );
}

export default SubmitButton;