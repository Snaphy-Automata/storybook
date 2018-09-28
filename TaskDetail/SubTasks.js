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
  }

  //On subtask title changed
  _onTitleChanged(title, subtaskId){
    const {taskId, projectId, onTitleChanged} = this.props
    //Dispatch..
    onTitleChanged(projectId, taskId, subtaskId, title)
  }

  //on subtask completed btn clicked..
  _onSubTaskCompletedBtnClick(isCompleted, subtaskId){
    const {taskId, projectId} = this.props
  }

  getSubtasks(){
    const {subtasks, taskId, projectId } = this.props
    const onTitleChanged = this.onTitleChanged
    return map(subtasks, ((subtaskId, index)=> (<SubtaskItem key={index} onDataChanged={onTitleChanged} subtaskId={subtaskId} taskId={taskId} projectId={projectId} />)))
  }


  render(){
    console.log("Subtasks getting rendered", this.props)
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
}



const SubTasksMutation = compose(
  graphql(deleteSubTaskMutation, { name: "deleteSubTaskMutation" }),
  graphql(updateIsCompletedMutation, { name: "updateIsCompletedSubTaskMutation" }),
  graphql(createOrEditSubTaskMutation, { name: "createOrEditSubTaskMutation" }),
)(SubTasks);



export default withApollo(connect(makeMapStateToProps, mapActionsToProps)(SubTasksMutation))
