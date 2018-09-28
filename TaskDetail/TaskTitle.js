/**
 * Created by Robins
 * 17th Sept 2018
 */
import React from 'react';
import PropTypes from 'prop-types';

//Custom import..
import InputElement     from '../ReduxForm/InputElement';
import SnaphyForm       from '../ReduxForm/SnaphyForm'
import CustomCheckbox   from '../CustomCheckbox'
const TaskTitle = ({task, placeholder, rows, onDataChanged, size, isSelected, onTaskCompleted}) =>{
  return (
    <div className="task-detail-task-title-container">
      <div className="task-detail-task-title-completed-container">
        <CustomCheckbox className="task-detail-custom-checkbox" size='mini' isSelected={isSelected} onItemClicked={onTaskCompleted}></CustomCheckbox>
      </div>
      <div style={{float: "left", width: "396.5px"}}>
        <SnaphyForm>
          <InputElement className="task-detail-task-title-input"  type="text" placeholder={placeholder} size={size} rows={rows} onChange={onDataChanged}></InputElement>
        </SnaphyForm>
      </div>
    </div>
  )
}




//Adding Default props
TaskTitle.defaultProps = {
  placeholder: "Enter a task name",
  size: "large",
  rows: 1,
  isSelected: false,
};

TaskTitle.propTypes = {
  task: PropTypes.object,
  onDataChanged: PropTypes.func,
  label: PropTypes.string,
  size: PropTypes.string,
  rows: PropTypes.number,
  isSelected: PropTypes.bool.func,
  onTaskCompleted: PropTypes.func,
}



export default TaskTitle;


