import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import TeamCircleIcon from '../TeamCircleIcon'
import './TaskComment.css';


//Import Actions..
import { changeCommentDialogStateAction } from '../../baseComponents/GridView/components/ModelData/Comment/action'


const TaskComment = (props) => {
    const { commentId, onDeleteComment, changeCommentDialogStateAction, isDialogOpened, indexValue } = props;

    const onOpenCommentDialog = () => {
        changeCommentDialogStateAction(commentId, true);
    }

    const onCloseCommentDialog = () => {
        changeCommentDialogStateAction(commentId, false);
    }

    const onDeleteCommentClicked = () => {
        console.log("I am getting called");
        onDeleteComment(commentId, indexValue)
    }
    return (
        <div className="task-comment-conatiner">
            <div className="task-comment-user-icon-container">
                <TeamCircleIcon size="mini" title={props.name} onClick={() => { console.log("Item Has been clicked") }} />
            </div>
            <div className="task-comment-data-container">
                <div className="task-comment-data-header-container">
                    <div className="task-comment-data-name-container">{props.name}</div>
                    <div className="task-comment-data-time-container">{props.time}</div>
                    <Popup
                        trigger={<div className="task-comment-data-side-menu-container" onClick={onOpenCommentDialog}>
                            <Icon name="ellipsis vertical" />
                        </div>}
                        content={<div className="task-comment-dialog-delete-container" onClick={onDeleteCommentClicked}>Delete</div>}
                        on='click'
                        open={isDialogOpened}
                        onClose={onCloseCommentDialog}
                        onOpen={onOpenCommentDialog}
                        position='bottom center'
                    />


                </div>
                <div className="task-comment-data-text-container">{props.comment}</div>
            </div>
        </div>
    )
}

function mapStateToProps(store, props) {
    const commentDialog = store.ModelDataReducer.commentDialog;
    let isDialogOpened = false;
    if (commentDialog.commentId === props.commentId) {
        isDialogOpened = commentDialog.isDialogOpened
    }
    return {
        isDialogOpened
    }
}

const mapActionsToProps = {
    changeCommentDialogStateAction
}




export default connect(mapStateToProps, mapActionsToProps)(TaskComment);
