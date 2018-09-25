/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React from 'react'
import PropTypes from 'prop-types'

//Custom import..
import DateBox from './DateBox'


const Dates = ({taskId, endDate, startDate, onDueDateChanged, onStartDateChanged}) => {
  return (
    <div className="task-detail-dates-container">
      <DateBox date={endDate} onDayChanged={onDueDateChanged} heading="Due Date" name="dueDate" />
      <DateBox date={startDate} onDayChanged={onStartDateChanged} heading="Start Date" name="startDate" />
    </div>
  )
}



Dates.defaultProps = {
  task: {}
}


Dates.propTypes = {
  taskId: PropTypes.string.isRequired,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  onDueDateChanged: PropTypes.func.isRequired,
  onStartDateChanged: PropTypes.func.isRequired,
}


export default Dates

