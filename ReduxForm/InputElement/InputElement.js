import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Input, Form} from 'semantic-ui-react';

//Import Actions..
import {inputFocusChagedAction} from './InputElementAction';
import SubmitButton from '../SubmitButton';
//import {taskTitleDataAction} from '../../baseComponents/GridView/components/AllTaskActions'

const InputElement = ({
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
}) => {


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
    let styleObj  = style || {}
    styleObj = {
      fontSize: "22px",
      fontWeight: 500,
      color: "#000000",
      ...styleObj,
    }
    return (
      <div className={className}>
        {
          isFocused &&
          <div>
            <Form.TextArea
            placeholder={placeholder}
            {...input}
            autoFocus
            rows = {rows}
            autoHeight
            onBlur = {onBlurEvent}
            onKeyPress = {onKeyPress}
            onChange={onChange}
            style={{...styleObj}}
        />
        </div>}
        {!isFocused && <Form.TextArea
            placeholder={placeholder}
            {...input}
            autoHeight
            rows= {rows}
            style={{...styleObj}}
            onFocus = {onFocusChanged}
            onChange={onChange}
        />}
    </div>
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
