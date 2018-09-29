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

import { onOpenChangeDateDialogAction, onOpenAssignedUserDialogAction, onDatePickerOpenedAction, onQuickUpdateCurrentDateAction } from './TaskListActions';
import { getTaskMembersAction } from '../../baseComponents/GridView/components/ModelData/User/action';

const COMPLETED_TASK_COLOR_CODE = "#1ed0c1";

//Import Selectors..
import { getTaskData } from '../../baseComponents/GridView/components/ModelData/Task/selector'

/**
 * Drag handle
 */
const DragHandle = SortableHandle(() => (
    <div className="task-list-item-drag-icon-container">
        <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
        <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
    </div>
)); // This can be any component you want

class TaskItem extends React.Component {
    static lastTaskStyle = {};
    static taskItemContainerClassName = null;
   
    static taskHelper = null;
    static iconObj = null;
    constructor(props) {
        super(props);
        const { isLastTask, task, isActiveTaskSection, selectedTask, targetTaskId, taskMemberList, findMemberById } = props;
        if (isLastTask) {
            this.lastTaskStyle = {
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px"
            }
        }
        this.getWrapperClassName = this.getWrapperClassName.bind(this);
        this.taskItemContainerClassName = `task-list-item-container`;
       



        this.onWriteTask = this.onWriteTask.bind(this);

        this.onTitleBlur = this.onTitleBlur.bind(this);
        this.onTitleFocus = this.onTitleFocus.bind(this);
        this.onEnterData = this.onEnterData.bind(this);
    }

    getWrapperClassName() {
        const { className, selectedTask } = this.props;
        let wrapperClassName = className ? className + " task-list-item-wrapper" : "task-list-item-wrapper";
        if (selectedTask) {
            if (selectedTask.id === taskId) {
                wrapperClassName = `${wrapperClassName} active`
            }
        }

        return wrapperClassName;
    }


    onWriteTask() {
        const { onAddNewtaskClicked, task, index } = this.props;
        onAddNewtaskClicked(index, task.sectionId);
    }

    onTitleBlur = (value) => {
        const { task, onTaskItemBlurEvent, index } = this.props;
        if (value && value !== "") {
            task.title = value;
            let taskObj = { ...task };
            onTaskItemBlurEvent(taskId, taskObj, index, "add");
        } else {
            //Remove the empty data from alltaskIds..
            onTaskItemBlurEvent(taskId, null, index, "remove");
        }

    }

    onTitleFocus = () => {
        const { onTaskItemFocusEvent, task } = this.props;
        onTaskItemFocusEvent(task);

    }

    onEnterData = (key, value) => {
        const { task, onTaskItemBlurEvent, onEnterNextNewTask, index } = this.props;
        if (key === "Enter") {
            if (value && value !== "") {
                task.title = value;
                let taskObj = { ...task };
                onTaskItemBlurEvent(taskId, taskObj, index, "add");
                onEnterNextNewTask(index, task.sectionId);
            }
        }
    }








    render() {
        const {
            style,
            isNew,
            isScrolling,
            selectedTask,
            task,
            findMemberById,
            memberIdList,
            isEmpty,
            isActiveTaskSection,
            targetTaskId,
            taskMemberList,
            status,
            title,
            totalAttachments,
            totalSubTasks,
            completedSubTasks,
            labelObj,
            endDate,
            isDelayed,
            isCompleted,
            userObj,
            duration //to be fetch later..
        } = this.props;

        const getTitleFieldName = () => {
            let titleName;
            if (task) {
                if (task.id) {
                    titleName = `${task.id}.title_new`
                } else {
                    titleName = "title_new";
                }
            } else {
                titleName = "title_new";
            }

            return titleName;
        }

        const getDelayedClassName = () => {
            let delayedClassName = null;
            if (isActiveTaskSection) {
                if (isCompleted) {
                    delayedClassName = `task-item-delayed-block completed`;
                } else {
                    delayedClassName = isDelayed ? `task-item-delayed-block delayed` : `task-item-delayed-block`;
                }
            } else {
                delayedClassName = `task-item-delayed-block`;
            }

            return delayedClassName
    
        }

        console.log("On End Date", endDate);


        return (

            <div style={{ ...style, ...this.lastTaskStyle }} className={this.getWrapperClassName()}>
                {!isNew && !isEmpty &&
                    <div className="task-list-item-delayed-wrapper">
                        <div className={this.taskItemContainerClassName} >
                            <div className={getDelayedClassName()}></div>
                            {!isScrolling && <div className="task-list-item-side-bar-container">
                                <div className={'task-list-item-side-line'}>
                                    <DragHandle />
                                </div>


                                <div className={'task-list-item-icon'}>
                                    {userObj.title && <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={userObj.thumbnailUrl} title={userObj.title} tooltip={userObj.tooltip} task={task} findMemberById={findMemberById} memberIdList={memberIdList} />}
                                    {userObj.icon && <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={userObj.thumbnailUrl} icon={userObj.icon} tooltip={userObj.tooltip} task={task} findMemberById={findMemberById} memberIdList={memberIdList} />}

                                </div>
                            </div>}

                            <div className="task-list-item-title">
                                <div className="task-list-item-title-item">{title}</div>
                            </div>
                            {
                                !isScrolling &&
                                <div className="task-list-item-other-container">
                                    <div className="task-list-item-status-duration-container">
                                        {isActiveTaskSection && status &&
                                            <div className="task-list-item-status" style={{ color: status.colorCode }}>{status.title}</div>
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
                                                totalSubTasks &&
                                                <div>
                                                    <Icon name="unordered list" style={{ display: "inline", margin: '0' }}></Icon>
                                                    <div className="task-list-item-sub-task-stats">{completedSubTasks}/{totalSubTasks}</div>
                                                </div>
                                            }

                                        </div>


                                        <div style={{ display: "inline-block", width: "40%", textAlign: 'left' }}>
                                            {
                                                totalAttachments &&
                                                <div>
                                                    <Icon name="attach" style={{ display: "inline" }}></Icon>
                                                    <div className="task-list-item-attachment-stats">{totalAttachments}</div>
                                                </div>
                                            }

                                        </div>


                                    </div>
                                    <div className="task-list-item-tags-container">
                                        {
                                            labelObj && labelObj.labelList && 
                                            labelObj.labelList.length > 0 &&
                                            <div className="task-list-item-tag-item">
                                                <Label title={labelObj.labelList[0].title} color={labelObj.labelList[0].colorCode} tooltip={labelObj.labelList[0].title} style={{ float: 'left' }} />
                                                {labelObj.tooltip &&
                                                    <Label title="..." style={{ float: 'right' }} tooltip={labelObj.tooltip} />}
                                            </div>

                                        }
                                    </div>
                                    {
                                        !endDate &&
                                        <div className="task-list-item-date-default-container">
                                            <div style={{ position: "relative", top: "2px" }}>
                                                <TeamCircleIcon className="task-list-item-icon-team-circular" icon="calendar alternate outline" size="tiny" tooltip="Assign Due Date"></TeamCircleIcon>
                                            </div>
                                        </div>
                                    }
                                    {
                                        endDate &&
                                        <div className="task-list-item-date-container" style={{color : endDate.colorCode}}>
                                            <div className="task-list-item-date-item" style={{color : endDate.colorCode}}>{endDate.title}</div>

                                            {/* {!isDateDialogOpened && <Popup trigger={<div style={{ display: "inline" }}>{!isDateDialogOpened && <div className="task-list-item-date-item" style={{ color: formattedDueDateObj.colorCode }} onClick={openSelectDateDialog}>{formattedDueDateObj.date}</div>}</div>}
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
                                                content={<ChangeDateDialog isTodaySelected={props.isTodaySelected} isTomorrowSelected={props.isTomorrowSelected} isNextWeekSelected={props.isNextWeekSelected} onSelectDateAction={onSelectDateAction} task={task} dateData={formattedDueDateObj.date} isDateDialogOpened={isDateDialogOpened} onCloseDateDialog={onCloseDateDialog} />}
                                                position='bottom center'
                                                on='click'
                                                open={isDateDialogOpened}
                                                onClose={onCloseDateDialog}
                                                style={{ padding: "0", width: "157px", height: "120px" }}
                                                size='mini'>

                                            </Popup> */}


                                        </div>
                                    }

                                </div>
                            } {/* Other Container div end */}
                        </div>
                    </div>

                }
                {
                    isEmpty && !isScrolling &&
                    <div className="task-list-item-add-new-task-container" style={{ backgroundColor: "#fcfcfc" }} onClick={this.onWriteTask}>
                        <div className={this.taskItemContainerClassName} >
                            <div className={getDelayedClassName()}></div>
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
                    isNew && !isScrolling &&
                    <div className="task-list-item-delayed-wrapper">
                        <div className={this.taskItemContainerClassName} >
                            <div className={getDelayedClassName()}></div>
                            <div className="task-list-item-side-bar-container">
                                <div className={'task-list-item-side-line'}>
                                </div>
                                <div className={'task-list-item-icon'}>
                                </div>
                            </div>

                            <div className="task-list-item-new-task-title">
                                <div className="task-list-item-new-task-container">
                                    <Field name={getTitleFieldName()} placeholder="Write Task" transparent autoFocus fluid className="task-list-item-new-task" component={InputField} onBlurEvent={this.onTitleBlur()} onFocusEvent={this.onTitleFocus()} onKeyPressEvent={this.onEnterData()} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}


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
        let taskMemberList;
        let targetTaskId;
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
        const taskMemberListObj = modelDataReducer.taskMemberListObj;

        if (quickCurrentUpdateDate && quickCurrentUpdateDate.taskId === props.taskId) {
            isTodaySelected = quickCurrentUpdateDate.isTodaySelected;
            isTomorrowSelected = quickCurrentUpdateDate.isTomorrowSelected;
            isNextWeekSelected = quickCurrentUpdateDate.isNextWeekSelected;
        }

        if (taskMemberListObj && taskMemberListObj.taskId === props.taskId) {
            taskMemberList = taskMemberListObj.selectedTaskMemberList;
            targetTaskId = props.taskId;
        }



        const allTaskObj = store.ModelDataReducer.task;
        let selectedTaskId = modelDataReducer.selectedTaskId;
        if (selectedTaskId === props.taskId) {
            selectedTask = allTaskObj.byId[selectedTaskId];
        }
        let task;
        if (props.taskId) {
            task = allTaskObj.byId[props.taskId];
        }

        const {
            title,
            status,
            isActiveTask,
            totalSubTasks,
            completedSubTasks,
            endDate,
            labelObj,
            totalAttachments,
            isDelayed,
            isCompleted,
            userObj
        } = getTaskData(store, props)




        return {
            isTodaySelected,
            isTomorrowSelected,
            isNextWeekSelected,
            isDateDialogOpened,
            isAssinedUserDialogOpened,
            isDatePickerOpened,
            selectedTask,
            labelDialogFormDataInit: store.ModelDataReducer.labelDialogFormDataInit,
            taskMemberList,
            targetTaskId,
            task,
            isActiveTaskSection: isActiveTask,
            status,
            title,
            completedSubTasks,
            totalSubTasks,
            totalAttachments,
            endDate,
            isDelayed,
            labelObj,
            isCompleted,
            userObj

        }


}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    onOpenChangeDateDialogAction,
    onOpenAssignedUserDialogAction,
    onDatePickerOpenedAction,
    onQuickUpdateCurrentDateAction,
    getTaskMembersAction,

};


export default connect(mapStateToProps, mapActionsToProps)(TaskItem);
