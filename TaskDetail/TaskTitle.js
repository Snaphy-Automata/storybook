/**
 * Created by Robins
 * 17th Sept 2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Custom import..
import InputElement     from '../ReduxForm/InputElement';
import SnaphyForm       from '../ReduxForm/SnaphyForm'
import CustomCheckbox   from '../CustomCheckbox'
import {
  onTitleChangeAction,
}                      from '../../baseComponents/GridView/components/ModelData/Task/action'
const TaskTitle = ({taskId, title, placeholder, rows, onTitleChangeAction, size, isSelected, onTaskCompleted}) =>{

  const onDataChanged = (title) => {
    //console.log("Task detail title getting called", title)
    onTitleChangeAction(taskId, title)
  }
  //console.log("task Detail Title getting rendered", title)

  return (
    <div className="task-detail-task-title-container">
      <div className="task-detail-task-title-completed-container">
        <CustomCheckbox className="task-detail-custom-checkbox" size='mini' isSelected={isSelected} onItemClicked={onTaskCompleted}></CustomCheckbox>
      </div>
      <div style={{float: "left", width: "396.5px"}}>
        <SnaphyForm>
          <InputElement value={title} className="task-detail-task-title-input" type="text" placeholder={placeholder} size={size} rows={rows} onChange={onDataChanged}></InputElement>
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
  onTaskCompleted: PropTypes.func,
}

function mapStateToProps(store, props) {
  const {taskId} =props;
  const taskObj = store.ModelDataReducer.task
  const task = taskObj.byId[taskId]
  const title = task && task.title ? task.title: ""
  return {
     title
  }
}

const mapActionsToProps = {
  onTitleChangeAction,
}



export default connect(mapStateToProps, mapActionsToProps)(TaskTitle);


