/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React from 'react';
import PropTypes from 'prop-types';

//Custom import..
import CircularIconBox   from '../CircularIconBox'
import AssignedTeams     from './AssignedTeams'


const AssignTask = ({onAssignTaskClick, memberIds}) => {
  const hasMember = !!memberIds.length
  return (
    <div className="task-detail-assign-task-container">
      <div className="task-detail-assign-sidebar-icon">
        <CircularIconBox isNew={!hasMember} className="task-detail-custom-checkbox" icon="user" />
      </div>
      <div className="task-detail-assign-sidebar-body">
        {!hasMember && <span>Assign Task</span> }
        {hasMember && <AssignedTeams memberIds={[memberIds]} />}
      </div>
    </div>
  )
}


AssignTask.defaultProps = {
  memberIds: ["rkfqQAbnf"]
}


AssignTask.propTypes = {
  onAssignTaskClick: PropTypes.func.isRequired,
  memberIds: PropTypes.array
}


export default AssignTask



