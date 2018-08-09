/**
 * Created By Robins
 * 30th June 2018
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import {  Form } from 'semantic-ui-react'

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

//Custom Import 
import InputWithIcon from './InputWithIcon';
import IconLabel    from '../IconLabel';

//import Action..
//import {onOpenDatePickerAction, setDateAction} from '../DatePickerElement/DatePickerAction';

//Style..
//import "./DatePicker.css";



const DatePicker = (props) => {
  let { format, meta: { touched, error }, width,  required, isDatePickerOpened, dateData, onOpenDatePicker, onDayChangedAction, title, onRemoveDate, style} = props;
  format = format || "DD/MM/YYYY";

  // const onOpenDataPicker = function(){
  //   onOpenDatePickerAction(true);
  // }

  const onDayChanged = function(day){
    if(day){
      onDayChangedAction(day);
    }

    return props.input.onChange(day);
  
}

const onBlurEvent = function(){
  console.log("Blur getting called", e);
}

  const getDate = function(){
    let value;
    if(dateData){
      let date = moment(dateData).format("DD MMMM");
        value = date;
    } else{
        value = title;
    }
    return value;
}

  const getInputDate = function(){
    let value = "";
    if(dateData){
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
        inputProps={{...props.input}}
        onDayChange = {onDayChanged}
        onBlur = {onBlurEvent}
        // onDayChange={(date, modifiers) => {
        //   console.log("date", date);
        //   return props.input.onChange(date);
        // }} 
        />}
        {touched && error && <span>{error}</span>}
      </Form.Field>}
      {!isDatePickerOpened &&  dateData && <IconLabel size="small" icon="calendar minus outline" name={getDate()} isLabel onClick={onOpenDatePicker} onRemove={onRemoveDate}></IconLabel>}
      {!isDatePickerOpened && !dateData && <IconLabel size="small" icon="calendar minus outline" name={getDate()} onClick={onOpenDatePicker}></IconLabel>}
    </div>
   
  );

};


DatePicker.propTypes = {

};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
      // isDatePickerOpened : store.DatePickerReducer.isDatePickerOpened,
      // dateData : store.DatePickerReducer.dateData
  };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
//map action here
// onOpenDatePickerAction,
// setDateAction
};


export default connect(mapStateToProps, mapActionsToProps)(DatePicker);
