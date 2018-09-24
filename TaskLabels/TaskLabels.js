/**
 * Created by Robins Gupta
 * 24th Sept 2018
 */

import React, {
  PureComponent
} from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import "./TaskLabels.css"


//Custom import
import Label from '../SelectLabel'
import TeamCircleIcon from '../TeamCircleIcon'
import TaskLabelBox from './TaskLabelBox'


class TaskLabels extends PureComponent {
  static labelClosedClass="task-detail-assigned-team-box task-detail-assigned-team-class"
  static labelOpenClass = "task-detail-assigned-team-box task-detail-assigned-team-class close"
  static defaultProps = {
    labelIds: [],
  }

  static propTypes = {
    labelIds: PropTypes.array,
    projectId: PropTypes.string.isRequired,
    //When a label is removed..
    onLabelRemoveBtnClick: PropTypes.func.isRequired,
    //When a label is added..
    onLabelAdded: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.onAddLabelBtnClick    = this._onAddLabelBtnClick.bind(this)
    this.state={
      isDialogOpened: false
    }
  }



  _onAddLabelBtnClick(){
    console.log("Add Label Btn clicked")
    const state = !this.state.isDialogOpened
    this.setState({
      isDialogOpened: state
    })
  }

  getLabels(labelIds, onLabelRemoveBtnClick){
    return map(labelIds, (labelId, index)=>{
      let style = {marginLeft: "15px"}
      if(index === 0){
        style = {}
      }
      return (
        <Label key={index} onButtonClick={onLabelRemoveBtnClick} labelId={labelId} style={style} type="read"/>
      )
    })
  }


  render() {
    const {labelIds, projectId, onLabelRemoveBtnClick, onLabelAdded} = this.props
    const {isDialogOpened} = this.state
    let assignLabelProp
    if(isDialogOpened){
      assignLabelProp = {
        icon: 'cancel',
        //tooltip:'Close',
        className: "task-detail-assigned-team-box task-detail-assigned-team-class closed"
      }
    }else{
      assignLabelProp = {
        icon: 'plus',
        //tooltip:'Assign Labels',
        className: "task-detail-assigned-team-box task-detail-assigned-team-class"
      }
    }

    return (
      <div className="task-labels-container">
        {this.getLabels(labelIds, onLabelRemoveBtnClick)}
        <TeamCircleIcon onClick={this.onAddLabelBtnClick} iconClassName="task-detail-label-add-new-cicle" size="tiny" key={"assign-labels"} {...assignLabelProp}/>
        {
          isDialogOpened &&
          <TaskLabelBox selectedLabelIds={labelIds} onLabelAdded={onLabelAdded} projectId={projectId} />
        }
      </div>
    )
  }
}




export default TaskLabels
