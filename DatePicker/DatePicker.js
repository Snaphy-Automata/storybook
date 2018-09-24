/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React, {PureComponent}  from 'react'
import PropTypes               from 'prop-types'
import DayPickerInput          from 'react-day-picker/DayPickerInput'
import { Popup }               from 'semantic-ui-react'
import moment                  from 'moment'
import {
  formatDate,
  parseDate,
}                              from 'react-day-picker/moment'

//Style
import 'react-day-picker/lib/style.css'


class DatePicker extends PureComponent {
  static currentDate = undefined
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
    this.overlay          = this.overlayComponent.bind(this)
    this.onDayChanged     = this.handleDayChange.bind(this)
    this.onDatePickerHide = this._onDatePickerHide.bind(this)
    this.setReference     = this._setReference.bind(this)
    this.onLabelClick     = this._onLabelClick.bind(this)
    this.state            = {
      dateRef: null,
      displayLabel:true,
    }
  }



  /**
   * Overlay component to get displayed in datepicker as a popup here datePicker input is used as a ref.
   */
  overlayComponent({ children, ...props }) {
    const open = true;
    return (
      <div>
        {
          this.state.dateRef &&
          <Popup size="mini" fluid hideOnScroll context={this.state.dateRef.getInput()} content={children} position='bottom left' open={open} />
        }
      </div>
    );
  }

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    if(selectedDay){
      this.currentDate = selectedDay
      this.props.onDayChanged?this.props.onDayChanged(selectedDay):null
    }
  }

  _onDatePickerHide(){
    this.setState({
      displayLabel: true
    })
  }

  _setReference(node){
    this.setState({dateRef:node})
    if(node){
      //Auto Focus..
      node.getInput().focus()
    }
  }

  _onLabelClick(){
    this.setState({
      displayLabel: false
    })
  }


  getLabel(date, placeholder, className){
    let label = date?moment(date).format("DD MMM YYYY") : placeholder
    let className_ = "snaphy-date-picker-label"
    className_ =  className? `${className_} ${className}`: className_
    return (
      <div className={className_} onClick={this.onLabelClick}>
        {label}
      </div>
    )
  }


  render(){
    const {name, format, date, placeholder, className} = this.props
    const inputProps = {
      className
    }
    return (
      <div>
        {
          this.state.displayLabel &&
          this.getLabel(date, placeholder, className)
        }
        {
          !this.state.displayLabel &&
          <DayPickerInput
            ref={this.setReference}
            name={name}
            inputProps={inputProps}
            placeholder={placeholder}
            format={format}
            //Keep opened always..
            showOverlay={true}
            hideOnDayClick={true}
            keepFocus={false}
            value={date}
            formatDate={formatDate}
            parseDate={parseDate}
            overlayComponent={this.overlay}
            onDayPickerHide={this.onDatePickerHide}
            //FIXME: 18th Sept 2018
            //Call action on date changed..or blur
            //On Dat Change blue date also..
            onDayChange={this.onDayChanged}
          />
        }
      </div>

    )
  }
}



export default DatePicker

