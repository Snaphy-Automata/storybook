/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React from 'react'
import PropTypes from 'prop-types'

//Custom import..
import DateBox from './DateBox'


const Dates = (props) => {

  return (
    <div className="task-detail-dates-container">
      <DateBox heading="Due Date" name="dueDate" />
      <DateBox heading="Start Date" name="startDate" />
    </div>
  )
}



Dates.defaultProps = {

}


Dates.propTypes = {
  task: PropTypes.object,
}


export default Dates

