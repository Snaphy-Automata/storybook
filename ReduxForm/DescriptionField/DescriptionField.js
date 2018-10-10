import React from 'react';
import {connect} from 'react-redux';
import {Input, Form, Popup} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown'
import Markdown from 'react-markdown'
// const ReactMarkdown = require('react-markdown')



//Import Actions..
import {inputFocusChagedAction} from '../InputElement/InputElementAction';
import {onChangeFormatDialogStateAction} from './DescriptionActions';
import SubmitButton from '../SubmitButton';
import PopupField from '../../PopupField';
import './DescriptionField.css';
//import '../InputElement/InputElement.css'
import FormattingHelp from '../../FormattingHelp';
//import {taskTitleDataAction} from '../../baseComponents/GridView/components/AllTaskActions'

const DescriptionField = (props) => {
   
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
        descriptionData, 
        isDialogOpened, 
        onUpdateTaskDescription,
        taskId} = props;
   

    let inputElementState = inputElementReducer[label];
    let isFocused = inputElementState && inputElementState.isFocused ? true : false;
    //console.log("Input Element Props", inputElementReducer, isFocused);

   const onFocusChanged = function(){
        inputFocusChagedAction(true, label);
    }

    const onBlurEvent = function(e){
        e.preventDefault();
        console.log("Blur Description getting called", e.target.value, isDialogOpened);
        if(e.target.value && e.target.value !== "" && e.target.value !== descriptionData){
            console.log("Backeng calling");
            onUpdateTaskDescription(e.target.value);
        } else{
            if(!isDialogOpened){
                console.log("empty calling");
                inputFocusChagedAction(false, label);
            }
           
        }
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
          console.log("Markdown Container getting clicked", isDialogOpened);
        inputFocusChagedAction(true, label);
    }

    const onChange = function(event, data){
        if(onDataChanged){
            onDataChanged(data.value);
        }
       
        //taskTitleDataAction(data.value);
        return input.onChange(data.value);
    }

    const onDialogStateChange = (dialogState) => {
        //console.log("Dialog State chane getting called", dialogState);
        onChangeFormatDialogState(taskId, dialogState);
    }

    const onChangeFormatDialogState = (taskId, dialogState) => {
        props.onChangeFormatDialogStateAction(taskId, dialogState);
    }

    const onOpenFormatDialog = (e) => {
        e.preventDefault();
        //console.log("Open Format getting called", taskId);

        onChangeFormatDialogState(taskId, true);
    }

    const onCloseFormatDialog = () => {
        //console.log("Close Format Getting called", taskId);
        onChangeFormatDialogState(taskId, false);
    }

    //console.log("Input Element Props", defaultValue);
    //console.log("Description Field props", descriptionData);

    let styleObj = {
        paddingLeft: "11.5px",
        paddingRight: "11.5px",
        paddingTop: "5px",
        paddingBottom: "5px",
        minHeight: 25,
        lineHeight: "25px",
        overflow: "hidden",
        ...props.style,
      }

      if(!isFocused && !descriptionData){
          styleObj = {
              ...styleObj,
              //border: "1px solid #eeeeee"
              backgroundColor: "#f8f7f8",
              height: 90
          }
      }
    
      let className = "description-input-element-text-area"


    return (
       <div>
            <div>
                <Form.TextArea
                placeholder={placeholder}
                {...input}
                rows = {rows}
                style={styleObj}
                className={className}
                autoHeight
                onBlur = {onBlurEvent}
                onKeyPress = {onKeyPress}
                onChange={onChange}
                onFocus={onFocusChanged}

            />
            {isFocused && <PopupField 
                triggerComponent={<div onMouseDown={onOpenFormatDialog} className="description-field-formatting-help-text">Formatting Help</div>}
                contentComponent={<FormattingHelp onClose={onCloseFormatDialog}/>}
                isDialogOpened = {isDialogOpened}
                onDialogStateChange={onDialogStateChange}
                style={{padding:0, minHeight:"460px",position:"absolute", left:"650px", right: "auto", bottom: "137px", top: "200px"}} 
            />}

            
            
            {isFocused && <div style={{float: 'right'}}>
            <SubmitButton  type="submit" size="tiny" disabled={invalid || submitting || pristine} content="Save" ></SubmitButton>
            </div>}
           
           
            </div>
            {!isFocused && descriptionData && <div className="description-field-markdown-container" onClick={onMarkdownContainerClicked}><Markdown source={descriptionData} /></div>}
        </div>
    )
}

  // Retrieve data from store as props
function mapStateToProps(store, props) {
    const inputElementReducer = store.InputElementReducer;
    const isFormatDialogOpened = store.DescriptionReducer;
    let isDialogOpened = false;
    if(props.taskId === isFormatDialogOpened.isDialogOpened.taskId){
        isDialogOpened = true;
    }
    return {
        inputElementReducer,
        isDialogOpened
       // isFocused : store.InputElementReducer.isFocused
    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
  //map action here
  inputFocusChagedAction,
  onChangeFormatDialogStateAction
  //taskTitleDataAction
};



export default connect(mapStateToProps, mapActionsToProps)(DescriptionField);