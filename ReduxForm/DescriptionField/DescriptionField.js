import React from 'react';
import {connect} from 'react-redux';
import {Input, Form, Popup} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown'
import Markdown from 'react-markdown'
// const ReactMarkdown = require('react-markdown')



//Import Actions..
import {inputFocusChagedAction} from '../InputElement/InputElementAction';
import SubmitButton from '../SubmitButton';
import './DescriptionField.css';
import FormattingHelp from '../../FormattingHelp';
//import {taskTitleDataAction} from '../../baseComponents/GridView/components/AllTaskActions'

const DescriptionField = ({placeholder, size, inputElementReducer, inputFocusChagedAction, input, taskTitleDataAction, label, rows, defaultValue, onDataChanged, invalid, submitting, pristine, value, descriptionData}) => {

   

    let inputElementState = inputElementReducer[label];
    let isFocused = inputElementState && inputElementState.isFocused ? true : false;
    //console.log("Input Element Props", inputElementReducer, isFocused);

   const onFocusChanged = function(){
        inputFocusChagedAction(true, label);
    }

    const onBlurEvent = function(e){
        e.preventDefault();
        console.log("Blur Description getting called", e);
       //inputFocusChagedAction(false, label);
        //call autosave function..
    }

    const onKeyPress = function(e){
        if(e.key === 'Enter'){
            //inputFocusChagedAction(false, label);
            //call autosave function..
        }
    }

    const onMarkdownContainerClicked = function(){
        inputFocusChagedAction(true, label);
    }

    const onChange = function(event, data){
        if(onDataChanged){
            onDataChanged(data.value);
        }
       
        //taskTitleDataAction(data.value);
        return input.onChange(data.value);
    }

    //console.log("Input Element Props", defaultValue);
    //console.log("Description Field props", descriptionData);


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
            <Popup
            trigger={ <div className="description-field-formatting-help-text">Formatting Help</div>}
            content={<FormattingHelp/>}
            on='click'
            basic
            style={{height: "400px",
                overflow: "auto"}}
            position="left center"
            />

            
            
            <div style={{float: 'right'}}>
            <SubmitButton  type="submit" size="tiny" disabled={invalid || submitting || pristine} content="Save" ></SubmitButton>
            </div>
           
           
            </div>}
            {!isFocused && !descriptionData && <Form.TextArea
                placeholder={placeholder}
                size={size}
                {...input}
                autoHeight
                rows= {rows}
                
                style={{padding: ".67857143em 1em", height: "52px !important", border:'none'}}
                onFocus = {onFocusChanged}
                onChange={onChange}
            />}
            {!isFocused && descriptionData && <div className="description-field-markdown-container" onClick={onMarkdownContainerClicked}><Markdown source={descriptionData} /></div>}
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



export default connect(mapStateToProps, mapActionsToProps)(DescriptionField);