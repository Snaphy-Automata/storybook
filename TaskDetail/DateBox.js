/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React          from 'react';
import PropTypes      from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment         from 'moment';
import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';


//Custom import
import CircularIconBox   from '../CircularIconBox'
import DatePicker        from '../DatePicker'


const DateBox = (props) => {
  const {
    date,
    format,
    heading,
    name,
    placeholder,
  } = props
  return (
    <div className="task-detail-date-box">
      <div className="task-detail-dates-icon">
        <CircularIconBox isNew={false} className="task-detail-dates-custom-checkbox" icon="calendar alternate outline" />
      </div>
      <div className="task-detail-date-body">
        <div className="task-detail-date-body-label">{heading}</div>
        <div className="task-detail-date-body-placeholder">
          {/* mm/dd/yyyy */}
          <DatePicker className="task-detail-date-picker" placeholder={placeholder} name={name} format={format} date={date} />
        </div>
      </div>
    </div>
  )
}




DateBox.defaultProps = {
  placeholder: "mm/dd/yyyy",
  label: "mm/dd/yyyy",
  format: "MM/DD/YYYY",
  date: undefined,
  heading: "Date",
  name: "date"
}


DateBox.propTypes = {

}


export default DateBox;
