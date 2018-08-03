import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, Popup } from 'redux-form'
import { Icon, Input } from 'semantic-ui-react'
import map from 'lodash/map';

//Custom import..
import './TaskList.css';
import TeamCircleIcon from '../TeamCircleIcon'
import InputField from '../InputField';
import TaskHelper from './helper';
import Label from '../Label';

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

    console.log("Tooltip", labels);


    //FIXME: When selected add `selected` class.
    const taskItemContainerClassName = `task-list-item-container`;
    console.log("Task Data", task);
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
                                {iconObj.title &&
                                    <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={iconObj.thumbnailUrl} title={iconObj.title} tooltip={iconObj.tooltip} />}
                                {iconObj.icon && <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={iconObj.thumbnailUrl} icon={iconObj.icon} tooltip={iconObj.tooltip} />}
                            </div>
                        </div>

                        <div className="task-list-item-title">
                            <div className="task-list-item-title-item">{taskHelper.getTitle()}</div>
                        </div>
                        <div className="task-list-item-other-container">
                            <div className="task-list-item-status-duration-container">
                                {isActiveTaskSection &&
                                    <div className="task-list-item-status" style={{ color: statusData.colorCode }}>{statusData.title}</div>

                                }
                                {!isActiveTaskSection &&
                                    // Add duration class..
                                    <div className="task-list-item-status">{duration}</div>
                                }
                            </div>


                            <div className="task-list-item-sub-task-attachment-container">
                                <div style={{ display: "inline-block", width: "60%"}}>
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
                                    labels.length &&
                                    <div className="task-list-item-tag-item">
                                        <Label title={labels[0].title} color={labels[0].colorCode} style={{ float: 'left' }} />
                                        {labels.length > 1 && 
                                        <Label title="..." style={{ float: 'right', marginRight: '10px' }} tooltip={labelObjData.tooltip}/>}
                                    </div>

                                }
                            </div>
                            {/* <div className="task-list-item-date-container">
                                <Icon name="calendar alternate outline" circular/>

                            </div> */}
                            <div className="task-list-item-date-container" style={{ color: formattedDueDateObj.colorCode }}>
                                
                                <Icon name="calendar minus outline" style={{ display: "inline" }}></Icon>
                                <div className="task-list-item-date-item" style={{color: formattedDueDateObj.colorCode }}>{formattedDueDateObj.date}</div>
                            </div>
                        </div> {/*Other Container div end*/}
                    </div>
                </div>
            }
            {
                isNew &&
                <div>
                    Implement new task here..
                </div>
            }
        </div>
    )

}

const TaskItemForm = reduxForm({
    form: "taskForm",
    enableReinitialize: true
})(TaskItem)

export default TaskItemForm;
