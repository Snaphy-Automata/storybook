/**
 * Created by Robins
 * 17th Sept 2018
 */
import React, {PureComponent} from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import map                    from 'lodash/map'
import { reduxForm }          from 'redux-form';
//Custom import..
import SubtaskItem from '../SubtaskItem'
import {
  generateSubtasks,
} from '../../baseComponents/GridView/components/ModelData/Task/selector'

import {
  onTitleChanged,
} from '../../baseComponents/GridView/components/ModelData/SubTask/action'

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
    this.onTitleChanged = this._onTitleChanged.bind(this)
  }

  //On subtask title changed
  _onTitleChanged(title, subtaskId){
    const {taskId, projectId, onTitleChanged} = this.props
    //Dispatch..
    onTitleChanged(projectId, taskId, subtaskId, title)
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


export default connect(makeMapStateToProps, mapActionsToProps)(SubTasks)
