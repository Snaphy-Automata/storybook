import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon, Button, Input } from 'semantic-ui-react'

import CustomCheckbox from '../CustomCheckbox'

const SubTask = ({title, isSelected, subTaskId, onSaveSubTask}) => {
    const onKeyPressEvent = (e) => {
      // console.log(" I magetting called");
        //e.preventDefault();
        if(e.key === "Enter"){
            if(e.target.value !== ""){
                onSaveSubTask(subTaskId, e.target.value);
                //Save the sub Task and add new task..
            }
        }
    }
    return(
        <div className="task-detail-subtask-container">
            <div className="task-detail-subtask-checkbox-container">
                <CustomCheckbox size='mini' isSelected={isSelected}></CustomCheckbox>
            </div>
            <div className="task-detail-subtask-data-container">
                {title === "" && <Input fluid autoFocus transparent defaultValue={title} onKeyPress={onKeyPressEvent}></Input>}
                {title !== "" && <Input fluid transparent defaultValue={title} onKeyPress={onKeyPressEvent}></Input>}
            </div>
            <div className="task-detail-subtask-delete-container">
                <Icon name="trash" style={{color: "#707070"}}></Icon>
            </div>
        </div>
    )
}

export default SubTask;