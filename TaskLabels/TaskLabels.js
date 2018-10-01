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
    hasLabels: false,
  }

  static propTypes = {
    labelIds: PropTypes.array,
    projectId: PropTypes.string.isRequired,
    //When a label is removed..
    onLabelRemoveBtnClick: PropTypes.func.isRequired,
    //When a label is added..
    onLabelAdded: PropTypes.func.isRequired,
    //On plus button click to display label dialog box to select labels.
    onAddLabelBtnClick: PropTypes.func.isRequired,
    hasLabels: PropTypes.bool,
  }

  constructor(props) {
    super(props)
  }



  getLabels(labelIds, onLabelRemoveBtnClick){
    return map(labelIds, (labelId, index)=>{
      return (
        <Label className="label-list-label-item" key={index} onButtonClick={onLabelRemoveBtnClick} labelId={labelId} type="read"/>
      )
    })
  }


  render() {
    const {labelIds, projectId, onLabelRemoveBtnClick, onLabelAdded, onAddLabelBtnClick, isDialogOpened, hasLabels} = this.props
    let assignLabelProp
    if(isDialogOpened){
      assignLabelProp = {
        icon: 'cancel',
        tooltip:'Close',
        className: "task-detail-assigned-team-box task-detail-assigned-team-class closed"
      }
    }else{
      assignLabelProp = {
        icon: 'plus',
        tooltip:'Assign Labels',
        className: "task-detail-assigned-team-box task-detail-assigned-team-class"
      }
    }

    return (
      <div className="task-labels-container">
        {!hasLabels && <span style={{cursor:"pointer"}} onClick={onAddLabelBtnClick}>Assign Labels</span> }
        {hasLabels && this.getLabels(labelIds, onLabelRemoveBtnClick)}
        { (hasLabels || isDialogOpened) && <TeamCircleIcon onClick={onAddLabelBtnClick} iconClassName="task-detail-label-add-new-cicle" size="tiny" key={"assign-labels"} {...assignLabelProp}/>}
        {
          isDialogOpened &&
          <TaskLabelBox selectedLabelIds={labelIds} onLabelAdded={onLabelAdded} projectId={projectId} />
        }
      </div>
    )
  }
}




export default TaskLabels
