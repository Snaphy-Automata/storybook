/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React from 'react';
import PropTypes from 'prop-types';

//Custom import..
import CircularIconBox   from '../CircularIconBox'



const AssignTask = ({isNew, onAssignTaskClick}) => {

  return (
    <div className="task-detail-assign-task-container">
      <div className="task-detail-assign-sidebar-icon">
        <CircularIconBox className="task-detail-custom-checkbox" icon="user" />
      </div>
      <div className="task-detail-assign-sidebar-body">
        Assign Task
      </div>
    </div>
  )
}


AssignTask.defaultProps = {

}


AssignTask.propTypes = {

}


export default AssignTask



