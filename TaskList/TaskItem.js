import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react'
import moment from 'moment';

import './TaskList.css';
import TeamCircleIcon from '../TeamCircleIcon'
import Label from '../Label';

const TaskItem = ({ title, icon, status, subTask, attachment, dueDate, isNew, provided }) => {

    const getDuedate = function () {
        let data;
        if (moment().format("DD MMMM YYYY") === moment(dueDate.date).format("DD MMMM YYYY")) {
            data = "Today"
        } else if (moment().subtract(1, 'days').format("DD MMMM YYYY") === moment(dueDate.date).format("DD MMMM YYYY")) {
            data = "Yesterday"
        } else if (moment().add(1, 'days').format("DD MMMM YYYY") === moment(dueDate.date).format("DD MMMM YYYY")) {
            data = "Tommorow"
        } else {
            let dueDateArray = moment(dueDate.date).format("DD MMMM YYYY").split(" ");
            data = dueDateArray[0] + " " + dueDateArray[1];
        }
        return data;
    }


    const isDelayedDate = function () {
        //Check for previous delayed dates..
        let isDelayed
        if(dueDate){
            var isAfter = moment().isAfter(dueDate.date);
            if (isAfter) {
                isDelayed = true;
            } else {
                isDelayed = false;
            }
        }
       
        return isDelayed;
    }

    const getDelayedColor = function () {
        let delayedColor;
        if(dueDate){
            var isAfter = moment().isAfter(dueDate.date);
            if (isAfter) {
                delayedColor = "#ff1744"
            } else {
                delayedColor = "#ffffff"
            }
        } else{
            delayedColor = "#ffffff"
        }
       
        return delayedColor;
    }

    return (
        <div style={{width: "100%", borderBottom: "1px solid #eeeeee"}}>
            <div style={{borderLeftColor: getDelayedColor(), borderLeftStyle:"solid", borderLeftWidth: "2px", height:'80%'}}>
                <div className="task-list-item-container">
                    <div className="task-list-item-side-line">
                        <div className="task-list-item-drag-icon" {...provided.dragHandleProps}>
                            <Icon name="compress"></Icon>
                        </div>

                    </div>
                    <div className="task-list-item-icon">
                        <div>
                            {icon.title && <TeamCircleIcon size="mini" title={icon.title} onClick={() => { console.log("Icon has been clicked") }}></TeamCircleIcon>}
                            {icon.icon && <TeamCircleIcon size="mini" icon={icon.icon} onClick={() => { console.log("Icon has been clicked") }}></TeamCircleIcon>}
                            {/* {icon && <TeamCircleIcon size="mini" icon={icon} onClick={() => { console.log("Icon has been clicked") }}></TeamCircleIcon>} */}
                        </div>
                    </div>

                    <div className="task-list-item-title">
                            {!isNew && <div style={{textOverflow: 'ellipsis', overflow:'hidden'}}>{title}</div>}
                            {isNew && <Input style={{marginLeft:10}} transparent placeholder="Write Task" autoFocus></Input>}
                    
                    </div >
                    {!isNew && <div style={{width:'50%', display:'inline-block'}}>
                        <div className="task-list-item-status" style={{ color: status.color }}>{status.title}</div>
                        <div className="task-list-item-sub-task-attachment-container">
                            {subTask && <div style={{ display: "inline-block", width:"50%"}}>
                                <Icon name="unordered list" style={{ display: "inline" }}></Icon>
                                <div style={{ display: "inline", marginLeft: "2px" }}>{subTask.completed}/{subTask.total}</div>
                            </div>}
                            {attachment && <div style={{ display: "inline-block", width:"50%"}}>
                                <Icon name="attach" style={{ display: "inline" }}></Icon>
                                <div style={{ display: "inline", marginLeft: "2px" }}>{attachment}</div>
                            </div>
                            }
                        </div>
                        {/* TODO: Populate Labels list */}
                        <div className="task-list-item-tags-container">
                            <div style={{ display: "inline" }}>
                                <div style={{ display: "inline" }}>
                                    {/* <Label title="Bug" color="#ff9b00"></Label> */}
                                </div>
                            </div>

                        </div>
                        <div className="task-list-item-date-container">
                            {getDuedate() === "Today" &&
                                <div>
                                    <Icon name="calendar minus outline" style={{ display: "inline" }}></Icon>
                                    <div style={{ display: "inline", marginLeft: "5px", color: "#1ed0c1" }}>{getDuedate()}</div>
                                </div>
                            }
                            {getDuedate() === "Yesterday" &&
                                <div>
                                    <Icon name="calendar minus outline" style={{ display: "inline" }}></Icon>
                                    <div style={{ display: "inline", marginLeft: "5px", color: "#ff1744" }}>{getDuedate()}</div>
                                </div>
                            }
                            {getDuedate() === "Tommorow" &&
                                <div>
                                    <Icon name="calendar minus outline" style={{ display: "inline" }}></Icon>
                                    <div style={{ display: "inline", marginLeft: "5px", color: "#1ed0c1" }}>{getDuedate()}</div>
                                </div>
                            }
                            {getDuedate() !== "Today" && getDuedate() !== "Yesterday" && getDuedate() !== "Tomorrow" && isDelayedDate() === false &&
                                <div>
                                    <Icon name="calendar minus outline" style={{ display: "inline" }}></Icon>
                                    <div style={{ display: "inline", marginLeft: "5px", color: "#9e9e9e" }}>{getDuedate()}</div>
                                </div>
                            }
                            {getDuedate() !== "Today" && getDuedate() !== "Yesterday" && getDuedate() !== "Tomorrow" && isDelayedDate() === true &&
                                <div>
                                    <Icon name="calendar minus outline" style={{ display: "inline" }}></Icon>
                                    <div style={{ display: "inline", marginLeft: "5px", color: "#ff1744" }}>{getDuedate()}</div>
                                </div>
                            }




                        </div>
                    </div>}

                </div>

            </div>


        </div>
    )
}

export default TaskItem;

