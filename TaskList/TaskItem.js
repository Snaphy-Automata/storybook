import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Icon, Input, Popup } from 'semantic-ui-react'
import { SortableHandle } from 'react-sortable-hoc';
import moment from 'moment';

//Custom import..
import './TaskList.css';
import TeamCircleIcon from '../TeamCircleIcon'
import InputField from '../ReduxForm/InputField';
import TaskHelper from './helper';
import Label from '../Label';
import ChangeDateDialog from '../ChangeDateDialog';

import { onOpenChangeDateDialogAction, onOpenAssignedUserDialogAction,  onDatePickerOpenedAction, onQuickUpdateCurrentDateAction } from './TaskListActions';
import { selectLimit } from 'async';

const COMPLETED_TASK_COLOR_CODE = "#1ed0c1";

/**
 * Drag handle
 */
const DragHandle = SortableHandle(() => (
    <div className="task-list-item-drag-icon-container">
        <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
        <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
    </div>
)); // This can be any component you want

const TaskItem = (props) => {

    const {
        task,
        memberObj,
        statusObj,
        labelObj,
        isNew,
        isActiveTaskSection,
        isDateDialogOpened,
        isAssinedUserDialogOpened,
        isDatePickerOpened,
        isScrolling,
        index,
        style,
        className,
        isLastTask,
        onTaskSelected,
        selectedTask,
        taskId,
        itemTitleData,
        onTaskItemBlurEvent,
        onTaskItemFocusEvent,
        onEnterNextNewTask,
        isCreate,
        onAddNewtaskClicked,
        isAddNewTaskVisible,
        statusObjData,
        findMemberById,
        findLabelById,
        onQuickUpdateCurrentDateAction,
        labelDialogFormDataInit,
        onQuickUpdateDate
    } = props;
    // if(selectedTask){
    //     console.log("Selected Task", selectedTask, isActiveTaskSection);
    // }

    //console.log("Status Obj Data", statusObj.byId);



    const taskHelper = new TaskHelper(task, COMPLETED_TASK_COLOR_CODE, isActiveTaskSection);

    const isDelayed = taskHelper.isDelayed();
    let iconObj = null;
    if(selectedTask && selectedTask.id === task.id){
        iconObj = taskHelper.getSelectedIcon(selectedTask, findMemberById);
    } else{
        iconObj = taskHelper.getIcon(findMemberById);
    }
  
    const statusData = taskHelper.getStatus(statusObj.byId);

    const duration = taskHelper.getDurationInText();
    const subTaskObj = taskHelper.getSubtaskStats();
    const attachmentObj = taskHelper.getAttachmentStats();
    const formattedDueDateObj = taskHelper.getFormattedDueDate();
    let selectedTaskDueDateObj = null;
    if (selectedTask && selectedTask.id === task.id) {
        selectedTaskDueDateObj = taskHelper.getSelectedTaskFormattedDate(selectedTask);
    }
    //console.log("Formatted Date Obj", formattedDueDateObj);
    let delayedClassName;
    if (isActiveTaskSection) {
        if (task.isCompleted) {
            delayedClassName = `task-item-delayed-block completed`;
        } else {
            delayedClassName = isDelayed ? `task-item-delayed-block delayed` : `task-item-delayed-block`;
        }
    } else {
        delayedClassName = `task-item-delayed-block`;
    }

    let labelObjData = null;
    if(selectedTask && selectedTask.id === task.id){
        labelObjData = taskHelper.getSelectedTaskLabels(selectedTask, findLabelById);
    } else{
        labelObjData = taskHelper.getLabels(findLabelById);
    }
    const labels = labelObjData.labelList;


    //FIXME: When selected add `selected` class.
    const taskItemContainerClassName = `task-list-item-container`;

  

    const openAssignedUserDialog = () => {
        //console.log("I am getting called");
        props.onOpenAssignedUserDialogAction(!isAssinedUserDialogOpened, task.id)
    }

    const openDatePickerDialog = (e) => {
        props.onDatePickerOpenedAction(!isDatePickerOpened, task.id)
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    const onCloseDateDialog = () => {
        props.onOpenChangeDateDialogAction(false, task.id);

    }

    const onCloseAssignedUserDialog = () => {
        console.log("Close Assigned getting called");
        props.onOpenAssignedUserDialogAction(false, task.id)
    }

    const onCloseDatePickerDialog = () => {
        props.onDatePickerOpenedAction(false, task.id)
    }



    const getWrapperClassName = () => {
        let wrapperClassName = className ? className + " task-list-item-wrapper" : "task-list-item-wrapper";
        if (selectedTask) {
            if (selectedTask.id === taskId) {
                wrapperClassName = `${wrapperClassName} active`
            }
        }

        return wrapperClassName;
    }

    let lastTaskStyle = {}
    if (isLastTask) {
        lastTaskStyle = {
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px"
        }
    }

    const onSelectItem = () => {
        onTaskSelected(task);

    }

    const getTitleFieldName = () => {
        let titleName;
        //console.log("Selected Task", task);
        if (task) {
            if (task.id) {
                titleName = `${task.id}.title_new`
            } else {
                titleName = "title_new";
            }
        } else {
            titleName = "title_new";
        }

        //console.log("New Item Field Name", titleName);

        return titleName;
    }

    const onTitleBlur = (value) => {
        if (value && value !== "") {
            task.title = value;
            let taskObj = { ...task };
            onTaskItemBlurEvent(taskId, taskObj, index, "add");
        } else {
            //Remove the empty data from alltaskIds..
            onTaskItemBlurEvent(taskId, null, index, "remove");
        }

    }

    const onTitleFocus = () => {
        //console.log("On Title Focus", task);
        onTaskItemFocusEvent(task);

    }

    const onEnterData = (key, value) => {
        if (key === "Enter") {
            if (value && value !== "") {
                task.title = value;
                let taskObj = { ...task };
                onTaskItemBlurEvent(taskId, taskObj, index, "add");
                onEnterNextNewTask(index, task.sectionId);
            }


            //console.log("Section Index", index);
        }
    }

    const onWriteTask = () => {
        onAddNewtaskClicked(index, task.sectionId);
    }

    const onSelectDateAction = (taskId, isTodaySelected, isTomorrowSelected, isNextWeekSelected) => {
        //console.log("Data prepare to be updated", taskId, isTodaySelected, isTomorrowSelected, isNextWeekSelected);
        //call task mutation to update the task item..
        let date = null;
        if(isTodaySelected){
            date = moment().toDate();
        } else if(isTomorrowSelected){
            date = moment().add(1, 'days').toDate();
        } else if(isNextWeekSelected){
            date = moment().add(1, 'weeks').startOf('isoWeek').add(6, 'hour').toDate();
        }
        if(date){
            onQuickUpdateDate(taskId, date, isTodaySelected, isTomorrowSelected, isNextWeekSelected);
        }
        
    }

    const openSelectDateDialog = (e) => {
       // console.log("Formatted Date", formattedDueDateObj.date);
        if(formattedDueDateObj.date === "today"){
            onQuickUpdateCurrentDateAction(task.id, true, false, false);
        } else if(formattedDueDateObj.date === "tomorrow"){
            onQuickUpdateCurrentDateAction(task.id, false, true, false);
        } else if(formattedDueDateObj.date === moment().add(1, 'weeks').startOf('isoWeek').format("DD MMM")){
            onQuickUpdateCurrentDateAction(task.id, false, false, true);
        }
        props.onOpenChangeDateDialogAction(!isDateDialogOpened, task.id);
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }


    //console.log("Task List props", props.task);


    return (
        <div style={{ ...style, ...lastTaskStyle }} className={getWrapperClassName()} >
            {!isNew && !isCreate &&
                <div className="task-list-item-delayed-wrapper">
                    <div className={taskItemContainerClassName} >
                        <div className={delayedClassName}></div>
                        <div className="task-list-item-side-bar-container">
                            {!isScrolling && <div className={'task-list-item-side-line'}>
                                <DragHandle />
                            </div>
                            }
                            {!isScrolling &&
                                <div className={'task-list-item-icon'}>
                                    {iconObj.title && <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={iconObj.thumbnailUrl} title={iconObj.title} tooltip={iconObj.tooltip} onClick={openAssignedUserDialog} isAssinedUserDialogOpened={isAssinedUserDialogOpened} onClose={onCloseAssignedUserDialog} task={task} />}
                                    {iconObj.icon && <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={iconObj.thumbnailUrl} icon={iconObj.icon} tooltip={iconObj.tooltip} onClick={openAssignedUserDialog} isAssinedUserDialogOpened={isAssinedUserDialogOpened} onClose={onCloseAssignedUserDialog} task={task} />}
                                </div>}
                        </div>

                        <div className="task-list-item-title" onClick={onSelectItem}>
                            {!selectedTask && <div className="task-list-item-title-item">{taskHelper.getTitle()}</div>}
                            {selectedTask && selectedTask.id === task.id && <div className="task-list-item-title-item">{itemTitleData}</div>}
                            {selectedTask && selectedTask.id !== task.id && <div className="task-list-item-title-item">{taskHelper.getTitle()}</div>}
                        </div>
                        {
                            !isScrolling &&
                            <div className="task-list-item-other-container">
                                <div className="task-list-item-status-duration-container" onClick={onSelectItem}>
                                    {isActiveTaskSection && statusData && !selectedTask &&
                                        <div className="task-list-item-status" style={{ color: statusData.colorCode }}>{statusData.title}</div>
                                    }
                                    {isActiveTaskSection && selectedTask && !statusObjData && statusData &&
                                        <div className="task-list-item-status" style={{ color: statusData.colorCode }}>{statusData.title}</div>
                                    }
                                    {isActiveTaskSection && selectedTask && statusObjData &&
                                        <div className="task-list-item-status" style={{ color: statusObjData.colorCode }}>{statusObjData.title}</div>
                                    }
                                    {!isActiveTaskSection && duration !== undefined &&
                                        // Add duration class..
                                        <div className="task-list-item-status">
                                            <Icon name="clock outline" style={{ display: "inline", margin: '0' }}></Icon>
                                            <span className="task-list-item-status-duration">{duration}</span>
                                        </div>
                                    }
                                </div>


                                <div className="task-list-item-sub-task-attachment-container" onClick={onSelectItem}>
                                    <div style={{ display: "inline-block", width: "60%" }}>
                                        {
                                            subTaskObj &&
                                            <div>
                                                <Icon name="unordered list" style={{ display: "inline", margin: '0' }}></Icon>
                                                <div className="task-list-item-sub-task-stats">{subTaskObj.completed}/{subTaskObj.total}</div>
                                            </div>
                                        }

                                    </div>

                                    <div style={{ display: "inline-block", width: "40%", textAlign: 'left' }}>
                                        {
                                            attachmentObj &&
                                            <div>
                                                <Icon name="attach" style={{ display: "inline" }}></Icon>
                                                <div className="task-list-item-attachment-stats">{attachmentObj.total}</div>
                                            </div>
                                        }

                                    </div>


                                </div>
                                <div className="task-list-item-tags-container" onClick={onSelectItem}>
                                    {
                                        labels &&
                                        labels.length > 0 &&
                                        <div className="task-list-item-tag-item">
                                            <Label title={labels[0].title} color={labels[0].colorCode} tooltip={labels[0].title} style={{ float: 'left' }} />
                                            {labels.length > 1 &&
                                                <Label title="..." style={{ float: 'right' }} tooltip={labelObjData.tooltip} />}
                                        </div>

                                    }
                                </div>
                                {
                                    !selectedTask && !formattedDueDateObj.date &&
                                    <div className="task-list-item-date-default-container">
                                        <div style={{ position: "relative", top: "2px" }}>
                                            <TeamCircleIcon className="task-list-item-icon-team-circular" icon="calendar alternate outline" size="tiny" tooltip="Assign Due Date" isDatePickerOpened={isDatePickerOpened} isDatePicker onClick={openDatePickerDialog} onClose={onCloseDatePickerDialog} onDatePickerOpenedAction={props.onDatePickerOpenedAction} task={task}></TeamCircleIcon>
                                        </div>
                                    </div>
                                }
                                {
                                    selectedTask && selectedTask.id === task.id && !selectedTaskDueDateObj.date &&
                                    <div className="task-list-item-date-default-container">
                                        <div style={{ position: "relative", top: "2px" }}>
                                            <TeamCircleIcon className="task-list-item-icon-team-circular" icon="calendar alternate outline" size="tiny" tooltip="Assign Due Date" isDatePickerOpened={isDatePickerOpened} isDatePicker onClick={openDatePickerDialog} onClose={onCloseDatePickerDialog} onDatePickerOpenedAction={props.onDatePickerOpenedAction} task={task}></TeamCircleIcon>
                                        </div>
                                    </div>
                                }
                                {
                                    !selectedTask && formattedDueDateObj.date &&
                                    <div className="task-list-item-date-container" style={{ color: formattedDueDateObj.colorCode }}>
                                        {/* <Icon name="calendar minus outline" style={{ display: "inline" }}></Icon> */}
                                        {!isDateDialogOpened && <Popup trigger={<div style={{ display: "inline" }}>{!isDateDialogOpened && <div className="task-list-item-date-item" style={{ color: formattedDueDateObj.colorCode }} onClick={openSelectDateDialog}>{formattedDueDateObj.date}</div>}</div>}
                                            content="Change Due Date"
                                            position='bottom center'
                                            inverted
                                            style={{ fontSize: '10px', paddingRight: "10px", paddingLeft: "10px", maxWidth: "200px", letterSpacing: "0.5px", wordBreak: "break-word", opacity: "0.8" }}
                                            size='mini'>

                                        </Popup>}
                                        <Popup trigger={
                                            <div style={{ display: "inline" }}>
                                                {isDateDialogOpened && <div className="task-list-item-date-item" style={{ color: formattedDueDateObj.colorCode }} onClick={openSelectDateDialog}>{formattedDueDateObj.date}</div>}
                                            </div>
                                        }
                                            content={<ChangeDateDialog isTodaySelected={props.isTodaySelected} isTomorrowSelected={props.isTomorrowSelected} isNextWeekSelected={props.isNextWeekSelected} onSelectDateAction={onSelectDateAction} task={task} dateData={formattedDueDateObj.date} isDateDialogOpened={isDateDialogOpened} onCloseDateDialog={onCloseDateDialog}/>}
                                            position='bottom center'
                                            on='click'
                                            open={isDateDialogOpened}
                                            onClose={onCloseDateDialog}
                                            style={{ padding: "0", width: "157px", height: "120px" }}
                                            size='mini'>

                                        </Popup>


                                    </div>
                                }
                                {
                                    selectedTask && selectedTask.id === task.id && selectedTaskDueDateObj.date && 
                                    <div className="task-list-item-date-container" style={{ color: selectedTaskDueDateObj.colorCode }}>
                                        {/* <Icon name="calendar minus outline" style={{ display: "inline" }}></Icon> */}
                                        {!isDateDialogOpened && <Popup trigger={<div style={{ display: "inline" }}>{!isDateDialogOpened && <div className="task-list-item-date-item" style={{ color: selectedTaskDueDateObj.colorCode }} onClick={openSelectDateDialog}>{selectedTaskDueDateObj.date}</div>}</div>}
                                            content="Change Due Date"
                                            position='bottom center'
                                            inverted
                                            style={{ fontSize: '10px', paddingRight: "10px", paddingLeft: "10px", maxWidth: "200px", letterSpacing: "0.5px", wordBreak: "break-word", opacity: "0.8" }}
                                            size='mini'>

                                        </Popup>}
                                        <Popup trigger={
                                            <div style={{ display: "inline" }}>
                                                {isDateDialogOpened && <div className="task-list-item-date-item" style={{ color: selectedTaskDueDateObj.colorCode }} onClick={openSelectDateDialog}>{selectedTaskDueDateObj.date}</div>}
                                            </div>
                                        }
                                            content={<ChangeDateDialog isTodaySelected={props.isTodaySelected} isTomorrowSelected={props.isTomorrowSelected} isNextWeekSelected={props.isNextWeekSelected} onSelectDateAction={onSelectDateAction} task={task} dateData={selectedTaskDueDateObj.date} isDateDialogOpened={isDateDialogOpened}  onCloseDateDialog={onCloseDateDialog}/>}
                                            position='bottom center'
                                            on='click'
                                            open={isDateDialogOpened}
                                            onClose={onCloseDateDialog}
                                            style={{ padding: "0", width: "157px", height: "120px" }}
                                            size='mini'>

                                        </Popup>


                                    </div>
                                }

                            </div>
                        } {/*Other Container div end */}
                    </div>
                </div>

            }
            {
                isLastTask && isAddNewTaskVisible && !isNew &&
                <div className="task-list-item-add-new-task-container" style={{ backgroundColor: "#fcfcfc" }} onClick={onWriteTask}>
                    <div className={taskItemContainerClassName} >
                        <div className={delayedClassName}></div>
                        <div className="task-list-item-side-bar-container">
                            <div className={'task-list-item-side-line'}>
                            </div>
                            <div className={'task-list-add-item-icon'}>
                                <Icon size="small" name="add"></Icon>
                            </div>
                        </div>

                        <div className="task-list-item-new-task-title" style={{ color: "#9e9e9e", paddingLeft: "2px" }}>
                            Add New Task
                        </div>
                    </div>
                </div>
            }
            {
                isNew &&
                <div className="task-list-item-delayed-wrapper">
                    <div className={taskItemContainerClassName} >
                        <div className={delayedClassName}></div>
                        <div className="task-list-item-side-bar-container">
                            <div className={'task-list-item-side-line'}>
                            </div>
                            <div className={'task-list-item-icon'}>
                            </div>
                        </div>

                        <div className="task-list-item-new-task-title">
                            <div className="task-list-item-new-task-container">
                                <Field name={getTitleFieldName()} placeholder="Write Task" transparent autoFocus fluid className="task-list-item-new-task" component={InputField} onBlurEvent={onTitleBlur} onFocusEvent={onTitleFocus} onKeyPressEvent={onEnterData} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};



function mapStateToProps(store, props) {
    const taskListReducer = store.TaskListReducer;
    const dateDialog = taskListReducer.dateDialog;
    const assignedUserDialog = taskListReducer.assignedUserDialog;
    const datePickerDialog = taskListReducer.datePickerDialog;
    const quickCurrentUpdateDate = taskListReducer.quickCurrentUpdateDate;
    let isAssinedUserDialogOpened = false;
    let isDateDialogOpened = false;
    let isDatePickerOpened = false;
    let isTodaySelected = false;
    let isTomorrowSelected = false;
    let isNextWeekSelected = false;
    let selectedTask = null;
    let itemTitleData = null;
    let statusObjData = null;
    if (assignedUserDialog && assignedUserDialog.taskId === props.taskId) {
        isAssinedUserDialogOpened = true;
    }
    if (dateDialog && dateDialog.taskId === props.taskId) {
        isDateDialogOpened = true;
    }
    if (datePickerDialog && datePickerDialog.taskId === props.taskId) {
        isDatePickerOpened = true;
    }
    const modelDataReducer = store.ModelDataReducer;
    const titleData = modelDataReducer.titleData;
    const draggedTaskOrSection = modelDataReducer.draggedTaskOrSection;
    const selectedTaskStatusData = modelDataReducer.selectedTaskStatusData;
    selectedTask = modelDataReducer.selectedTask;
    if (selectedTask) {
        if (selectedTask.id !== props.taskId) {
            selectedTask = null;
        }
    }

    if (titleData) {
        if (props.taskId) {
            if (titleData.taskId && titleData.taskId !== props.taskId) {
                itemTitleData = null;
            } else {
                itemTitleData = titleData.title;
            }
        }

    }

    if (draggedTaskOrSection && draggedTaskOrSection.taskId === props.taskId) {
        isAddTaskVisisble = draggedTaskOrSection.isAddTaskVisisble;
    }
    if (selectedTaskStatusData && selectedTaskStatusData.taskId === props.taskId && selectedTaskStatusData.data) {
        statusObjData = selectedTaskStatusData.data;
    }

    if(quickCurrentUpdateDate && quickCurrentUpdateDate.taskId === props.taskId){
        isTodaySelected = quickCurrentUpdateDate.isTodaySelected;
        isTomorrowSelected = quickCurrentUpdateDate.isTomorrowSelected;
        isNextWeekSelected = quickCurrentUpdateDate.isNextWeekSelected;
    }




    return {
        isTodaySelected,
        isTomorrowSelected,
        isNextWeekSelected,
        isDateDialogOpened,
        isAssinedUserDialogOpened,
        isDatePickerOpened,
        selectedTask,
        itemTitleData,
        isAddNewTaskVisible: store.ModelDataReducer.isAddNewTaskVisible,
        labelDialogFormDataInit: store.ModelDataReducer.labelDialogFormDataInit,
        statusObjData
    }


    //const isAssinedUserDialogOpened = taskConfig && taskConfig.isAssinedUserDialogOpened ? true : false;
    // const isTodaySelected = taskConfig && taskConfig.isTodaySelected ? true : false;
    // const isTomorrowSelected = taskConfig && taskConfig.isTomorrowSelected ? true : false;
    // const isNextWeekSelected = taskConfig && taskConfig.isNextWeekSelected ? true : false;

}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    onOpenChangeDateDialogAction,
    onOpenAssignedUserDialogAction,
    onDatePickerOpenedAction,
    onQuickUpdateCurrentDateAction

};

const TaskItemForm = reduxForm({
    form: "taskForm",
    enableReinitialize: true
})(TaskItem)


export default connect(mapStateToProps, mapActionsToProps)(TaskItemForm);
