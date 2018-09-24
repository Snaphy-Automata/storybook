/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React, {PureComponent} from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'

//Custom Import..
import CircularIconBox        from '../CircularIconBox'
import TaskLabel              from '../TaskLabels'
import {
  onTaskLabelAddedAction,
  onTaskLabelRemoveAction,
} from '../../baseComponents/GridView/components/ModelData/Task/action'

import {getTaskLabels} from  '../../baseComponents/GridView/components/ModelData/Label/selector'

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
    const {taskId, onTaskLabelRemoveAction} = this.props
    //Call the reducer and mutation
    //TODO: Add mutation here..
    onTaskLabelRemoveAction(taskId, labelId)
    console.log("On Label Remove btn click", labelId)

  }

  _onLabelAdded(event, labelId){
    const {taskId, onTaskLabelAddedAction} = this.props
    //Call the reducer and mutation
    //TODO: Add mutation here..
    onTaskLabelAddedAction(taskId, labelId)
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
    console.log("Labels Ids", labelIds, taskId)
    const hasLabels = !!labelIds.length
    console.log("has Labels", hasLabels)
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


export default connect(mapStateToProps, mapActionToProps)(Labels)

