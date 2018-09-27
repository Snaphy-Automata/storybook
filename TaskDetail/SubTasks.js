/**
 * Created by Robins
 * 17th Sept 2018
 */
import React, {PureComponent} from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import map                    from 'lodash/map'

//Custom import..
import SubtaskItem from '../SubtaskItem'
import {getSubtasks} from '../../baseComponents/GridView/components/ModelData/Task/selector'

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
  }


  getSubtasks(){
    const {subtasks, taskId, projectId } = this.props
    console.log("Subtasks", subtasks)
    return map(subtasks, ((subtaskId, index)=> (<SubtaskItem key={index} subtaskId={subtaskId} taskId={taskId} projectId={projectId} />)))
  }


  render(){
    return (
      <div className="task-detail-subtask-main-container" >
        {this.getSubtasks()}
      </div>
    )
  }

}



function mapStateToProps(store, props) {
  return {
    subtasks: getSubtasks(store, props)
  }
}

const mapActionsToProps = {

}



export default connect(mapStateToProps, mapActionsToProps)(SubTasks)
