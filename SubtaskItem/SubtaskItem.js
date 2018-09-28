/**
 * Created by Robins Gupta
 * 27th Sept 2018
 */

import React, {PureComponent}  from 'react';
import PropTypes               from 'prop-types';
import { Icon}                 from 'semantic-ui-react'
import { connect }             from 'react-redux'
//Style.
import "./SubtaskItem.css"

//Custom import..
import InputElement     from '../ReduxForm/InputElement';
import SnaphyForm       from '../ReduxForm/SnaphyForm'
import CustomCheckbox   from '../CustomCheckbox'
import OptionPopup      from '../OptionPopup'
import {getSubTask}     from '../../baseComponents/GridView/components/ModelData/SubTask/selector'

class SubtaskItem extends PureComponent {
  static defaultProps = {
    placeholder: "Add a subtask",
    size: "mini",
    label: "Add a subtask",
    rows: 1,
    subtask:{
      isCompleted: false,
    }
  }

  static propTypes = {
    //Required..
    subtaskId: PropTypes.string.isRequired,
    taskId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,

    //Optional
    isSelected: PropTypes.func,
    placeholder: PropTypes.string,
    size: PropTypes.string,
    rows: PropTypes.number,
    label: PropTypes.string,

    //Methods
    onSubTaskCompletedClick: PropTypes.func,
    onDataChanged: PropTypes.func,
    onSubTaskDelete: PropTypes.func,
    onDataSave: PropTypes.func,
  }

  constructor(props){
    super(props)
    this.onSubtaskCompletedBtnClick = this._onSubtaskCompletedBtnClick.bind(this)
    this.onDataChanged              = this._onDataChanged.bind(this)
    this.onSubTaskDelete            = this._onSubTaskDelete.bind(this)
    this.onDataSave                 = this._onDataSave.bind(this)
    this.state = {
      forceClose: false
    }
  }


  _onSubtaskCompletedBtnClick(event){
    const {onSubTaskCompletedClick, subtaskId, subtask} = this.props
    const {
      isCompleted,
    } = subtask
    onSubTaskCompletedClick? onSubTaskCompletedClick(!isCompleted, subtaskId):null
  }

  _onDataChanged(title){
    const {onDataChanged, subtaskId} = this.props
    onDataChanged?onDataChanged(title, subtaskId):null
  }


  _onSubTaskDelete(event){
    const state = !this.state.forceClose
    this.setState({
      forceClose:state
    })
    const {onSubTaskDelete, } = this.props
    onSubTaskDelete? onSubTaskDelete(subtaskId):null
  }

  _onDataSave(event){
    const {onDataSave, subtaskId} = this.props
    onDataSave?onDataSave(subtaskId):null
  }



  render(){
    const {
      placeholder,
      rows,
      subtask,
    } = this.props

    const {
      id,
      title,
      isCompleted,
    } = subtask

    const focus = id?false:true

    return (

      <div className="task-detail-subtask-item-container">
          <div className="task-detail-subtask-title-completed-container">
            <CustomCheckbox className="task-detail-custom-checkbox" size='mini' isSelected={isCompleted} onItemClicked={this.onSubtaskCompletedBtnClick}></CustomCheckbox>
          </div>
          <div className="task-detail-subtask-item-input-container">
            <SnaphyForm>
              <InputElement autoFocus={focus} onBlur={this.onDataSave} value={title} onChange={this.onDataChanged} className="task-detail-subtask-title-input" type="text" placeholder={placeholder} rows={rows} />
            </SnaphyForm>
            <div  className="task-detail-subtask-item-icon-container">
              <OptionPopup
                heading="Task Actions"
                close={this.state.forceClose}
                trigger={
                  <Icon name="ellipsis horizontal" />
                }
              >
                <div className="task-detail-subtask-dialog-item" onClick={this.onSubTaskDelete}>
                  Delete Item
                </div>
              </OptionPopup>
            </div>
          </div>
      </div>
    )
  }

}


const mapStateToProps = (state, props) => {
  return {
    subtask: getSubTask(state, props)
  }
}

const mapActionToProps = {}


export default connect(mapStateToProps, mapActionToProps)(SubtaskItem)
