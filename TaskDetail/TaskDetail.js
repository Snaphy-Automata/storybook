import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Icon, Button, Label, Form } from 'semantic-ui-react';
import map from 'lodash/map';

import './TaskDetail.css';
import SubTask from './SubTask';
import TaskAttachment from './TaskAttachment'
import InputElement from '../InputElement';
import TagContainer from '../TagContainer';
import DatePickerForm from '../CustomDatePicker/DatePickerForm';
import ShareDialog from './ShareDialog';
import IconLabel from '../IconLabel';
import DropDownFieldUI from '../DropDownField';
import SnaphyForm from '../SnaphyForm'
import TaskComment from '../TaskComment'
import TaskCommentForm from '../TaskCommentForm'



const TaskDetail = (props) => {

   // console.log("Task detail Props", props);
    const { handleSubmit, pristine, submitting, invalid, error } = props;

    const options = [
        { key: "inprogress", text: "In Progress", value: "In Progress" },
        { key: "pending", text: "Pending", value: "Pending" },

        { key: "completed", text: "Completed", value: "Completed" }
    ]

    let fileInput = null;
    const uid = Math.random().toString(36).substring(7);

    const onDataChanged = (event, data) => {
        props.getStatusData(data.value);
        props.onStatusChanged();
        props.onDropDownStateChanged()
    }

    return (
        <div>
            <SnaphyForm onSubmit={handleSubmit} error={error}>
            
            {/* Header Section */}
            <div className="task-detail-header-conatiner">
                <div className="task-detail-share-container">
                    <Icon name="share alternate" style={{ display: "inline" }}></Icon>
                    <div style={{ display: "inline", marginLeft: '5px', cursor: 'pointer' }} onClick={props.openShareDialog}>Share</div>
                </div>
                <Label width="4" as="label" style={{ backgroundColor: "#ffffff", cursor: "pointer" }} htmlFor={uid}>
                    <Icon name="attach" />
                    Add Attachment
                </Label>
                <input id={uid} hidden type="file" onChange={() => {
                    console.log("File Choosen", fileInput.files[0])
                    if (fileInput.files[0].type === "image/jpeg" || fileInput.files[0].type === "image/png") {
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            //call action to get the image and content..
                            let title = fileInput.files[0].name;
                            let image = e.target.result;
                            { props.addAttachment({ title: title, image: image, isImage: true }) }
                        };
                        reader.readAsDataURL(fileInput.files[0]);
                    }
                }}
                    ref={input => {
                        fileInput = input;
                    }} />

                <div className="task-detail-add-subtask-button-conatiner" onClick={props.addSubTask}>
                    <Icon name="unordered list" style={{ display: "inline" }}></Icon>
                    <div style={{ display: "inline", marginLeft: '5px', cursor: 'pointer' }}>Add Subtasks</div>
                </div>
                <div className="task-detail-close-button-conatiner">
                    <Icon name="close" style={{ display: "inline" }}></Icon>
                </div>

            </div>
            {/* Task Detail Form */}
            <div className="task-detail-task-detail-container">
                <div className="task-detail-task-name-container">
                    <Field name="title" type="text" placeholder="Write a task name" size="large" rows="1" label="TaskTitle" component={InputElement}></Field>
                    {/* <InputElement placeholder="Write a task name" size="large"></InputElement> */}
                </div>
                <div className="task-detail-task-action-button-conatiner">
                    <div className="task-detail-completed-container">
                        {!props.isMarkCompletedClicked && <Button size="tiny" basic onClick={props.onMarkCompletedClicked}>
                            <Icon name="check" />
                            Mark Complete
                        </Button>}
                        {props.isMarkCompletedClicked && <Button size="tiny" color="green" onClick={props.onMarkCompletedClicked}>
                            <Icon name="check" />
                            Completed
                        </Button>}
                    </div>
                    <div className="task-detail-status-container">
                        {!props.isStatusClicked && <Button size="tiny" basic icon labelPosition='right' onClick={props.onStatusChanged}>
                            <Icon name="angle down" />
                            {props.statusData}
                        </Button>}
                        {props.isStatusClicked && <Field options={options} name="status.title" type="text" placeholder="In Progress" open={props.isDropDownOpened} size="tiny" onDataChanged={onDataChanged} component={DropDownFieldUI} />}

                    </div>
                    <div className="task-detail-archive-container">
                        <Button size="tiny" basic>
                            <Icon name="archive" />
                            Archive
                        </Button>

                    </div>
                </div>
                <div className="task-detail-assigned-to-container">
                    <div>Assigned To</div>
                    <TagContainer
                        type="user"
                        onAddButtonClickedAction={props.onUserAddButtonClicked}
                        isButtonClicked={props.isUserButtonClicked}
                        totalItemList={props.totalUserItemList}
                        selectedItemList={props.selectedUserItemList}>
                    </TagContainer>
                </div>

                <div className="task-detail-date-container">
                    <div className="task-detail-due-date-container">
                        <div>Due Date</div>
                        <div style={{ marginTop: "5px" }}>
                            <DatePickerForm title="Due Date" isDatePickerOpened={props.isDueDatePickerOpened} dateData={props.dueDatedata} onOpenDatePicker={props.onOpenDueDatePicker} onDayChangedAction={props.onDueDayChanged} onRemoveDate={props.onRemoveDueDate} />
                            {/* <IconLabel size="tiny" icon="calendar minus outline" name="Due Date"></IconLabel> */}
                        </div>

                    </div>
                    <div className="task-detail-start-date-container">
                        <div>Start Date</div>
                        <div style={{ marginTop: "5px" }}>
                            <DatePickerForm title="Start Date" isDatePickerOpened={props.isStartDatePickerOpened} dateData={props.startDateData} onOpenDatePicker={props.onOpenStartDatePicker} onDayChangedAction={props.onStartDayChanged} onRemoveDate={props.onRemoveStartDate} />
                            {/* <IconLabel size="tiny" icon="calendar minus outline" name="Start Date"></IconLabel> */}
                        </div>

                    </div>
                    <div className="task-detail-duration-container">
                        <div>Duration</div>
                        <div style={{ marginTop: "5px" }}>
                            <IconLabel size="tiny" icon="clock outline" name="Duration" />

                        </div>

                    </div>

                </div>

                <div className="task-detail-labels-container">
                    <div>Labels</div>
                    <TagContainer
                        type="label"
                        onAddButtonClickedAction={props.onLabelAddButtonClicked}
                        isButtonClicked={props.isLabelButtonClicked}
                        totalItemList={props.totalLabelItemList}
                        selectedItemList={props.selectedLabelItemList}
                        isDialogOpened={props.isLabelDialogOpened}>
                    </TagContainer>
                </div>

                {props.subTaskList && props.subTaskList.length !== 0 && <div className="task-detail-sub-tasks-container">
                    <div>Subtasks</div>
                    <div style={{ marginTop: 10 }}>
                        {
                            map(props.subTaskList, function (subTask, index) {
                                return (
                                    <div key={index} style={{ marginBottom: 10 }}>
                                        {subTask.isSelected && <SubTask title={subTask.title} isSelected="isSelected"></SubTask>}
                                        {!subTask.isSelected && <SubTask title={subTask.title} isSelected=""></SubTask>}
                                    </div>

                                )
                            })
                        }
                    </div>

                </div>}

                <div className="task-detail-description-container">
                    <div style={{ marginBottom: 5 }}>Description</div>
                    <Field name="description" type="text" placeholder="Write a description Here" size="large" rows="3" label="TaskDescription" component={InputElement}></Field>
                    {/* <Field name="title" type="text" placeholder="Write a task name" size="large" comonent={InputField}></Field> */}
                    {/* <Description placeholder="Write Description Here" style={{ minHeight: '150px', marginTop: '15px' }}></Description> */}

                </div>

                {props.attachmentList && props.attachmentList.length !== 0 && <div className="task-detail-attachment-container">
                    <div>Attachment</div>
                    <div style={{ marginTop: 10 }}>
                        {
                            map(props.attachmentList, function (attachment, index) {
                                return (
                                    <div key={index} style={{ marginBottom: 10 }}>
                                        <TaskAttachment title={attachment.title} image={attachment.image} isImage={attachment.isImage}></TaskAttachment>

                                    </div>
                                )
                            })
                        }

                    </div>
                </div>}
                {props.commentList && props.commentList.length !== 0 && <div>
                    <div style={{marginTop:10}}>Comments</div>
                    <div>
                        {
                            map(props.commentList, function (comment, index) {
                                return (
                                    <TaskComment key={index} name="Nikita Mittal" time="1 min ago" comment={comment.comment} />
                                )
                            })
                        }
                    </div>
                </div>}





            </div>
            <TaskCommentForm {...props}/>
            <ShareDialog onClose={props.openShareDialog} isShareDialogOpened={props.isShareDialogOpened}></ShareDialog>
            </SnaphyForm>
        </div>
    )

}


const TaskDetailForm = reduxForm({
    form: "taskForm",
    enableReinitialize: true
})(TaskDetail);

export default TaskDetailForm;



// import React from 'react';
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
// import { Icon, Button } from 'semantic-ui-react'

// import './TaskDetail.css';
// import IconLabel from '../IconLabel';
// import Description from '../Description';
// import InputElement from '../InputElement';

// const TaskDetail = (props) => {
//     return (
//         <div>
//             <div className="task-detail-header-conatiner">
//                 <div className="task-detail-share-container">
//                     <Icon name="share alternate" style={{display:"inline"}}></Icon>
//                     <div style={{display:"inline", marginLeft:'5px'}}>Share</div>
//                 </div>
//                 <div className="task-detail-attachment-container">
//                     <Icon name="attach" style={{display:"inline"}}></Icon>
//                     <div style={{display:"inline", marginLeft:'5px'}}>Add Attachment</div>
//                 </div>
//                 <div className="task-detail-add-subtask-button-conatiner">
//                     <Icon name="unordered list" style={{display:"inline"}}></Icon>
//                     <div style={{display:"inline", marginLeft:'5px'}}>Add Subtasks</div>
//                 </div>
//                 <div className="task-detail-close-button-conatiner">
//                     <Icon name="close" style={{display:"inline"}}></Icon>
//                 </div>

//             </div>
//             <div className="task-detail-task-detail-container">
//                 <div className="task-detail-task-name-container">
//                     <InputElement placeholder="Write a task name" size="large"></InputElement>
//                 </div>
//                 <div className="task-detail-task-action-button-conatiner">
//                     <div className="task-detail-completed-container">
//                         <Button size="tiny" basic>
//                             <Icon name="check"/>
//                             Mark Complete
//                         </Button>
//                     </div>
//                     <div className="task-detail-status-container">
//                         <Button size="tiny" basic icon labelPosition='right'>
//                             <Icon name="angle down"/>
//                             Status
//                         </Button>
//                     </div>
//                     <div className="task-detail-archive-container">
//                         <Button size="tiny" basic>
//                             <Icon name="archive"/>
//                             Archive
//                         </Button>

//                     </div>
//                 </div>
//                 <div className="task-detail-assigned-to-container">
//                     <div>Assigned To</div>
//                     <div className="task-detail-assigned-to-data-container">
//                         <div className="task-detail-assigned-to-list-conatiner">

//                         </div>
//                         <div className="task-detail-add-assigned-button-container">
//                             <Icon size="small" name="add" style={{margin:0}}></Icon>
//                         </div>
//                     </div>

//                 </div>

//                 <div className="task-detail-date-container">
//                     <div className="task-detail-due-date-container">
//                         <div>Due Date</div>
//                         <div style={{marginTop:"5px"}}>
//                             <IconLabel size="tiny" icon="calendar minus outline" name="Due Date"></IconLabel>
//                         </div>
                        
//                     </div>
//                     <div className="task-detail-start-date-container">
//                         <div>Start Date</div>
//                         <div style={{marginTop:"5px"}}>
//                             <IconLabel size="tiny" icon="calendar minus outline" name="Start Date"></IconLabel>
//                         </div>
                        
//                     </div>

//                 </div>

//                 <div className="task-detail-labels-container">
//                     <div>Labels</div>
//                     <div className="task-detail-labels-data-container">
//                         <div className="task-detail-labels-list-conatiner">

//                         </div>
//                         <div className="task-detail-add-labels-button-container">
//                             <Icon size="small" name="add" style={{margin:'0'}}></Icon>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="task-detail-description-container">
//                     <div>Description</div>
//                     <Description placeholder="Write Description Here" style={{minHeight: '150px', marginTop:'15px'}}></Description>

//                 </div>

//                 <div className="task-detail-comment-container">
//                     <div className="task-detail-comment-data-container">
//                         <Description placeholder="Add Comment Here" style={{minHeight:'50px'}}></Description>
//                     </div>
//                     <div className="task-detail-comment-button-container">
//                         <Button size="tiny" color="blue">Comment</Button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )

// }

// export default TaskDetail;

