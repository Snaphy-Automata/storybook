/**
 * Created by Robins Gupta
 * 24th March 2018
 */

import React from "react";
import {
    Label,
    Checkbox,
    Form,
  } from 'semantic-ui-react';
import { object } from 'prop-types';


//Custom import
import "./index.css";


/**
 * Used for Redux Form For Material Input UI
 * @param {*} props
 */
const CheckboxGroupField = (props) => {
    const labelStyle = props.labelStyle? props.labelStyle : {};
    const style      = props.style || {};
    return(
        <div style={style}>
            <label style={labelStyle}>{props.label}</label>
            <div>{checkboxGroup(props)}</div>
        </div>
    );
}

//Adding Checkbox Group
const checkboxGroup= function(props) {
    let {label, required, options, input, meta} = props;
    return options.map((option, index) => {
        option.style = option.style || {};

        //Add custom style for checkbox
        const style = {
            cursor: "pointer",
            ...option.style
        };

        return (
        <label className="checkbox-group-container" key={index} style={{
            display:"inline-block",
            width: "20px",
            height: "20px",
            marginRight: "10px",
            marginBottom:"10px",
            borderRadius:"3px"
        }} >
            <input type="checkbox"
                name={`${input.name}`}
                value={option.value}
                checked={input.value.indexOf(option.value) !== -1}
                onChange={(event) => {
                    return input.onChange(option.value);
                }}

            />
            <span className="checkmark" style={style}></span>
        </label>)
    });
}


CheckboxGroupField.propTypes = {
    input: object.isRequired,
    meta: object.isRequired
};

CheckboxGroupField.defaultProps = {
    input: null,
    meta: null
};


export default CheckboxGroupField;
