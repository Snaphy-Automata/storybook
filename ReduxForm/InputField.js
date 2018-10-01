/**
 * Created by Robins Gupta
 * 24th March 2018
 */

import React from "react";
import PropTypes from 'prop-types';
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
        autoFocus,
        disabled,
        transparent,
        className,
        onBlurEvent,
        onFocusEvent,
        onKeyPressEvent,
        defaultValue,
        blurOnEnter,
        meta: { touched, error, warning }
    } = props;

    autocomplete = autocomplete || "off";

    size = size || "large";
    autoFocus = autoFocus || false
    disabled = disabled || false
    transparent = transparent || false

    const onBlur = (e) => {
        e.preventDefault();
        if(onBlurEvent){
            onBlurEvent(e.target.value);
        }
    }

    const onFocus = (e) => {
        if(onFocusEvent){
            onFocusEvent();
        }
    }


    const onKeyPressed = (e) => {
      if(blurOnEnter && e.key === 'Enter'){
        e.preventDefault();
        e.target.blur();
      }
      if(onKeyPressEvent){
          onKeyPressEvent(e.key, e.target.value);
      }
    }


    const onChange = (event, data) => {
      const {input, onChange} = props
      event.preventDefault()
      //Use set time out to prevent race condition..
      input && input.onChange ?input.onChange(data.value):null
      if(onChange){
        onChange(data.value);
      }
    }


    return(
        <Form.Input
            className={className}
            width={width}
            error={(touched && error)?true:false}
            fluid
            style={{textOverflow : "ellipsis"}}
            required
            autoFocus = {autoFocus}
            disabled = {disabled}
            transparent = {props.transparent}
            size={size}
            {...input}
            autoComplete={autocomplete}
            defaultValue={defaultValue}
            label={label}
            placeholder={placeholder}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyPress={onKeyPressed}
            onChange={onChange}
        >
        </Form.Input>
    );
}


InputField.propTypes = {
  onChange:PropTypes.func,
}


InputField.defaultProps = {
  input:{},
  meta:{},
  blurOnEnter: true,
}

export default InputField;

