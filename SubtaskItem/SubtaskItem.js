/**
 * Created by Robins Gupta
 * 27th Sept 2018
 */

import React, {PureComponent}  from 'react';
import PropTypes               from 'prop-types';
import { Icon}         from 'semantic-ui-react'
//Style.
import "./SubtaskItem.css"

//Custom import..
import InputElement     from '../ReduxForm/InputElement';
import SnaphyForm       from '../ReduxForm/SnaphyForm'
import CustomCheckbox   from '../CustomCheckbox'
import OptionPopup      from '../OptionPopup'


class SubtaskItem extends PureComponent {
  static defaultProps = {
    isSelected: false,
    placeholder: "Add a subtask",
    size: "mini",
    label: "Add a subtask",
    rows: 1,
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
    const {onTaskCompletedClick} = this.props
  }

  _onDataChanged(event){

  }


  _onSubTaskDelete(event){
    console.log("Deleting subtask")
    this.setState({
      forceClose: true
    })
  }

  _onDataSave(event){

  }



  render(){
    const {
      isSelected,
      placeholder,
      size,
      rows,
      label,
      title,
    } = this.props
    return (

      <div className="task-detail-subtask-item-container">
          <div className="task-detail-subtask-title-completed-container">
            <CustomCheckbox className="task-detail-custom-checkbox" size='mini' isSelected={isSelected} onItemClicked={this.onSubtaskCompletedBtnClick}></CustomCheckbox>
          </div>
          <div className="task-detail-subtask-item-input-container">
            <SnaphyForm>
              <InputElement value={title} onChange={this.onDataChanged} className="task-detail-subtask-title-input" type="text" placeholder={placeholder} rows={rows} />
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


export default SubtaskItem
