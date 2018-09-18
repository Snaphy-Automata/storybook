/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React from 'react';
import PropTypes from 'prop-types';

//Custom import..
import CircularIconBox   from '../CircularIconBox'



const AssignTask = ({onAssignTaskClick, members}) => {
  const hasMember = !!members.length
  return (
    <div className="task-detail-assign-task-container">
      <div className="task-detail-assign-sidebar-icon">
        <CircularIconBox isNew={!hasMember} className="task-detail-custom-checkbox" icon="user" />
      </div>
      <div className="task-detail-assign-sidebar-body">
        {!hasMember && <span>Assign Task</span> }

      </div>
    </div>
  )
}


AssignTask.defaultProps = {
  members: []
}


AssignTask.propTypes = {
  onAssignTaskClick: PropTypes.func.isRequired,
  members: PropTypes.array
}


export default AssignTask



