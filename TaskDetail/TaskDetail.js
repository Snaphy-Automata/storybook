/**
 * Created by Robins
 * 17th Sept 2018
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './TaskDetail.css';


//Custom import..
import Header            from './Header'
import TaskTitle         from './TaskTitle'
import AssignTask        from './AssignTask'
import Dates             from './Dates'
import Labels            from './Labels'
import SubTasks          from './SubTasks'
import Description       from './Description'

import {
  onTaskUnSelectedAction
}                        from '../../baseComponents/GridView/components/ModelData/Task/action'

class TaskDetail extends PureComponent{
  static propTypes = {
    taskId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
  }

  static defaultProps = {

  }

  constructor(props){
    super(props)
    this.onSubTaskAdded               = this.onAddSubTasksToList.bind(this)
    this.onDetailViewCloseBtnClick    = this._onDetailViewCloseBtnClick.bind(this)
    this.openShareDialog              = this._openShareDialog.bind(this)
  }



  _onDetailViewCloseBtnClick(event){
    const {onTaskUnSelectedAction} =  this.props
    onTaskUnSelectedAction()
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

  _openShareDialog(){

  }


  render(){
    const {
      taskId,
      projectId,
    } = this.props
    return (
      <div>
        {
          taskId &&
          <div>
          <Header openShareDialog={this.openShareDialog} onDetailViewCloseBtnClick={this.onDetailViewCloseBtnClick} onSubTaskAdded={this.onSubTaskAdded} />
          <div className="task-detail-container">
            <TaskTitle taskId={taskId}/>
            {/* Send member id here.. */}
            {/* <AssignTask task={task}  /> */}
            {/* <Dates  taskId={taskId} startDate={task.startDate} endDate={task.endDate} /> */}
            <Labels taskId={taskId} projectId={projectId} />
            <SubTasks taskId={taskId} projectId={projectId} />
            {/* <Description description={task.description} taskId={task.id} projectId={projectId} /> */}
          </div>
        </div>
        }
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
  onTaskUnSelectedAction,
  // onMarkCompleteClickedAction,
  // onStatusChangedAction,
  // getStatusDataAction,
  // onUserAddButtonClickedAction,
  // onLabelAddButtonClickedAction,
}


export default connect(mapStateToProps, mapActionsToProps)(TaskDetail);
