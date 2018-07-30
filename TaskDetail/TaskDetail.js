import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon, Button } from 'semantic-ui-react'

import './TaskDetail.css';
import IconLabel from '../IconLabel';
import Description from '../Description';
import InputElement from '../InputElement';

const TaskDetail = (props) => {
    return (
        <div>
            <div className="task-detail-header-conatiner">
                <div className="task-detail-share-container">
                    <Icon name="share alternate" style={{display:"inline"}}></Icon>
                    <div style={{display:"inline", marginLeft:'5px'}}>Share</div>
                </div>
                <div className="task-detail-attachment-container">
                    <Icon name="attach" style={{display:"inline"}}></Icon>
                    <div style={{display:"inline", marginLeft:'5px'}}>Add Attachment</div>
                </div>
                <div className="task-detail-add-subtask-button-conatiner">
                    <Icon name="unordered list" style={{display:"inline"}}></Icon>
                    <div style={{display:"inline", marginLeft:'5px'}}>Add Subtasks</div>
                </div>
                <div className="task-detail-close-button-conatiner">
                    <Icon name="close" style={{display:"inline"}}></Icon>
                </div>

            </div>
            <div className="task-detail-task-detail-container">
                <div className="task-detail-task-name-container">
                    <InputElement placeholder="Write a task name" size="large"></InputElement>
                </div>
                <div className="task-detail-task-action-button-conatiner">
                    <div className="task-detail-completed-container">
                        <Button size="tiny" basic>
                            <Icon name="check"/>
                            Mark Complete
                        </Button>
                    </div>
                    <div className="task-detail-status-container">
                        <Button size="tiny" basic icon labelPosition='right'>
                            <Icon name="angle down"/>
                            Status
                        </Button>
                    </div>
                    <div className="task-detail-archive-container">
                        <Button size="tiny" basic>
                            <Icon name="archive"/>
                            Archive
                        </Button>

                    </div>
                </div>
                <div className="task-detail-assigned-to-container">
                    <div>Assigned To</div>
                    <div className="task-detail-assigned-to-data-container">
                        <div className="task-detail-assigned-to-list-conatiner">

                        </div>
                        <div className="task-detail-add-assigned-button-container">
                            <Icon size="small" name="add" style={{margin:0}}></Icon>
                        </div>
                    </div>

                </div>

                <div className="task-detail-date-container">
                    <div className="task-detail-due-date-container">
                        <div>Due Date</div>
                        <div style={{marginTop:"5px"}}>
                            <IconLabel size="tiny" icon="calendar minus outline" name="Due Date"></IconLabel>
                        </div>
                        
                    </div>
                    <div className="task-detail-start-date-container">
                        <div>Start Date</div>
                        <div style={{marginTop:"5px"}}>
                            <IconLabel size="tiny" icon="calendar minus outline" name="Start Date"></IconLabel>
                        </div>
                        
                    </div>

                </div>

                <div className="task-detail-labels-container">
                    <div>Labels</div>
                    <div className="task-detail-labels-data-container">
                        <div className="task-detail-labels-list-conatiner">

                        </div>
                        <div className="task-detail-add-labels-button-container">
                            <Icon size="small" name="add" style={{margin:'0'}}></Icon>
                        </div>
                    </div>
                </div>

                <div className="task-detail-description-container">
                    <div>Description</div>
                    <Description placeholder="Write Description Here" style={{minHeight: '150px', marginTop:'15px'}}></Description>

                </div>

                <div className="task-detail-comment-container">
                    <div className="task-detail-comment-data-container">
                        <Description placeholder="Add Comment Here" style={{minHeight:'50px'}}></Description>
                    </div>
                    <div className="task-detail-comment-button-container">
                        <Button size="tiny" color="blue">Comment</Button>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default TaskDetail;

