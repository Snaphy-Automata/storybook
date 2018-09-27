/**
 * Created by Robins Gupta
 * 27th Sept 2018
 */

import React, {PureComponent}  from 'react';
import PropTypes               from 'prop-types';
import { Field }               from 'redux-form';

//Style.
import "./SubtaskItem.css"

//Custom import..
import InputElement     from '../ReduxForm/InputElement';
import SnaphyForm       from '../ReduxForm/SnaphyForm'
import CustomCheckbox   from '../CustomCheckbox'

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
    this.onDataChanged = this._onDataChanged.bind(this)
  }


  _onSubtaskCompletedBtnClick(event){

  }

  _onDataChanged(event){

  }

  render(){
    const {
      isSelected,
      placeholder,
      size,
      rows,
      label,

    } = this.props
    return (

      <div className="task-detail-subtask-item-container">
          <div className="task-detail-subtask-title-completed-container">
            <CustomCheckbox className="task-detail-custom-checkbox" size='mini' isSelected={isSelected} onItemClicked={this.onSubtaskCompletedBtnClick}></CustomCheckbox>
          </div>
          <div className="task-detail-subtask-item-input-container">
          <SnaphyForm>
              <Field className="task-detail-subtask-title-input" name="subtask" type="text" placeholder={placeholder} size={size} rows={rows} label={label} component={InputElement} ></Field>
          </SnaphyForm>
          </div>
      </div>
    )
  }

}


export default SubtaskItem
