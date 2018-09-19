/**
 * Created By Robins
 * 30th June 2018
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import { Form,Input } from 'semantic-ui-react'

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

//Custom Import
import InputWithIcon from './InputWithIcon';
import IconLabel from '../IconLabel';

//import Action..
import { onDatePickerStateChangedAction, setDateDataAction, onTaskDateChangeAction } from '../TaskList/TaskListActions';
//import {onOpenDatePickerAction, setDateAction} from '../DatePickerElement/DatePickerAction';

//Style..
//import "./DatePicker.css";



const DatePicker = (props) => {
  let { format, meta: { touched, error }, width, input,  required, isDatePickerOpened, dateData, onDatePickerStateChangedAction, setDateDataAction, title, style, dataType, onUpdateDate, taskId, dateValue } = props;
  //console.log("Date Picker Props", props);
  //console.log("Date Picker Props", dateData);
  format = format || "MM/DD/YYYY";

  // const onOpenDataPicker = function(){
  //   onOpenDatePickerAction(true);
  // }

  const onDayChanged = function (day) {
     console.log("Day Format", day);
    if (day) {
      setDateDataAction(dataType, day, !isDatePickerOpened, taskId);
      onUpdateDate(day);
      //console.log("Day Format", day);
      // if (dataType === "due") {
      //   setDateDataAction("due", day, !isDatePickerOpened, taskId);
      //   onUpdateDate(day);
      //   //onDatePickerStateChangedAction("due", !isDatePickerOpened, dateData);
      // } else if (dataType === "start") {
      //   setDateDataAction("start", day, !isDatePickerOpened, taskId);
      //   onUpdateDate(day);
      //  // onDatePickerStateChangedAction("start", !isDatePickerOpened, dateData);
      // }
    }

    return props.input.onChange(day);
  }

  const onOpenDatePicker = function () {
    onDatePickerStateChangedAction(dataType, !isDatePickerOpened, dateData);
    // if (dataType === "due") {
    //   onDatePickerStateChangedAction("due", !isDatePickerOpened, dateData);
    // } else if (dataType === "start") {
    //   onDatePickerStateChangedAction("start", !isDatePickerOpened, dateData);
    // }
  }

  const onRemoveDate = function (e) {
    setDateDataAction(dataType, null, isDatePickerOpened, taskId);
    onUpdateDate(null);
    // if (dataType === "due") {

    // } else if (dataType === "start") {
    //   setDateDataAction("start", null, isDatePickerOpened, taskId);
    //   onUpdateDate(null);
    // }
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  // const onBlurEvent = function (e) {


  // }

  const onBlurEvent = (e) => {
    //e.preventDefault();
    setTimeout(() => {
      //console.log("Blur getting called", e.target.value);

      let pattern1 = /[0-1][0-9]\/[0-3][0-9]\/2[0-9][0-9][0-9]/g
      let pattern2 = /[0-1][0-9]\/[0-3][0-9]\//g
      let pattern3 = /[0-1][0-9]\/[0-3][0-9]/g
      let pattern4 = /[0-1][0-9]\//g
      let pattern5 = /[0-1][0-9]/g
      if(pattern1.test(dateData) || pattern2.test(dateData) || pattern3.test(dateData) || pattern4.test(dateData) || pattern5.test(dateData)){
        console.log("I am getting called", dateData, pattern1.test(dateData), pattern2.test(dateData), pattern3.test(dateData), pattern4.test(dateData), pattern5.test(dateData));
        let day = moment(dateData, "MM/DD/YYYY").toDate();
        setDateDataAction(dataType, day, !isDatePickerOpened, taskId);
         onUpdateDate(day);

      } else{

      }
      onDatePickerStateChangedAction(dataType, !isDatePickerOpened, null);
    //    if(dataType === "due"){
    //   onDatePickerStateChangedAction("due", !isDatePickerOpened, null);
    //   // setDateDataAction("due", day, !isDatePickerOpened, taskId);
    //   // onUpdateDate(day);
    // } else if(dataType === "start"){
    //   onDatePickerStateChangedAction("start", !isDatePickerOpened, null);
    // }
    }, 50);




  }

  const onFocusEvent = (e) => {
    console.log("On Focus getting called", e);
  }

  // const onFocusOutEvent = (e) => {
  //   console.log("On Focus Out Event", e);
  // }

  const onMouseUpEvent = () => {
    console.log("On Mouse Up Event geeting called");
  }



  const getDate = function () {
    let value;
    if (dateData) {
      let date = moment(dateData).format("DD MMM");
      value = date;
    } else {
      value = title;
    }
    return value;
  }

  const getInputDate = function () {
    let value = "";
    //console.log("Get Input Date Data", dateData);
    if (dateData && dateData === props.dateValue) {
      let date = moment(dateData).format("MM/DD/YYYY");
      value = date;
    } else{
      value = dateData;
    }
    // if(dataType === "due"){
    //   onDatePickerStateChangedAction("due", !isDatePickerOpened, dateData);
    // } else if(dataType === "start"){
    //   onDatePickerStateChangedAction("start", !isDatePickerOpened, dateData);
    // }
    return value;
  }

  const onChangeData = (event, data) => {
    //console.log("On Change Data getting called", input.onChange(data.value));

    props.onTaskDateChangeAction(dataType, data.value);
    return input.onChange(data.value);
  }
  return (
    <div style={style}>
      {/* {isDatePickerOpened && <Form.Field > */}
        {isDatePickerOpened && <DayPickerInput
          //ref={ref => (this.datePicker = ref)}
          dayPickerProps={props}
          showOverlay
          placeholder={format}
          format={format}
          value={getInputDate()}
          required={required}
          formatDate={formatDate}
          component={props => {
            //console.log("Input Date Props", props, input);

            // const onChangeData = (event, data) => {
            //   console.log(" Change Date Data getting called", data.value);
            //   return props.input.onChange(data.value)
            // }
          return (
          <Form.Input {...props} size="mini"
          autoFocus
          style={{width:"120px", height:"32px"}}
          icon='calendar minus outline'
          onChange={onChangeData}
          onBlur={onBlurEvent}
          iconPosition='left' />
        )}}
          parseDate={parseDate}
          {...props}
          inputProps={{ ...props.input}}
          onDayChange={onDayChanged}
        />}
        {/* {touched && error && <span>{error}</span>} */}
      {/* </Form.Field>} */}
      {!isDatePickerOpened && dateData && <IconLabel size="small" icon="calendar minus outline" name={getDate()} isLabel onClick={onOpenDatePicker} onRemove={onRemoveDate}></IconLabel>}
      {!isDatePickerOpened && !dateData && <IconLabel size="small" icon="calendar minus outline" name={getDate()} onClick={onOpenDatePicker}></IconLabel>}
    </div>

  );

};


DatePicker.propTypes = {

};

// Retrieve data from store as props
function mapStateToProps(store, props) {
  const taskListReducerConfig = store.TaskListReducer[props.dataType];
  const isDatePickerOpened = taskListReducerConfig && taskListReducerConfig.isDatePickerOpened ? true : false;
  let taskDateObj = store.TaskListReducer.taskDateObj;
  let dateData;
  if(taskDateObj[props.dataType] && taskDateObj[props.dataType].dateData){
    dateData = taskDateObj[props.dataType].dateData
  }
  // let dateData = null;
  if(props.dateValue && !dateData){
    console.log("Date Data value changed", dateData);
    dateData = props.dateValue;
  } else{
    console.log(" Local Date Data getting called", dateData);
  }
  // if( taskListReducerConfig && props.taskId === taskListReducerConfig.taskId){
  //   dateData = taskListReducerConfig && taskListReducerConfig.dateData ? taskListReducerConfig.dateData : null;
  // } else if(props.dateValue){
  //   dateData = props.dateValue;
  // }

  //console.log("Calling map to props", taskListReducerConfig);
  return {
    isDatePickerOpened,
    dateData
    // isDatePickerOpened : store.DatePickerReducer.isDatePickerOpened,
    // dateData : store.DatePickerReducer.dateData
  };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
  //map action here
  onDatePickerStateChangedAction,
  setDateDataAction,
  onTaskDateChangeAction
  // onOpenDatePickerAction,
  // setDateAction
};


export default connect(mapStateToProps, mapActionsToProps)(DatePicker);
