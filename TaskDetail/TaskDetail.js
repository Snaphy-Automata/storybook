/**
 * Created by Robins
 * 17th Sept 2018
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import './TaskDetail.css';


//Custom import..
import Header            from './Header'
import TaskTitle         from './TaskTitle'
import AssignTask        from './AssignTask'
import Dates             from './Dates'
import Labels            from './Labels'

class TaskDetail extends PureComponent{
  static propTypes = {
    onTitleChanged: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired,
  }

  static defaultProps = {

  }

  constructor(props){
    super(props)
    this.onSubTaskAdded = this.onAddSubTasksToList.bind(this)
  }


  onAddSubTasksToList(){
    //FIXME: Robins
    //17th Sept ..
    //Modify only pass array of ids.
    // let subTaskDataList = [...subTaskList];
    // if(subTaskDataList.length){
    //     if(subTaskDataList[subTaskDataList.length-1].id){
    //         subTaskDataList.push({});
    //     }
    // } else{
    //     subTaskDataList.push({});
    // }

    // //console.log("Add SubTask getting called", subTaskDataList);
    // onAddSubTask(selectedTask.id, subTaskDataList, "empty", null, null);
  }


  render(){
    const {
      onTitleChanged,
      task,
      projectId,
    } = this.props
    console.log("New task Deatil getting called", task);
    return (
      <div>
        <Header onSubTaskAdded={this.onSubTaskAdded} />
        <div className="task-detail-container">
          <TaskTitle task={task} onDataChanged={onTitleChanged}/>
          {/* Send member id here.. */}
          {/* <AssignTask task={task}  /> */}
          <Dates  task={task} />
          <Labels taskId={task.id} projectId={projectId} />
          {/* <SubTasks task={task} /> */}
        </div>
      </div>
    )
  }
}




function mapStateToProps(store) {
  return {
      // isMarkCompletedClicked: store.TaskListReducer.isMarkCompletedClicked,
      // isStatusClicked: store.TaskListReducer.isStatusClicked,
      // statusData: store.TaskListReducer.statusData,
      // isUserButtonClicked: store.TaskListReducer.isUserButtonClicked,
      // isLabelButtonClicked: store.TaskListReducer.isLabelButtonClicked,
      //labels : store.ModelDataReducer.labels,
      //users : store.ModelDataReducer.users,
      // selectedUserList : store.TaskListReducer.selectedUserList
  }
}

const mapActionsToProps = {
  // onMarkCompleteClickedAction,
  // onStatusChangedAction,
  // getStatusDataAction,
  // onUserAddButtonClickedAction,
  // onLabelAddButtonClickedAction,
}


const TaskDetailForm = reduxForm({
  form: "taskForm",
  enableReinitialize: true
})(TaskDetail);

export default connect(mapStateToProps, mapActionsToProps)(TaskDetailForm);
