/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React, {PureComponent}  from 'react'
import PropTypes               from 'prop-types'
import DayPickerInput          from 'react-day-picker/DayPickerInput'
import { Popup }               from 'semantic-ui-react'
import {
  formatDate,
  parseDate,
}                              from 'react-day-picker/moment'

//Style
import 'react-day-picker/lib/style.css'


class DatePicker extends PureComponent {

  static dateRef = null

  static defaultProps = {
    placeholder: "mm/dd/yyyy",
    format: "MM/DD/YYYY",
    date: undefined,
    name: "date"
  }

  static propTypes = {
    placeholder: PropTypes.string,
    format: PropTypes.string,
    name: PropTypes.string,
    onDayChanged: PropTypes.func,
    className: PropTypes.string,
  }

  constructor(props){
    super(props)
    this.overlay = this.overlayComponent.bind(this)
    this.onDayChanged = this.handleDayChange.bind(this)
  }

  /**
   * Overlay component to get displayed in datepicker as a popup here datePicker input is used as a ref.
   */
  overlayComponent({ children, ...props }) {
    const open = true;
    return (
        <Popup hideOnScroll context={this.dateRef.getInput()} content={children} position='bottom left' open={open} />
    );
  }

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    if(selectedDay){
      this.props.onDayChanged?this.props.onDayChanged(selectedDay):null
    }
  }


  render(){
    const {name, format, date, placeholder, className} = this.props
    const inputProps = {
      className
    }
    return (
      <DayPickerInput
          ref={node=>this.dateRef=node}
          name={name}
          inputProps={inputProps}
          placeholder={placeholder}
          format={format}
          hideOnDayClick={true}
          keepFocus={false}
          value={date}
          formatDate={formatDate}
          parseDate={parseDate}
          overlayComponent={this.overlay}
          //FIXME: 18th Sept 2018
          //Call action on date changed..or blur
          //On Dat Change blue date also..
          onDayChange={this.onDayChanged}
        />
    )
  }
}



export default DatePicker

