import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';

import InputElement from './ReduxForm/InputElement'
import SubmitButton from './ReduxForm/SubmitButton'
import SnaphyForm from './ReduxForm/SnaphyForm';

const TaskCommentForm = (props) => {

    const { handleSubmit, invalid, submitting, pristine, error} = props; 


    return (
        // <SnaphyForm onSubmit={handleSubmit} error={error}>
            <div className="task-detail-comment-container">
                <div className="task-detail-comment-data-container">
                    <Field name="comment" type="text" placeholder="Add Comment Here" size="large" rows="1" label="TaskComment" component={InputElement}></Field>
                </div>
                <div className="task-detail-comment-button-container">
                    <SubmitButton type="submit" size="tiny" disabled={invalid || submitting || pristine} content="Comment" ></SubmitButton>
                    {/* <Button size="tiny" color="blue" onClick={props.addCommentData}>Comment</Button> */}
                </div>
            </div>
        //  </SnaphyForm>
    )

}

export default TaskCommentForm;