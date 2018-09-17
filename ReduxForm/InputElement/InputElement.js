import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Input, Form} from 'semantic-ui-react';

import "./inputElement.css"

//Import Actions..
import {inputFocusChagedAction} from './InputElementAction';


const InputElement = (props) => {
    const {
      placeholder,
      size,
      inputElementReducer,
      inputFocusChagedAction,
      input,
      label,
      rows,
      onDataChanged,
      invalid,
      submitting,
      pristine,
      style,
      isFocused,
      autoFocus,
    } = props

    const onFocusChanged = function(){
        inputFocusChagedAction(true, label);
    }

    const onBlurEvent = function(e){
        e.preventDefault();
        inputFocusChagedAction(false, label);
        //call autosave function..
    }

    const onKeyPress = function(e){
        if(e.key === 'Enter'){
            //Prevent Title from further propagating..
            //First Set Blur..
            e.preventDefault();
            e.target.blur();
            //FIXME: Save data..
            inputFocusChagedAction(false, label);
            //call autosave function..
        }
    }

    const onChange = function(event, data){
        if(onDataChanged){
            onDataChanged(data.value);
        }
        return input.onChange(data.value);
    }

    let className = "input-element-text-area"

    if(props.className){
      className = `${props.className} ${className}`
    }



    let styleObj  = style || {}
    styleObj = {
      paddingLeft: "11.5px",
      paddingRight: "11.5px",
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 37,
      lineHeight: "37px",
      overflow: "hidden",
      ...styleObj,
    }
    return (
      <Form.TextArea
        placeholder={placeholder}
        {...input}
        autoFocus={autoFocus}
        rows = {rows}
        autoHeight
        className={className}
        onBlur = {onBlurEvent}
        onKeyPress = {onKeyPress}
        onChange={onChange}
        style={styleObj}
      />
    )
}

  // Retrieve data from store as props
function mapStateToProps(store, props) {
    const inputElementReducer = store.InputElementReducer;
    let isFocused = false
    if(props.label){
      let inputElementState = inputElementReducer[props.label];
      isFocused = inputElementState && inputElementState.isFocused ? true : false;
    }

    return {
       isFocused
    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
  //map action here
  inputFocusChagedAction,
  //taskTitleDataAction
};


InputElement.propTypes = {
  label: PropTypes.string.isRequired,
}



export default connect(mapStateToProps, mapActionsToProps)(InputElement);
