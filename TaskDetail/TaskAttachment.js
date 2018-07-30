import React from 'react';
import {Icon} from 'semantic-ui-react';

const TaskAttachment = ({title}) => {
    return (
        <div className="task-detail-task-attachment-container">
            <div className="task-detail-task-attachment-icon-container">
                <Icon name="paste" style={{color: "#707070"}}></Icon>
            </div>
            <div className="task-detail-task-attachment-data-container">
                {title}
            </div>
            <div className="task-detail-task-attachment-action-container">
                <div style={{display:'inline-block'}}>
                    <Icon name="download" style={{color: "#707070"}}></Icon>

                </div>
                <div style={{display:'inline-block'}}>
                    <Icon name="trash" style={{color: "#707070", marginLeft:'20px'}}></Icon>
                </div>
            </div>

        </div>
    )
}

export default TaskAttachment;