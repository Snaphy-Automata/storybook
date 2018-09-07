import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon, Button, Input } from 'semantic-ui-react'

import CustomCheckbox from '../CustomCheckbox'

//Import Actions..
import {onSubTaskTitleEditAction} from '../../baseComponents/GridView/components/ModelData/ModelDataActions';

const SubTask = (props) => {
    const {title, isSelected, subTaskId, onSaveSubTask, onSubTaskStateChanged, indexValue, onRemoveSubTask, isEditable} = props;
    const onKeyPressEvent = (e) => {
        if(e.key === "Enter"){
            if(e.target.value !== "" && title!== e.target.value){
                //console.log("Save SubTask getting called", e.target.value);
                onSaveSubTask(subTaskId, e.target.value, "enter");
                //Save the sub Task and add new task..
            }
        }
    }

    const onBlurEvent = (e) => {
        //e.preventDefault();
        if(e.target.value !== "" && title !== e.target.value){
            onSaveSubTask(subTaskId, e.target.value, "blur");
        }
    }

    //console.log("Title", title);

    const onSubTaskClicked = () => {
       // console.log("On Sub Task Clicked getting called", subTaskId, isSelected);
        onSubTaskStateChanged(subTaskId, !isSelected, indexValue);
    }

    const onSubTaskTitleEditable = () => {
        props.onSubTaskTitleEditAction(subTaskId, true);
    }

    const onRemoveSubTaskClicked = () => {
        onRemoveSubTask(subTaskId, isSelected, indexValue);
    }


    return(
        <div className="task-detail-subtask-container">
            <div className="task-detail-subtask-checkbox-container">
                <CustomCheckbox size='mini' isSelected={isSelected} onItemClicked={onSubTaskClicked}></CustomCheckbox>
            </div>
            <div className="task-detail-subtask-data-container">
            {/* <Input fluid autoFocus transparent defaultValue={title} onKeyPress={onKeyPressEvent} onBlur={onBlurEvent}></Input> */}
                {title === "" && <Input fluid autoFocus transparent defaultValue={title} onKeyPress={onKeyPressEvent} onBlur={onBlurEvent}></Input>}
                {isEditable && title !== "" && <Input fluid autoFocus transparent defaultValue={title} onKeyPress={onKeyPressEvent} onBlur={onBlurEvent}></Input>}
                {!isEditable && title!=="" && <div onClick={onSubTaskTitleEditable}>{title}</div>}
            </div>
            <div className="task-detail-subtask-delete-container" onClick={onRemoveSubTaskClicked}>
                <Icon name="trash" style={{color: "#707070"}}></Icon>
            </div>
        </div>
    )
}

function mapStateToProps(store, props){

    const subTaskTitleEdit= store.ModelDataReducer.subTaskTitleEdit;
    let isEditable = false;
    if(props.subTaskId === subTaskTitleEdit.subTaskId){
        isEditable = true;
    }
    return {
       isEditable
    }
}

const mapActionsToProps = {
    onSubTaskTitleEditAction
}

export default connect(mapStateToProps, mapActionsToProps)(SubTask);