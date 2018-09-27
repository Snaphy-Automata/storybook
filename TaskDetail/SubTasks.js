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
    return map(subtasks, ((subtaskId, index)=> (<SubtaskItem key={index} subtaskId={subtaskId} taskId={taskId} projectId={projectId} />)))
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

}


const TaskDetailForm = reduxForm({
  form: "subtasksForm",
  pure: true,
  //enableReinitialize: true
})(SubTasks);

export default connect(makeMapStateToProps, mapActionsToProps)(TaskDetailForm)
