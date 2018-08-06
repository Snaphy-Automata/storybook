import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Icon, Input, Popup  } from 'semantic-ui-react'
import map from 'lodash/map';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//Custom import..
import './TaskList.css';
import TeamCircleIcon from '../TeamCircleIcon'
import InputField from '../InputField';
import TaskHelper from './helper';
import Label from '../Label';
import AssignedUserDialog from '../AssignedUserDialog';

const COMPLETED_TASK_COLOR_CODE = "#1ed0c1";

/**
 * Drag handle
 */
const DragHandle = ({provided}) => (
    <div  className="task-list-item-drag-icon-container">
        <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
        <Icon className="task-list-item-drag-icon" name="ellipsis vertical"></Icon>
    </div>
); // This can be any component you want

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
        index,
    } = props;


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
    return (
        <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided, snapshot) => (
            <div  className="task-list-item-wrapper">
                {!isNew &&  
                    <div  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task-list-item-delayed-wrapper">
                        <div  className={taskItemContainerClassName} >
                            <div className={delayedClassName}></div>
                            <div className="task-list-item-side-bar-container">
                                <div className={'task-list-item-side-line'}>
                                    <DragHandle provided={provided} />
                                </div>
                                <div className={'task-list-item-icon'}>
                                    {iconObj.title && <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={iconObj.thumbnailUrl} title={iconObj.title} tooltip={iconObj.tooltip} />}
                                    {iconObj.icon &&  <TeamCircleIcon className="task-list-item-icon-team-circular" size="mini" src={iconObj.thumbnailUrl} icon={iconObj.icon} tooltip={iconObj.tooltip} />}
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
                                            <TeamCircleIcon className="task-list-item-icon-team-circular" icon="calendar alternate outline" size="tiny" tooltip="Assign Due Date"></TeamCircleIcon>
                                        </div>
                                    </div>
                                }
                                {
                                    formattedDueDateObj.date &&
                                    <Popup 
                                        trigger={<div className="task-list-item-date-container" style={{ color: formattedDueDateObj.colorCode }}>
                                            <Icon name="calendar minus outline" style={{ display: "inline" }}></Icon>
                                            <div className="task-list-item-date-item" style={{ color: formattedDueDateObj.colorCode }}>{formattedDueDateObj.date}</div>
                                        </div>}
                                        content="Change Due Date"
                                        position='bottom center'
                                        inverted
                                        style={{ fontSize: '10px', paddingRight: "20px", paddingLeft: "20px", maxWidth: "200px", letterSpacing: "0.5px", wordBreak: "break-word" }}
                                        size='mini'>
                                    </Popup>
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
                                    <Field name="title" placeholder="Write Task" transparent autoFocus fluid className="task-list-item-new-task" component={InputField}/>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
         )}
        </Draggable>
    );
};

const TaskItemForm = reduxForm({
    form: "taskForm",
    enableReinitialize: true
})(TaskItem)

export default TaskItemForm;
