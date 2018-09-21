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

/**
 * Drag handle
 */
const DragHandle = SortableHandle(() => (
    <div className="task-list-item-drag-icon-container">
        <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
        <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
    </div>
)); // This can be any component you want

class TaskItem extends React.PureComponent {
    static lastTaskStyle = {};
    static taskItemContainerClassName = null;
    static delayedClassName = null;
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
        this.taskItemContainerClassName =  `task-list-item-container`;
        if (isActiveTaskSection) {
            if (task.isCompleted) {
                this.delayedClassName = `task-item-delayed-block completed`;
            } else {
                //this.delayedClassName = isDelayed ? `task-item-delayed-block delayed` : `task-item-delayed-block`;
            }
        } else {
            this.delayedClassName = `task-item-delayed-block`;
        }

        this.taskHelper = new TaskHelper(task, COMPLETED_TASK_COLOR_CODE, isActiveTaskSection);
        if (selectedTask && selectedTask.id === task.id) {
            this.iconObj = this.taskHelper.getSelectedIcon(selectedTask, findMemberById);
        } else if (!targetTaskId) {
            this.iconObj = this.taskHelper.getIcon(findMemberById);
        } else if (!selectedTask && targetTaskId && taskMemberList) {
            this.iconObj = this.taskHelper.getTargetTaskIcon(taskMemberList, findMemberById);

        }

        this.openAssignedUserDialog = this.openAssignedUserDialog.bind(this);
        this.onCloseAssignedUserDialog = this.onCloseAssignedUserDialog.bind(this);

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

    openAssignedUserDialog = () => {
        const {getTaskMembersAction, onOpenAssignedUserDialogAction, task} = this.props;
        getTaskMembersAction(task.id, task.assignedTo);
        //onOpenAssignedUserDialogAction(!isAssinedUserDialogOpened, task.id)
    }

    onCloseAssignedUserDialog = () => {
        const {getTaskMembersAction, onOpenAssignedUserDialogAction, task} = this.props;
        getTaskMembersAction(null, []);
        //onOpenAssignedUserDialogAction(false, task.id)
    }

    onWriteTask(){
        const {onAddNewtaskClicked, task, index} = this.props;
        onAddNewtaskClicked(index, task.sectionId);
    }

    onTitleBlur = (value) => {
        const {task, onTaskItemBlurEvent, index} = this.props;
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
        const {onTaskItemFocusEvent, task} = this.props;
        onTaskItemFocusEvent(task);

    }

    onEnterData = (key, value) => {
        const {task, onTaskItemBlurEvent, onEnterNextNewTask, index} = this.props;
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
            isCreate,
            isScrolling,
            selectedTask,
            task,
            itemTitleData,
            findMemberById,
            taskMemberList,
            onQuickUpdateTaskMembers,
            memberIdList,
            isAssinedUserDialogOpened,
            isLastTask,
            isAddNewTaskVisible,
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


        return (
            <div style={{ ...style, ...this.lastTaskStyle }} className={this.getWrapperClassName()}>
                {!isNew && !isCreate &&
                    <div className="task-list-item-delayed-wrapper">
                        <div className={this.taskItemContainerClassName} >
                            <div className={this.delayedClassName}></div>
                            <div className="task-list-item-side-bar-container">
                                {!isScrolling && <div className={'task-list-item-side-line'}>
                                    <DragHandle />
                                </div>
                                }
                                {!isScrolling &&
                                    <div className={'task-list-item-icon'}>
                                        {this.iconObj.title && <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={this.iconObj.thumbnailUrl} title={this.iconObj.title} tooltip={this.iconObj.tooltip} onClick={this.openAssignedUserDialog} isAssinedUserDialogOpened={isAssinedUserDialogOpened} onClose={this.onCloseAssignedUserDialog()} task={task} findMemberById={findMemberById} memberIdList={memberIdList} onQuickUpdateTaskMembers={onQuickUpdateTaskMembers} taskMemberList={taskMemberList} />}
                                        {this.iconObj.icon && <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={this.iconObj.thumbnailUrl} icon={this.iconObj.icon} tooltip={this.iconObj.tooltip} onClick={this.openAssignedUserDialog} isAssinedUserDialogOpened={isAssinedUserDialogOpened} onClose={this.onCloseAssignedUserDialog()} task={task} findMemberById={findMemberById} memberIdList={memberIdList} onQuickUpdateTaskMembers={onQuickUpdateTaskMembers} taskMemberList={taskMemberList} />}

                                    </div>}
                            </div>

                            <div className="task-list-item-title">
                                {!selectedTask && <div className="task-list-item-title-item">{this.taskHelper.getTitle()}</div>}
                                {selectedTask && selectedTask.id === task.id && <div className="task-list-item-title-item">{itemTitleData}</div>}
                                {selectedTask && selectedTask.id !== task.id && <div className="task-list-item-title-item">{this.taskHelper.getTitle()}</div>}
                            </div>
                            {/* {
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
                                        {
                                            !selectedTask && <div style={{ display: "inline-block", width: "60%" }}>
                                                {
                                                    subTaskObj &&
                                                    <div>
                                                        <Icon name="unordered list" style={{ display: "inline", margin: '0' }}></Icon>
                                                        <div className="task-list-item-sub-task-stats">{subTaskObj.completed}/{subTaskObj.total}</div>
                                                    </div>
                                                }

                                            </div>
                                        }
                                        {
                                            selectedTask && <div style={{ display: "inline-block", width: "60%" }}>
                                                {
                                                    subTaskObj &&
                                                    <div>
                                                        <Icon name="unordered list" style={{ display: "inline", margin: '0' }}></Icon>
                                                        <div className="task-list-item-sub-task-stats">{subTaskObj.completed}/{subTaskObj.total}</div>
                                                    </div>
                                                }

                                            </div>
                                        }


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
                                                <TeamCircleIcon className="task-list-item-icon-team-circular" icon="calendar alternate outline" size="tiny" tooltip="Assign Due Date" onDatePicked={onDatePicked} isDatePickerOpened={isDatePickerOpened} isDatePicker onClick={openDatePickerDialog} onClose={onCloseDatePickerDialog} onDatePickerOpenedAction={props.onDatePickerOpenedAction} task={task}></TeamCircleIcon>
                                            </div>
                                        </div>
                                    }
                                    {
                                        selectedTask && selectedTask.id === task.id && !selectedTaskDueDateObj.date &&
                                        <div className="task-list-item-date-default-container">
                                            <div style={{ position: "relative", top: "2px" }}>
                                                <TeamCircleIcon className="task-list-item-icon-team-circular" icon="calendar alternate outline" size="tiny" tooltip="Assign Due Date" onDatePicked={onDatePicked} isDatePickerOpened={isDatePickerOpened} isDatePicker onClick={openDatePickerDialog} onClose={onCloseDatePickerDialog} onDatePickerOpenedAction={props.onDatePickerOpenedAction} task={task}></TeamCircleIcon>
                                            </div>
                                        </div>
                                    }
                                    {
                                        !selectedTask && formattedDueDateObj.date &&
                                        <div className="task-list-item-date-container" style={{ color: formattedDueDateObj.colorCode }}>

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
                                                content={<ChangeDateDialog isTodaySelected={props.isTodaySelected} isTomorrowSelected={props.isTomorrowSelected} isNextWeekSelected={props.isNextWeekSelected} onSelectDateAction={onSelectDateAction} task={task} dateData={formattedDueDateObj.date} isDateDialogOpened={isDateDialogOpened} onCloseDateDialog={onCloseDateDialog} />}
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
                                                content={<ChangeDateDialog isTodaySelected={props.isTodaySelected} isTomorrowSelected={props.isTomorrowSelected} isNextWeekSelected={props.isNextWeekSelected} onSelectDateAction={onSelectDateAction} task={task} dateData={selectedTaskDueDateObj.date} isDateDialogOpened={isDateDialogOpened} onCloseDateDialog={onCloseDateDialog} />}
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
                            } Other Container div end */}
                        </div>
                    </div>

                }
                 {
                isLastTask && isAddNewTaskVisible && !isNew &&
                <div className="task-list-item-add-new-task-container" style={{ backgroundColor: "#fcfcfc" }} onClick={this.onWriteTask}>
                    <div className={this.taskItemContainerClassName} >
                        <div className={this.delayedClassName}></div>
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
                    <div className={this.taskItemContainerClassName} >
                        <div className={this.delayedClassName}></div>
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
    let itemTitleData = null;
    let statusObjData = null;
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
    const titleData = modelDataReducer.titleData;
    const draggedTaskOrSection = modelDataReducer.draggedTaskOrSection;
    const selectedTaskStatusData = modelDataReducer.selectedTaskStatusData;
    const taskMemberListObj = modelDataReducer.taskMemberListObj;

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
    let isActiveTaskSection = false;
    if (props.taskId) {
        const taskObj = allTaskObj.byId[props.taskId];
        if (taskObj.sectionId === props.activeSectionId) {
            isActiveTaskSection = true;
        }

    }
    let selectedTaskId = modelDataReducer.selectedTaskId;
    if (selectedTaskId === props.taskId) {
        selectedTask = allTaskObj.byId[selectedTaskId];
    }
    let task;
    if (props.taskId) {
        task = allTaskObj.byId[props.taskId];
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
        statusObjData,
        taskMemberList,
        targetTaskId,
        isActiveTaskSection,
        task
    }

}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    onOpenChangeDateDialogAction,
    onOpenAssignedUserDialogAction,
    onDatePickerOpenedAction,
    onQuickUpdateCurrentDateAction,
    getTaskMembersAction

};

const TaskItemForm = reduxForm({
    form: "taskForm",
    enableReinitialize: true
})(TaskItem)


export default connect(mapStateToProps, mapActionsToProps)(TaskItemForm);
