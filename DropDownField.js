/**
 * Created by Nikita Mittal
 * 11th June 2018
 */

import React from "react";
import {
    Label,
    Input,
    Form,
    Dropdown
  } from 'semantic-ui-react';


  /**
 * Used for Redux Form For Material Input UI
 * @param {*} props
 */
const DropDownField = (props) => {
    let {
        options,
        select,
        required,
        label,
        type,
        size,
        input,
        placeholder,
        typeData,
        value,
        onDataChanged,
        inline,
        search,
        selection,
        fluid,
        width,
        className,
        style,
        disabled,
        defaultValue,
        onBlur,
        meta: { touched, error, warning }
    } = props;
    inline = inline || false;

    size = size || "large";
    //console.log("Dropdown Props", props.onDataChanged);

    //if(!onDataChanged){
        return(
            <Form.Input size={size} label={label}>
                <Dropdown
                placeholder={placeholder}
                value={input.value}
                fluid
                style={style}
                size={size}
                open={open}
                //defaultValue={defaultValue}
                selection
                options={options}
                onBlur={(event, data) => {
                    console.log("Blure am getting called");
                    if(onBlurEvent){
                        onBlurEvent(event, data);
                    }
                }}
                onChange={(event, data) => {
                    if(onDataChanged){
                        onDataChanged(event, data);
                    }
                   return input.onChange(data.value);
                    //onDataChanged(event, data);
                }}
                error={(touched && error)?true:false} />
            </Form.Input>


        );



}

export default DropDownField;
