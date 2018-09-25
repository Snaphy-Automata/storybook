/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React, {PureComponent}          from 'react'
import PropTypes      from 'prop-types'
import moment         from 'moment'
//Custom import
import CircularIconBox   from '../CircularIconBox'
import DatePicker        from '../DatePicker'


class DateBox extends PureComponent {
  static className = "task-detail-date-picker"
  constructor(props){
    super(props)
    this.onDayChangedListener = this.onDayChanged.bind(this)
  }


  //On Day Changed
  onDayChanged(selectedDate){
    console.log(selectedDate)

    this.props.onDayChanged?this.props.onDayChanged(selectedDate):null
  }


  render(){
    const {
      date,
      format,
      heading,
      name,
      placeholder,
    } = this.props
    let className = this.className
    let typeClassName = getDateClassName(date)
    if(typeClassName){
      className = `${this.className} ${typeClassName}`
    }
    return (
      <div className="task-detail-date-box">
        <div className="task-detail-dates-icon">
          <CircularIconBox isNew={false} className="task-detail-dates-custom-checkbox" icon="calendar alternate outline" />
        </div>
        <div className="task-detail-date-body">
          <div className="task-detail-date-body-label">{heading}</div>
          <div className="task-detail-date-body-placeholder">
            {/* mm/dd/yyyy */}
            <DatePicker onDayChanged={this.onDayChangedListener} className={className} placeholder={placeholder} name={name} format={format} date={date} />
          </div>
        </div>
      </div>
    )
  }

}



/**
 * Will return the date class name..
 */
const getDateClassName = (date)=> {
  let type
  if(date){
    if (moment().format("DD MMMM YYYY") === moment(date).format("DD MMMM YYYY")) {
      type = "today"
    }else{
      type = isDelayed(date)? "delayed":"coming"
    }
    return type
  }
}



const isDelayed=(date)=>{
  let isDelayed = false;
  if(date){
      const startOfDay = moment.utc().startOf('day').valueOf();
      const dueDate = moment.utc(date).valueOf();
      if( dueDate < startOfDay ){
        isDelayed = true;
      }
  }
  return isDelayed;
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
  onDayChanged: PropTypes.func,
  date: PropTypes.any,
  heading: PropTypes.string,
  onDayChanged: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}


export default DateBox;
