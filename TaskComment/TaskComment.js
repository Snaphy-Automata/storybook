import React from 'react';
import {Icon} from 'semantic-ui-react';

import TeamCircleIcon from '../TeamCircleIcon'
import './TaskComment.css';


const TaskComment = (props) => {
    return (
        <div className="task-comment-conatiner">
            <div className="task-comment-user-icon-container">
                <TeamCircleIcon size="mini" title={props.name} onClick={()=>{console.log("Item Has been clicked")}}/>
            </div>
            <div className="task-comment-data-container">
                <div className="task-comment-data-header-container">
                    <div className="task-comment-data-name-container">{props.name}</div>
                    <div className="task-comment-data-time-container">{props.time}</div>
                    <div className="task-comment-data-side-menu-container">
                        <Icon name="ellipsis vertical"/>
                    </div>

                </div>
                <div className="task-comment-data-text-container">{props.comment}</div>
            </div>
        </div>
    )
}

export default TaskComment;