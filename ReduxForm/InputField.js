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
        autoFocus,
        disabled,
        transparent,
        className,
        onBlurEvent,
        onFocusEvent,
        onKeyPressEvent,
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
        if(onKeyPressEvent){
            onKeyPressEvent(e.key, e.target.value);
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
            label={label}
            placeholder={placeholder}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyPress={onKeyPressed}
        >
        </Form.Input>
    );
}

export default InputField;

// import React from "react";
// import {
//     Label,
//     Input,
//     Form,
//   } from 'semantic-ui-react';


// /**
//  * Used for Redux Form For Material Input UI
//  * @param {*} props
//  */
// const InputField = (props) => {
//     let {
//         input,
//         required,
//         label,
//         type,
//         size,
//         placeholder,
//         autocomplete,
//         width,
//         fluid,
//         meta: { touched, error, warning }
//     } = props;

//     autocomplete = autocomplete || "off";

//     size = size || "large";

//     return(
//         <Form.Input
//             width={width}
//             error={(touched && error)?true:false}
//             fluid
//             required
//             size={size}
//             {...input}
//             autoComplete={autocomplete}
//             label={label}
//             placeholder={placeholder}
//         >
//         </Form.Input>
//     );
// }

// export default InputField;
