import React from 'react';
import {connect} from 'react-redux';
import {Input, Form} from 'semantic-ui-react';


//Import Actions..
import {inputFocusChagedAction} from './InputElementAction';
import SubmitButton from '../SubmitButton';
//import {taskTitleDataAction} from '../../baseComponents/GridView/components/AllTaskActions'

const InputElement = ({placeholder, size, inputElementReducer, inputFocusChagedAction, input, taskTitleDataAction, label, rows, defaultValue, onDataChanged, invalid, submitting, pristine}) => {



    let inputElementState = inputElementReducer[label];
    let isFocused = inputElementState && inputElementState.isFocused ? true : false;
    //console.log("Input Element Props", inputElementReducer, isFocused);

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

        //taskTitleDataAction(data.value);
        return input.onChange(data.value);
    }

    //console.log("Input Element Props", defaultValue);


    return (
       <div>
            {isFocused && <div>
                <Form.TextArea
                placeholder={placeholder}
                size={size}
                {...input}
                autoFocus
                rows = {rows}
                autoHeight
                onBlur = {onBlurEvent}
                onKeyPress = {onKeyPress}
                onChange={onChange}
            />
            {/* <SubmitButton type="submit" size="tiny" disabled={invalid || submitting || pristine} content="Save" ></SubmitButton> */}
            </div>}
            {!isFocused && <Form.TextArea
                placeholder={placeholder}
                size={size}
                {...input}
                autoHeight
                rows= {rows}

                style={{padding: ".67857143em 1em", height: "52px !important", border:'none'}}
                onFocus = {onFocusChanged}
                onChange={onChange}
            />}
        </div>
    )
}

  // Retrieve data from store as props
function mapStateToProps(store) {
    const inputElementReducer = store.InputElementReducer;
    return {
        inputElementReducer,
       // isFocused : store.InputElementReducer.isFocused
    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
  //map action here
  inputFocusChagedAction,
  //taskTitleDataAction
};



export default connect(mapStateToProps, mapActionsToProps)(InputElement);
