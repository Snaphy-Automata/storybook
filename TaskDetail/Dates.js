/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React from 'react'
import PropTypes from 'prop-types'

//Custom import..
import DateBox from './DateBox'


const Dates = ({task, onDueDateChanged, onStartDateChanged}) => {

  return (
    <div className="task-detail-dates-container">
      <DateBox date={task.endDate} onDayChanged={onDueDateChanged} heading="Due Date" name="dueDate" />
      <DateBox date={task.startDate} onDayChanged={onStartDateChanged} heading="Start Date" name="startDate" />
    </div>
  )
}



Dates.defaultProps = {
  task: {}
}


Dates.propTypes = {
  task: PropTypes.object,
  onDueDateChanged: PropTypes.func.isRequired,
  onStartDateChanged: PropTypes.func.isRequired,
}


export default Dates

