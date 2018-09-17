/**
 * Created by Robins
 * 12th Sept 2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

//Custom import..
import InputElement     from '../ReduxForm/InputElement';
import SnaphyForm       from '../ReduxForm/SnaphyForm'

const TaskTitle = ({task, placeholder, label, rows, onDataChanged, size}) =>{

  return (
    <div className="task-detail-task-name-container">
      <SnaphyForm>
        <Field className="task-detail-task-name-input" name={getTitleFieldName(task)} type="text" placeholder={placeholder} size={size} rows={rows} label={label} component={InputElement} onDataChanged={onDataChanged}></Field>
      </SnaphyForm>
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
  placeholder: "Write a task name",
  label: "TaskTitle",
  size: "large",
  rows: 1
};

TaskTitle.propTypes = {
  task: PropTypes.object,
  onDataChanged: PropTypes.func,
  label: PropTypes.string,
  size: PropTypes.string,
  rows: PropTypes.number
}


export default TaskTitle;
