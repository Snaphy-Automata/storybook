/**
 * Created by Robins
 * 17th Sept 2018
 */
import React, {PureComponent} from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import map                    from 'lodash/map'
import { compose, graphql, withApollo } from 'react-apollo';
//Custom import..
import SubtaskItem from '../SubtaskItem'
import {
  generateSubtasks,
} from '../../baseComponents/GridView/components/ModelData/Task/selector'

import {
  onTitleChanged,
  onIsCompletedBtnClicked,
  onSubtaskSave,
  onSubtaskRemove,
} from '../../baseComponents/GridView/components/ModelData/SubTask/action'


import {
  createOrEditSubTaskMutation,
  updateIsCompletedMutation,
  deleteSubTaskMutation
} from '../../baseComponents/GridView/components/graphql/subtask/mutation';


class SubTasks extends PureComponent{
  static defaultProps = {
    subtasks:[]
  }

  static propTypes = {
    taskId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    subtasks: PropTypes.array,
  }

  constructor(props){
    super(props)
    this.onTitleChanged              = this._onTitleChanged.bind(this)
    this.onSubTaskCompletedBtnClick  = this._onSubTaskCompletedBtnClick.bind(this)
    this.onDataSave                  = this._onDataSave.bind(this)
    this.onSubTaskDelete             = this._onSubTaskDelete.bind(this)
  }

  //On subtask title changed
  _onTitleChanged(title, subtaskId){
    console.log("Subtask title change mutation getting called.")
    const {taskId, projectId, onTitleChanged} = this.props
    //Dispatch..
    onTitleChanged(projectId, taskId, subtaskId, title)
  }

  //on subtask completed btn clicked..
  _onSubTaskCompletedBtnClick(isCompleted, subtaskId){
    const {taskId, projectId, onIsCompletedBtnClicked, updateIsCompletedSubTaskMutation, createOrEditSubTaskMutation} = this.props
    console.log("Subtask completed btn click mutation getting called.")
    //Dispatch..
    onIsCompletedBtnClicked(projectId, taskId, subtaskId, isCompleted, updateIsCompletedSubTaskMutation, createOrEditSubTaskMutation)
    .then(subtask=>{
      console.log("Subtask saved successfully")
    })
    .catch(error=>{
      console.error("Error saving subtask")
    })
  }

  _onDataSave(subtaskId){
    const {taskId, projectId, onSubtaskSave, createOrEditSubTaskMutation, deleteSubTaskMutation} = this.props
    //Dispatch..
    onSubtaskSave(projectId, taskId, subtaskId, createOrEditSubTaskMutation, deleteSubTaskMutation)
    .then(subtask=>{
      console.log("Subtask saved successfully")
    })
    .catch(error=>{
      console.error("Error saved subtask", error)
    })
  }


  _onSubTaskDelete(subtaskId){
    const {taskId, projectId, onSubtaskRemove, deleteSubTaskMutation} = this.props
    console.log("Subtask Delete mutation getting called")
    //Dispatch..
    onSubtaskRemove(projectId, taskId, subtaskId, deleteSubTaskMutation)
    .then(subtask=>{
      console.log("Subtask saved successfully")
    })
    .catch(error=>{
      console.error("Error removing subtask")
    })
  }

  getSubtasks(){
    const {subtasks, taskId, projectId } = this.props
    const onTitleChanged = this.onTitleChanged
    const onSubTaskCompletedBtnClick = this.onSubTaskCompletedBtnClick
    const onDataSave = this.onDataSave
    const onSubTaskDelete = this.onSubTaskDelete
    return map(subtasks, ((subtaskId, index)=> (
    <SubtaskItem
      key={index}
      onDataChanged={onTitleChanged}
      subtaskId={subtaskId}
      taskId={taskId}
      projectId={projectId}
      onDataSave={onDataSave}
      onSubTaskDelete={onSubTaskDelete}
      onSubTaskCompletedClick={onSubTaskCompletedBtnClick}
    />)))
  }


  render(){
    return (
      <div className="task-detail-subtask-main-container" >
        {this.getSubtasks()}
      </div>
    )
  }

}

const makeMapStateToProps = ()=> {
  const getSubtasks = generateSubtasks()
  const mapStateToProps = (store, props) => {
    return {
      subtasks: getSubtasks(store, props)
    }
  }

  return mapStateToProps
}



const mapActionsToProps = {
  onTitleChanged,
  onIsCompletedBtnClicked,
  onSubtaskSave,
  onSubtaskRemove,
}



const SubTasksMutation = compose(
  graphql(deleteSubTaskMutation, { name: "deleteSubTaskMutation" }),
  graphql(updateIsCompletedMutation, { name: "updateIsCompletedSubTaskMutation" }),
  graphql(createOrEditSubTaskMutation, { name: "createOrEditSubTaskMutation" }),
)(SubTasks);



export default withApollo(connect(makeMapStateToProps, mapActionsToProps)(SubTasksMutation))
