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
        onBlurEvent,
        open,
        meta: { touched, error, warning }
    } = props;
    const inlineVal = inline || false;
    const sizeVal   = size || "large";
    const openVal   = open || false;
    //if(!onDataChanged){
        return(
            <Form.Input size={size} label={label}>
                <Dropdown
                placeholder={placeholder}
                value={input.value}
                fluid
                inline={inlineVal}
                style={style}
                size={sizeVal}
                open={openVal}
                //defaultValue={defaultValue}
                selection
                options={options}
                onBlur={(event, data) => {
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
