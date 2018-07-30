import React from 'react';
import {connect} from 'react-redux';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import moment from 'moment';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';

//Custom Import 
import InputWithIcon from './InputWithIcon';
import IconLabel    from '../IconLabel';

//import Action..
import {onOpenDatePickerAction, setDateAction} from './DatePickerAction';

const DatePickerElement = (props) => {
    const {
        isDatePickerOpened,
        onOpenDatePickerAction,
        setDateAction, 
        dateData
    } = props;

    const onOpenDataPicker = function(){
        onOpenDatePickerAction(true);
    }

      const onDayChanged = function(day){
          console.log("Day Changed", day);
          if(day){
            onOpenDatePickerAction(false);
            let date =  moment(day).format("DD MMMM")
            setDateAction(date);
          }
        
      }

      const getDate = function(){
          let value;
          if(dateData){
              value = dateData;
          } else{
              value = "Start Date";
          }
          return value;
      }

      const getData = function(){
          let value;
          if(dateData){
              value = "20/07/2018"
          }
          console.log("Value", value);
          return value;
      }

      let format = format || "DD/MM/YYYY";


    return (
        <div>
            {isDatePickerOpened && <DayPickerInput
            component={InputWithIcon}
            showOverlay
            inputProps={{...props.input}}
            formatDate={formatDate}
            parseDate={parseDate}
            placeholder={format}
            onDayChange={onDayChanged}
            />}
            {!isDatePickerOpened &&  <IconLabel size="tiny" icon="calendar minus outline" name={getDate()} onClick={onOpenDataPicker}></IconLabel>}
        </div>
       
        // <DayPickerInput 
        //     component={props => <input {...props} />}
        //     onDayChange={day => console.log(day)} />

    )
}

// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        isDatePickerOpened : store.DatePickerReducer.isDatePickerOpened,
        dateData : store.DatePickerReducer.dateData
    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
  //map action here
  onOpenDatePickerAction,
  setDateAction
};

export default connect(mapStateToProps, mapActionsToProps)(DatePickerElement);