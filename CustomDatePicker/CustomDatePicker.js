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
import { Form } from 'semantic-ui-react'

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

//Custom Import 
import InputWithIcon from './InputWithIcon';
import IconLabel from '../IconLabel';

//import Action..
import { onDatePickerStateChangedAction, setDateDataAction } from '../TaskList/TaskListActions';
//import {onOpenDatePickerAction, setDateAction} from '../DatePickerElement/DatePickerAction';

//Style..
//import "./DatePicker.css";



const DatePicker = (props) => {
  let { format, meta: { touched, error }, width, required, isDatePickerOpened, dateData, onDatePickerStateChangedAction, setDateDataAction, title, style, dataType, onUpdateDate, taskId } = props;
  format = format || "DD/MM/YYYY";

  // const onOpenDataPicker = function(){
  //   onOpenDatePickerAction(true);
  // }

  const onDayChanged = function (day) {
    if (day) {
      //console.log("Day Format", day);
      if (dataType === "due") {
        setDateDataAction("due", day, !isDatePickerOpened, taskId);
        onUpdateDate(day);
      } else if (dataType === "start") {
        setDateDataAction("start", day, !isDatePickerOpened, taskId);
        onUpdateDate(day);
      }
    }

    return props.input.onChange(day);

  }

  const onOpenDatePicker = function () {
    if (dataType === "due") {
      onDatePickerStateChangedAction("due", !isDatePickerOpened, dateData);
    } else if (dataType === "start") {
      onDatePickerStateChangedAction("start", !isDatePickerOpened, dateData);
    }
  }

  const onRemoveDate = function (e) {

    if (dataType === "due") {
      setDateDataAction("due", null, isDatePickerOpened, taskId);
      onUpdateDate(null);
    } else if (dataType === "start") {
      setDateDataAction("start", null, isDatePickerOpened, taskId);
      onUpdateDate(null);
    }
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  const onBlurEvent = function (e) {
    console.log("Blur getting called", e);
    //onDatePickerStateChangedAction("due", !isDatePickerOpened, dateData);
  }

  const getDate = function () {
    let value;
    if (dateData) {
      let date = moment(dateData).format("DD MMMM");
      value = date;
    } else {
      value = title;
    }
    return value;
  }

  const getInputDate = function () {
    let value = "";
    if (dateData) {
      let date = moment(dateData).format("DD/MM/YYYY");
      value = date;
    }
    return value;
  }
  return (
    <div style={style}>
      {isDatePickerOpened && <Form.Field >
        {isDatePickerOpened && <DayPickerInput
          showOverlay
          placeholder={format}
          format={format}
          value={getInputDate()}
          required={required}
          formatDate={formatDate}
          component={InputWithIcon}
          parseDate={parseDate}
          inputProps={{ ...props.input }}
          onDayChange={onDayChanged}
          onBlur={onBlurEvent}
        />}
        {touched && error && <span>{error}</span>}
      </Form.Field>}
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
  let dateData = null;
  if( taskListReducerConfig && props.taskId === taskListReducerConfig.taskId){
    dateData = taskListReducerConfig && taskListReducerConfig.dateData ? taskListReducerConfig.dateData : null;
  }
  
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
  setDateDataAction
  // onOpenDatePickerAction,
  // setDateAction
};


export default connect(mapStateToProps, mapActionsToProps)(DatePicker);
