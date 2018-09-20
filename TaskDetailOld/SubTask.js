import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Button, Input } from 'semantic-ui-react'

import CustomCheckbox from '../CustomCheckbox'
import PopupField from '../PopupField';

//Import Actions..
import { onSubTaskTitleEditAction, onSubTaskDeleteClickedAction } from '../../baseComponents/GridView/components/ModelData/SubTask/action';

const SubTask = (props) => {
    const {
        title,
        isSelected,
        subTaskId,
        onSaveSubTask,
        onSubTaskStateChanged,
        indexValue,
        onRemoveSubTask,
        isEditable,
        isDialogOpened
    } = props;
    const onKeyPressEvent = (e) => {
        if (e.key === "Enter") {
            if (e.target.value !== "" && title !== e.target.value) {
                //console.log("Save SubTask getting called", e.target.value);
                onSaveSubTask(subTaskId, e.target.value, "enter");
                //Save the sub Task and add new task..
            }
        }
    }

    const onBlurEvent = (e) => {
        //e.preventDefault();
        if (e.target.value !== "" && title !== e.target.value) {
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
        props.onSubTaskDeleteClickedAction(subTaskId, false);
    }

    const onSubTaskDeleteDialogStateChanged  = (isDialogOpened) => {
        props.onSubTaskDeleteClickedAction(subTaskId, isDialogOpened);
    }

    const onOpenDeleteSubTaskDialog = () => {
        props.onSubTaskDeleteClickedAction(subTaskId, true);
    }

    const getDeleteContainerClassName = () => {
        let className = "task-detail-subtask-delete-container"
        if(isDialogOpened){
            className = `${className} task-detail-show-sub-task-delete-dialog`;
        }

        return className;
    }


    return (
        <div className="task-detail-subtask-container">
            <div className="task-detail-subtask-checkbox-container">
                <CustomCheckbox size='mini' isSelected={isSelected} onItemClicked={onSubTaskClicked}></CustomCheckbox>
            </div>
            <div className="task-detail-subtask-data-container">
                <div className="task-detail-subtask-title-container">
                    {/* <Input fluid autoFocus transparent defaultValue={title} onKeyPress={onKeyPressEvent} onBlur={onBlurEvent}></Input> */}
                    {title === "" && <Input fluid autoFocus transparent defaultValue={title} onKeyPress={onKeyPressEvent} onBlur={onBlurEvent}></Input>}
                    {isEditable && title !== "" && <Input fluid autoFocus transparent defaultValue={title} onKeyPress={onKeyPressEvent} onBlur={onBlurEvent}></Input>}
                    {!isEditable && title !== "" && <div onClick={onSubTaskTitleEditable}>{title}</div>}
                </div>
                <PopupField
                    triggerComponent={<div className={getDeleteContainerClassName()} onClick={onOpenDeleteSubTaskDialog}>

                        <Icon name="ellipsis horizontal" style={{ color: "#707070" }}></Icon>
                    </div>}
                    contentComponent={<div style={{cursor:"pointer"}}onClick={onRemoveSubTaskClicked}>Delete</div>}
                    isDialogOpened = {isDialogOpened}
                    position="bottom right"
                    onDialogStateChange={onSubTaskDeleteDialogStateChanged} />

            </div>
        </div>
    )
}

function mapStateToProps(store, props) {

    const subTaskTitleEdit = store.ModelDataReducer.subTaskTitleEdit;
    let isEditable = false;
    if (props.subTaskId === subTaskTitleEdit.subTaskId) {
        isEditable = true;
    }
    const subTaskDeleteDialog = store.ModelDataReducer.subTaskDeleteDialog;
    let isDialogOpened = false;
    if(props.subTaskId === subTaskDeleteDialog.subTaskId){
        isDialogOpened = true;
    }
    return {
        isEditable,
        isDialogOpened
    }
}

const mapActionsToProps = {
    onSubTaskTitleEditAction,
    onSubTaskDeleteClickedAction
}

export default connect(mapStateToProps, mapActionsToProps)(SubTask);
