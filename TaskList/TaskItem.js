import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Icon, Input, Popup } from 'semantic-ui-react'
import map from 'lodash/map';

//Custom import..
import './TaskList.css';
import TeamCircleIcon from '../TeamCircleIcon'
import InputField from '../InputField';
import TaskHelper from './helper';
import Label from '../Label';
import AssignedUserDialog from '../AssignedUserDialog';
import ChangeDateDialog from '../ChangeDateDialog';

import { onOpenChangeDateDialogAction, onOpenAssignedUserDialogAction } from './TaskListActions';

const TaskItem = (props) => {

    const {
        task,
        memberObj,
        statusObj,
        labelObj,
        sectionId,
        onKeyPress,
        onBlur,
        isNew,
        isActiveTaskSection,
    } = props;



    const taskHelper = new TaskHelper(task);

    const isDelayed = taskHelper.isDelayed();
    const iconObj = taskHelper.getIcon(memberObj);
    const statusData = taskHelper.getStatus(statusObj);
    const duration = taskHelper.getDurationInText();
    const subTaskObj = taskHelper.getSubtaskStats();
    const attachmentObj = taskHelper.getAttachmentStats();
    const formattedDueDateObj = taskHelper.getFormattedDueDate();
    const delayedClassName = isDelayed ? `task-item-delayed-block delayed` : `task-item-delayed-block`;
    const labelObjData = taskHelper.getLabels(labelObj);
    const labels = labelObjData.labelList;

    const taskConfig = props.taskListReducer[task.id];
    const isDateDialogOpened = taskConfig && taskConfig.isDateDialogOpened ? true : false;
    const isAssinedUserDialogOpened = taskConfig && taskConfig.isAssinedUserDialogOpened ? true : false;


    //FIXME: When selected add `selected` class.
    const taskItemContainerClassName = `task-list-item-container`;
    const openDialog = () => {
        return true;
    }

    const openSelectDateDialog = () => {
        props.onOpenChangeDateDialogAction(!isDateDialogOpened, task.id);
    }

    const openAssignedUserDialog = () => {
        //console.log("I am getting called");
        props.onOpenAssignedUserDialogAction(!isAssinedUserDialogOpened, task.id)
    }

    const onCloseDateDialog = () => {
        props.onOpenChangeDateDialogAction(false, task.id);
        
    }

    const onCloseAssignedUserDialog = () => {
        props.onOpenAssignedUserDialogAction(false, task.id)
    }

    //console.log("Props For assigned", props.taskListReducer, task);



    return (
        <div className="task-list-item-wrapper">
            {!isNew &&
                <div className="task-list-item-delayed-wrapper">
                    <div className={taskItemContainerClassName} >
                        <div className={delayedClassName}></div>
                        <div className="task-list-item-side-bar-container">
                            <div className={'task-list-item-side-line'}>
                                <div className="task-list-item-drag-icon-container">
                                    <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
                                    <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
                                </div>
                            </div>
                            <div className={'task-list-item-icon'}>
                                {iconObj.title && <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={iconObj.thumbnailUrl} title={iconObj.title} tooltip={iconObj.tooltip} onClick={openAssignedUserDialog} isAssinedUserDialogOpened={isAssinedUserDialogOpened} onClose={onCloseAssignedUserDialog}/>}
                                {iconObj.icon && <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={iconObj.thumbnailUrl} icon={iconObj.icon} tooltip={iconObj.tooltip} onClick={openAssignedUserDialog} isAssinedUserDialogOpened={isAssinedUserDialogOpened} onClose={onCloseAssignedUserDialog}/>}
                            </div>
                        </div>

                        <div className="task-list-item-title">
                            <div className="task-list-item-title-item">{taskHelper.getTitle()}</div>
                        </div>
                        <div className="task-list-item-other-container">
                            <div className="task-list-item-status-duration-container">
                                {isActiveTaskSection && statusData &&
                                    <div className="task-list-item-status" style={{ color: statusData.colorCode }}>{statusData.title}</div>

                                }
                                {!isActiveTaskSection && duration !== undefined &&
                                    // Add duration class..
                                    <div className="task-list-item-status">{duration}</div>
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
                                        <Label title={labels[0].title} color={labels[0].colorCode} style={{ float: 'left' }} />
                                        {labels.length > 1 &&
                                            <Label title="..." style={{ float: 'right' }} tooltip={labelObjData.tooltip} />}
                                    </div>

                                }
                            </div>
                            {
                                !formattedDueDateObj.date &&
                                <div className="task-list-item-date-default-container">
                                    <div style={{ position: "relative", top: "2px" }}>
                                        <TeamCircleIcon className="task-list-item-icon-team-circular" icon="calendar alternate outline" size="tiny" tooltip="Assign Due Date"></TeamCircleIcon>
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
                                        content={<ChangeDateDialog />}
                                        position='bottom center'
                                        on='click'
                                        open={isDateDialogOpened}
                                        onClose = {onCloseDateDialog}
                                        style={{ padding: "0", width: "157px", height: "120px" }}
                                        size='mini'>

                                    </Popup>


                                </div>
                            }

                        </div> {/*Other Container div end*/}
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
    )

}

// Retrieve data from store as props
function mapStateToProps(store) {
    const taskListReducer = store.TaskListReducer;
    return {
        taskListReducer
    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    onOpenChangeDateDialogAction,
    onOpenAssignedUserDialogAction
};

const TaskItemForm = reduxForm({
    form: "taskForm",
    enableReinitialize: true
})(TaskItem)

export default connect(mapStateToProps, mapActionsToProps)(TaskItemForm);
