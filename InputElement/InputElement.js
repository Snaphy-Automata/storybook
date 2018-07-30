import React from 'react';
import {connect} from 'react-redux';
import {Input, Form} from 'semantic-ui-react';


//Import Actions..
import {inputFocusChagedAction} from './InputElementAction';

const InputElement = ({placeholder, size, isFocused, inputFocusChagedAction}) => {



   const onFocusChanged = function(){
       if(!isFocused){
        inputFocusChagedAction(true);
       }
    }

    const onBlurEvent = function(){
        if(isFocused){
            inputFocusChagedAction(false);
        }
        //call autosave function..
    }

    const onKeyPress = function(e){
        if(e.key === 'Enter'){
            if(isFocused){
                inputFocusChagedAction(false);
            }
            //call autosave function..
        }
    }
    return (
        <Form>
            {isFocused && <Form.Input
                placeholder={placeholder}
                size={size}
                fluid
                autoFocus
                onBlur = {onBlurEvent}
                onKeyPress = {onKeyPress}
            />}
            {!isFocused && <Form.Input
                placeholder={placeholder}
                size={size}
                fluid
                transparent
                style={{padding: ".67857143em 1em"}}
                onFocus = {onFocusChanged}
            />}
        </Form>
    )
}

  // Retrieve data from store as props
function mapStateToProps(store) {
    return {
        isFocused : store.InputElementReducer.isFocused
    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
  //map action here
  inputFocusChagedAction
};



export default connect(mapStateToProps, mapActionsToProps)(InputElement);