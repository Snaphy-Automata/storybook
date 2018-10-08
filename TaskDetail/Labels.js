/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React, {PureComponent} from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { compose, graphql, withApollo } from 'react-apollo'

//Custom Import..
import CircularIconBox        from '../CircularIconBox'
import TaskLabel              from '../TaskLabels'
import {
  onTaskLabelAddedAction,
  onTaskLabelRemoveAction,
} from '../../baseComponents/GridView/components/ModelData/Task/action'

import {getTaskLabels} from  '../../baseComponents/GridView/components/ModelData/Label/selector'


import {
  addLabel,
  removeLabel,
} from '../../baseComponents/GridView/components/graphql/task/mutation';



class Labels extends PureComponent{
  static defaultProps = {
    labelIds: []
  }

  static propTypes = {
    labelIds: PropTypes.array,
    projectId: PropTypes.string.isRequired,
    taskId: PropTypes.string.isRequired,
  }

  constructor(props){
    super(props)
    this.onLabelAdded          = this._onLabelAdded.bind(this)
    this.onLabelRemoveBtnClick = this._onLabelRemoveBtnClick.bind(this)
    this.onAddLabelBtnClick    = this._onAddLabelBtnClick.bind(this)
    this.state={
      isDialogOpened: false
    }
  }


  _onLabelRemoveBtnClick(event, labelId){
    const {taskId, onTaskLabelRemoveAction, removeLabel} = this.props
    //Call the reducer and mutation
    onTaskLabelRemoveAction(taskId, labelId, removeLabel)
    .then(data=>{
      //Label removed.
    })
    .catch(error=>{
      console.error("Error removing labels.", error)
    })
    console.log("On Label Remove btn click", labelId)

  }

  _onLabelAdded(event, labelId){
    const {taskId, onTaskLabelAddedAction, addLabel} = this.props
    //Call the reducer and mutation
    onTaskLabelAddedAction(taskId, labelId, addLabel)
    .then(data=>{
      //Done adding label
    })
    .catch(error=>{
      console.error("Error adding label", error)
    })
    console.log("On Label Btn Add click", labelId);
  }



  _onAddLabelBtnClick(){
    console.log("Add Label Btn clicked")
    const state = !this.state.isDialogOpened
    this.setState({
      isDialogOpened: state
    })
  }


  render(){
    const {labelIds, projectId, taskId} = this.props
    const hasLabels = !!labelIds.length
    console.log("Task Detail Labels getting rendered")
    return (
      <div className="task-detail-labels-container">
        <div onClick={this.onAddLabelBtnClick} className="task-detail-labels-sidebar-icon">
          <CircularIconBox isNew={!hasLabels} className="task-detail-labels-checkbox" icon="tag" />
        </div>
        <div className="task-detail-assign-sidebar-body">
            <TaskLabel
              hasLabels={hasLabels}
              isDialogOpened={this.state.isDialogOpened}
              onAddLabelBtnClick={this.onAddLabelBtnClick}
              labelIds={labelIds}
              projectId={projectId}
              onLabelAdded={this.onLabelAdded}
              onLabelRemoveBtnClick={this.onLabelRemoveBtnClick}
            />
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => {
  return {
    labelIds: getTaskLabels(state, props)
  }
}

const mapActionToProps = {
  onTaskLabelAddedAction,
  onTaskLabelRemoveAction,
}


const LabelMutation = compose(
  graphql(addLabel, { name: "addLabel" }),
  graphql(removeLabel, { name: "removeLabel" }),
)(Labels);

export default withApollo(connect(mapStateToProps, mapActionToProps)(LabelMutation))
