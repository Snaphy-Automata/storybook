/**
 * Created by Robins
 * 17th Sept 2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

//Custom import..
import InputElement     from '../ReduxForm/InputElement';
import SnaphyForm       from '../ReduxForm/SnaphyForm'
import CustomCheckbox   from '../CustomCheckbox'
const TaskTitle = ({task, placeholder, label, rows, onDataChanged, size, isSelected, onTaskCompleted}) =>{
  return (
    <div className="task-detail-task-title-container">
      <div className="task-detail-task-title-completed-container">
        <CustomCheckbox className="task-detail-custom-checkbox" size='mini' isSelected={isSelected} onItemClicked={onTaskCompleted}></CustomCheckbox>
      </div>
      <div style={{float: "left", width: "396.5px"}}>
        <SnaphyForm>
          <Field className="task-detail-task-title-input" name={getTitleFieldName(task)} type="text" placeholder={placeholder} size={size} rows={rows} label={label} component={InputElement} onDataChanged={onDataChanged}></Field>
        </SnaphyForm>
      </div>
    </div>
  )
}


/**
 * Will return title field name
 */
const getTitleFieldName = (task) => {
  let titleName;
  if (task) {
      if (task.id) {
          if (task.title) {
              titleName = `${task.id}.title`;
          } else {
              titleName = `${task.id}.title_new`;
          }

      } else {
          titleName = "title";
      }

  } else {
      titleName = "title";
  }
  return titleName;
}



//Adding Default props
TaskTitle.defaultProps = {
  placeholder: "Enter a task name",
  label: "TaskTitle",
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


