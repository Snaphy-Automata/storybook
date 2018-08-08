import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Icon, Input, Popup } from 'semantic-ui-react'
import map from 'lodash/map';
import {SortableContainer, SortableElement, arrayMove, SortableHandle,} from 'snaphy-react-sortable-dnd';


//Custom import..
import './TaskList.css';
import TeamCircleIcon from '../TeamCircleIcon'
import InputField from '../InputField';
import TaskHelper from './helper';
import Label from '../Label';
import AssignedUserDialog from '../AssignedUserDialog';
import ChangeDateDialog from '../ChangeDateDialog';

import { onOpenChangeDateDialogAction, onOpenAssignedUserDialogAction, onSelectDateAction, onDatePickerOpenedAction, getSelectedtaskItemAction, setCursorValueAction} from './TaskListActions';

const COMPLETED_TASK_COLOR_CODE = "#1ed0c1";

/**
 * Drag handle
 */
const DragHandle = SortableHandle(({}) => (
    <div  className="task-list-item-drag-icon-container">
        <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
        <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
    </div>
)); // This can be any component you want

const TaskItem = SortableElement(props => {
   
    const {
        task,
        taskData,
        memberObj,
        statusObj,
        labelObj,
        sectionId,
        onKeyPress,
        onBlur,
        isNew,
        isActiveTaskSection,
        isDateDialogOpened,
        isAssinedUserDialogOpened,
        isDatePickerOpened,
        style,
        isScrolling,
        isTaskSelected,
        index,
        style,
        cursor,
        taskLength,
        setCursorValueAction,
        position
    } = props;


    //console.log("task Item Getting called", props);


    const taskHelper = new TaskHelper(task, COMPLETED_TASK_COLOR_CODE, isActiveTaskSection);

    const isDelayed = taskHelper.isDelayed();
    const iconObj = taskHelper.getIcon(memberObj);
    const statusData = taskHelper.getStatus(statusObj);
    const duration = taskHelper.getDurationInText();
    const subTaskObj = taskHelper.getSubtaskStats();
    const attachmentObj = taskHelper.getAttachmentStats();
    const formattedDueDateObj = taskHelper.getFormattedDueDate();
    let delayedClassName;
    if(isActiveTaskSection){
        if(task.isCompleted){
            delayedClassName = `task-item-delayed-block completed`;
        }else{
            delayedClassName = isDelayed ? `task-item-delayed-block delayed` : `task-item-delayed-block`;
        }
    }else{
        delayedClassName = `task-item-delayed-block`;
    }
    
    
    const labelObjData = taskHelper.getLabels(labelObj);
    const labels = labelObjData.labelList;


    //FIXME: When selected add `selected` class.
    const taskItemContainerClassName = `task-list-item-container`;
  
    const openSelectDateDialog = () => {
        props.onOpenChangeDateDialogAction(!isDateDialogOpened, task.id);
    }

    const openAssignedUserDialog = () => {
        //console.log("I am getting called");
        props.onOpenAssignedUserDialogAction(!isAssinedUserDialogOpened, task.id)
    }

    const openDatePickerDialog = () => {
        props.onDatePickerOpenedAction(!isDatePickerOpened, task.id)
    }

    const onCloseDateDialog = () => {
        props.onOpenChangeDateDialogAction(false, task.id);
        
    }

    const onCloseAssignedUserDialog = () => {
        props.onOpenAssignedUserDialogAction(false, task.id)
    }

    const onCloseDatePickerDialog = () => {
        props.onDatePickerOpenedAction(false, task.id)
    }

    const onTaskClicked = () => {
        props.getSelectedtaskItemAction(task);
    }

    const getWrapperClassName = (cursor, position) => {
        let className = "task-list-item-wrapper"
        if(cursor === position){
            className = `${className} active`
        } 
       // console.log("Class Name getting called", className, position, cursor);
        // if(taskData){
        //     if(task.id === taskData.id){
        //         className = `${className} active`
        //     }
        // }
       
        return className;
    }

    const onHandleKeyDown = function(e){
       console.log("I am getting called", cursor, e.target.className.isVisible);
      // arrow up/down button should select next/previous list element
      //if([37,38,39,40].indexOf(e.keyCode) > -1){
        //e.preventDefault();

        if (e.keyCode === 38 && cursor > 0) {
            setCursorValueAction(cursor-1);
         // this.setState( prevState => ({
         //   cursor: prevState.cursor - 1
         // }))
       } else if (e.keyCode === 40 && cursor < taskLength - 1) {
          setCursorValueAction(cursor+1);
         // this.setState( prevState => ({
         //   cursor: prevState.cursor + 1
         // }))
       }
        // Do whatever else you want with the keydown event (i.e. your navigation).
      //}
      
    }

    return (
        <div style={style} className={getWrapperClassName(cursor, position)} tabIndex={position} >
            {!isNew &&  
                <div className="task-list-item-delayed-wrapper">
                    <div  className={taskItemContainerClassName} >
                        <div className={delayedClassName}></div>
                        <div className="task-list-item-side-bar-container">
                            {!isScrolling && <div  className={'task-list-item-side-line'}>
                                <DragHandle />
                            </div>
                            }
                            {!isScrolling &&
                            <div className={'task-list-item-icon'}>
                                {iconObj.title && <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={iconObj.thumbnailUrl} title={iconObj.title} tooltip={iconObj.tooltip} onClick={openAssignedUserDialog} isAssinedUserDialogOpened={isAssinedUserDialogOpened} onClose={onCloseAssignedUserDialog} task={task}/>}
                                {iconObj.icon && <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={iconObj.thumbnailUrl} icon={iconObj.icon} tooltip={iconObj.tooltip} onClick={openAssignedUserDialog} isAssinedUserDialogOpened={isAssinedUserDialogOpened} onClose={onCloseAssignedUserDialog} task={task}/>}
                            </div>}
                        </div>

                        <div className="task-list-item-title" onClick={onTaskClicked}>
                            <div className="task-list-item-title-item">{taskHelper.getTitle()}</div>
                        </div>
                        {
                            !isScrolling && 
                        <div className="task-list-item-other-container">
                            <div className="task-list-item-status-duration-container">
                                {isActiveTaskSection && statusData &&
                                    <div className="task-list-item-status" style={{ color: statusData.colorCode }}>{statusData.title}</div>

                                }
                                {!isActiveTaskSection && duration !== undefined &&
                                    // Add duration class..
                                    <div className="task-list-item-status">
                                        <Icon name="clock outline" style={{ display: "inline", margin: '0' }}></Icon>
                                        <span className="task-list-item-status-duration">{duration}</span>
                                    </div>
                                }
                            </div>


                            <div className="task-list-item-sub-task-attachment-container">
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
                            <div className="task-list-item-tags-container">
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
                                !formattedDueDateObj.date &&
                                <div className="task-list-item-date-default-container">
                                    <div style={{ position: "relative", top: "2px" }}>
                                        <TeamCircleIcon className="task-list-item-icon-team-circular" icon="calendar alternate outline" size="tiny" tooltip="Assign Due Date" isDatePickerOpened={isDatePickerOpened} isDatePicker onClick={openDatePickerDialog} onClose={onCloseDatePickerDialog} onDatePickerOpenedAction={props.onDatePickerOpenedAction} task={task}></TeamCircleIcon>
                                    </div>
                                </div>
                            }
                            {
                                formattedDueDateObj.date &&
                                <div className="task-list-item-date-container" style={{ color: formattedDueDateObj.colorCode }}>
                                    <Icon name="calendar minus outline" style={{ display: "inline" }}></Icon>
                                    {!isDateDialogOpened && <Popup trigger={<div style={{display:"inline"}}>{!isDateDialogOpened && <div className="task-list-item-date-item" style={{ color: formattedDueDateObj.colorCode }} onClick={openSelectDateDialog}>{formattedDueDateObj.date}</div>}</div>}
                                        content="Change Due Date"
                                        position='bottom center'
                                        inverted
                                        style={{ fontSize: '10px', paddingRight: "10px", paddingLeft: "10px", maxWidth: "200px", letterSpacing: "0.5px", wordBreak: "break-word", opacity:"0.8" }}
                                        size='mini'>

                                    </Popup>}
                                    <Popup trigger={
                                        <div style={{display:"inline"}}>
                                            {isDateDialogOpened && <div className="task-list-item-date-item" style={{ color: formattedDueDateObj.colorCode }} onClick={openSelectDateDialog}>{formattedDueDateObj.date}</div>}
                                        </div>
                                        }
                                        content={<ChangeDateDialog isTodaySelected={props.isTodaySelected} isTomorrowSelected={props.isTomorrowSelected} isNextWeekSelected={props.isNextWeekSelected} onSelectDateAction={onSelectDateAction} task={task} dateData ={formattedDueDateObj.date} isDateDialogOpened={isDateDialogOpened}/>}
                                        position='bottom center'
                                        on='click'
                                        open={isDateDialogOpened}
                                        onClose = {onCloseDateDialog}
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
                                <Field name="title" placeholder="Write Task" transparent autoFocus fluid className="task-list-item-new-task" component={InputField} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
});



function mapStateToProps(store, props){
    const taskListReducer = store.TaskListReducer;
    const taskConfig = taskListReducer[props.task.id]
    const isDateDialogOpened = taskConfig && taskConfig.isDateDialogOpened ? true : false;
    const isAssinedUserDialogOpened = taskConfig && taskConfig.isAssinedUserDialogOpened ? true : false;
    const isDatePickerOpened = taskConfig && taskConfig.isDatePickerOpened ? true : false;
    const isTodaySelected = taskConfig && taskConfig.isTodaySelected ? true : false;
    const isTomorrowSelected = taskConfig && taskConfig.isTomorrowSelected ? true : false;
    const isNextWeekSelected = taskConfig && taskConfig.isNextWeekSelected ? true : false;
    const isTaskSelected = taskConfig && taskConfig.isTaskSelected ? true : false;
    return {
        isTodaySelected,
        isTomorrowSelected,
        isNextWeekSelected,
        isDateDialogOpened,
        isAssinedUserDialogOpened,
        isDatePickerOpened,
        isTaskSelected,
        taskData : store.TaskListReducer.taskData,
        cursor: store.TaskListReducer.cursor || 0
    }
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    onOpenChangeDateDialogAction,
    onOpenAssignedUserDialogAction,
    onSelectDateAction,
    onDatePickerOpenedAction,
    getSelectedtaskItemAction,
    setCursorValueAction

};

const TaskItemForm = reduxForm({
    form: "taskForm",
    enableReinitialize: true
})(TaskItem)


export default connect(mapStateToProps, mapActionsToProps)(TaskItemForm);
