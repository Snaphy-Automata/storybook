import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { Icon, Button, Label, Form } from 'semantic-ui-react';
import map from 'lodash/map';
import capitalize from 'lodash/capitalize';
import moment from 'moment';

import './TaskDetail.css';
import SubTask from './SubTask';
import TaskAttachment from './TaskAttachment'
import InputElement from '../ReduxForm/InputElement';
import TagContainer from '../TagContainer';
import DatePickerForm from '../CustomDatePicker/DatePickerForm';
import ShareDialog from './ShareDialog';
import DropDownFieldUI from '../ReduxForm/DropDownField';
import SnaphyForm from '../ReduxForm/SnaphyForm'
import TaskComment from '../TaskComment'
import TaskCommentForm from '../TaskCommentForm'
import DurationForm from '../DurationForm';

import {
    onMarkCompleteClickedAction,
    onStatusChangedAction,
    getStatusDataAction,
    onUserAddButtonClickedAction,
    onLabelAddButtonClickedAction,
} from '../TaskList/TaskListActions';
import SelectLabel from '../SelectLabel';



const TaskDetail = (props) => {

    //console.log("Task detail Props", props);
    const {
        handleSubmit,
        error,
        selectedTask,
        onTitleDataChanged,
        saveStatus,
        selectedTaskStatusData,
        onMarkCompletedClicked,
        onUpdateDueDate,
        onUpdateStartDate,
        onUpdateDuration,
        selectedMemberListObj,
        selectedLabelListObj,
        onUpdateSelectedMemberList,
        onUpdateSelectedLabelList,
        userObj,
        findLabelById,
        labelDialogState,
        onLabelDialogStateChanged,
        labelDialogFormDataInit,
        onUpdateLabelDialogForm,
        saveLabel,
        deleteLabel,
        commentList,
        subTaskList,
        findMemberById,
        onAddSubTask
    } = props;

    //console.log("Task Detail Props", subTaskList);



    const getOptions = () => {
        let optionsList = [];
        if (props.status && props.status.length) {
            props.status.forEach((status) => {
                optionsList.push({ key: status.id, text: capitalize(status.title), value: `${status.title}--${status.id}-,${status.colorCode}` });
            })
        }
        return optionsList;
    }

    let fileInput = null;
    const uid = Math.random().toString(36).substring(7);

    const onDataChanged = (event, data) => {
        //console.log("In Status Selected", data.value);
        const statusText = data.value.replace(/--.+/g, "");
        // props.getStatusDataAction(statusText);
        props.onStatusChangedAction(!props.isStatusClicked);
        //call mutation..
        if (selectedTask && selectedTask.id) {
            let statusIdAndColor = data.value.replace(/.+--/g, "");
            let statusColorCode = statusIdAndColor.replace(/.+-,/g, "");
            let statusId = statusIdAndColor.replace(/-,.+/g, "");
            const statusObj = {
                id: statusId,
                title: statusText,
                colorCode: statusColorCode
            }
            saveStatus(statusId, selectedTask, statusObj);
        }
    }

    let statusText = "Status";
    //console.log("Selected Status Obj", selectedTaskStatusData);
    if (selectedTaskStatusData && selectedTask && selectedTaskStatusData.taskId && selectedTaskStatusData.taskId === selectedTask.id && selectedTaskStatusData.data && selectedTaskStatusData.data.title) {
        statusText = capitalize(selectedTaskStatusData.data.title);
    }

    // const statusText = capitalize || "Status";

    const onMarkCompletedButtonClicked = () => {
        //console.log("Mark is completed getting called");
        if (selectedTask) {
            if (selectedTask.isCompleted) {
                onMarkCompletedClicked(selectedTask.id, false);
            } else {
                onMarkCompletedClicked(selectedTask.id, true);
            }
        }
    }

    const onUpdateTaskDueDate = (day) => {
        if (selectedTask) {
            onUpdateDueDate(selectedTask.id, day);

        }
    }

    const onUpdateTaskStartDate = (day) => {
        if (selectedTask) {
            onUpdateStartDate(selectedTask.id, day);
        }
    }

    const onUpdateTaskDuration = (duration) => {
        if (selectedTask) {
            onUpdateDuration(selectedTask.id, duration)
        }
    }

    const onStatusChanged = () => {
        props.onStatusChangedAction(!props.isStatusClicked);
    }

    const onUserAddButtonClicked = () => {
        props.onUserAddButtonClickedAction(!props.isUserButtonClicked);
    }

    const onLabelAddButtonClicked = () => {
        props.onLabelAddButtonClickedAction(!props.isLabelButtonClicked);
    }


    const getTaskTitle = () => {
        let titleData = null;
        if (selectedTask) {
            if (selectedTask.title) {
                titleData = selectedTask.title;
            }
        }
        //console.log("Title Data", titleData);
        return titleData;
    }

    const getTitleFieldName = () => {
        let titleName;
        if (selectedTask) {
            if (selectedTask.id) {
                if (selectedTask.title) {
                    titleName = `${selectedTask.id}.title`;
                } else {
                    titleName = `${selectedTask.id}.title_new`;
                }

            } else {
                titleName = "title";
            }

        } else {
            titleName = "title";
        }
        //console.log("Title Name", titleName);
        return titleName;
    }

    const updateTaskSelectedMemberList = (selectedMemberList) => {
        if (selectedTask) {
            onUpdateSelectedMemberList(selectedTask.id, selectedMemberList);
        }
    }

    const updateTaskSelectedLabelList = (selectedLabelList) => {
        if (selectedTask) {
            onUpdateSelectedLabelList(selectedTask.id, selectedLabelList);
        }
    }


    const onAddSubTasksToList = () => {
        let subTaskDataList = [...subTaskList];
        subTaskDataList.push({});
        //console.log("Add SubTask getting called", subTaskDataList);
        onAddSubTask(selectedTask.id, subTaskDataList, "empty", null);
    }

    const onSaveSubTask = (subTaskId, titleValue) => {
       // console.log("On Save SUb task", subTaskId, titleValue);
        let subTaskDataList = [...subTaskList];
        let indexValue;
        if(subTaskId){
            for(var i=0;i<subTaskDataList.length;i++){
                if(subTaskDataList[i].id === subTaskId){
                    indexValue = i;
                    
                    if(i === subTaskDataList.length -1){
                        subTaskDataList.push({});
                    }
                }
            }
            //Updating the existing task ..
            //If last task then add new subtask
        } else{
            //  let subTaskObj = subTaskDataList[subTaskDataList.length-1];
            //  subTaskObj.title = titleValue;
            //  subTaskObj.isCompleted = false;
            //  subTaskObj.taskId = selectedTask.id;
            //  subTaskDataList.splice(subTaskDataList.length-1, 1, subTaskObj);
            //  subTaskDataList.push({});
            //Update the empty subtask with new value and add the new task..
        }
        //console.log("Updated Sub task List", subTaskDataList);
        onAddSubTask(selectedTask.id, subTaskDataList, "filled", subTaskId, titleValue, indexValue);
    }

    return (
        <div>
            {/* <SnaphyForm error={error} onSubmit={handleSubmit}  > */}

                {/* Header Section */}
                <div className="task-detail-header-conatiner">
                    <div className="task-detail-share-container">
                        <Icon name="share alternate" style={{ display: "inline" }}></Icon>
                        <div style={{ display: "inline", marginLeft: '5px', cursor: 'pointer' }} onClick={props.openShareDialog}>Share</div>
                    </div>
                    <div className="task-detail-add-attachment-container">
                        <Label width="4" as="label" style={{ backgroundColor: "#ffffff", cursor: "pointer", fontSize: "11px" }} htmlFor={uid}>
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
                    </div>


                    <div className="task-detail-add-subtask-button-conatiner" onClick={onAddSubTasksToList}>
                        <Icon name="unordered list" style={{ display: "inline" }}></Icon>
                        <div style={{ display: "inline", marginLeft: '5px', cursor: 'pointer' }}>Add Subtasks</div>
                    </div>
                    <div className="task-detail-close-button-conatiner">
                        <Icon name="close" style={{ display: "inline" }}></Icon>
                    </div>

                </div>

                {/* Task Detail Form */}
                <div className="task-detail-task-detail-container">
                    <SnaphyForm>
                    <div className="task-detail-task-name-container">
                        <Field name={getTitleFieldName()} type="text" placeholder="Write a task name" size="large" rows="1" label="TaskTitle" component={InputElement} onDataChanged={onTitleDataChanged}></Field>
                        {/* <InputElement placeholder="Write a task name" size="large"></InputElement> */}
                    </div>
                    </SnaphyForm>
                    <div className="task-detail-task-action-button-conatiner">
                        <div className="task-detail-completed-container">
                            {selectedTask && !selectedTask.isCompleted && <Button size="tiny" basic onClick={onMarkCompletedButtonClicked} style={{ width: "135px" }} className="task-detail-action-button">
                                <Icon name="check" />
                                Mark Complete
                            </Button>}
                            {selectedTask && selectedTask.isCompleted && <Button size="tiny" color="green" onClick={onMarkCompletedButtonClicked} style={{ width: "135px" }} className="task-detail-action-button">
                                <Icon name="check" />
                                Completed
                        </Button>}
                            {!selectedTask && <Button size="tiny" basic onClick={onMarkCompletedButtonClicked} style={{ width: "135px" }} className="task-detail-action-button">
                                <Icon name="check" />
                                Mark Complete
                            </Button>}
                        </div>
                        <div className="task-detail-status-container">
                            {!props.isStatusClicked && <Button size="tiny" basic icon labelPosition='right' onClick={onStatusChanged} style={{ width: "127px" }} className="task-detail-action-button">
                                <Icon name="angle down" />
                                {statusText}
                            </Button>}
                            {props.isStatusClicked && <Field options={getOptions()} name="status.title" type="text" placeholder="In Progress" open={props.isStatusClicked} size="tiny" onDataChanged={onDataChanged} style={{ width: "127px" }} component={DropDownFieldUI} />}

                        </div>
                        <div className="task-detail-archive-container">
                            <Button size="tiny" basic className="task-detail-action-button">
                                <Icon name="archive" />
                                Archive
                        </Button>

                        </div>
                    </div>
                    <div className="task-detail-assigned-to-container">
                        <div className="task-detail-assigned-to-text">Assigned To</div>
                        {selectedTask && <TagContainer
                            type="user"
                            onAddButtonClickedAction={onUserAddButtonClicked}
                            isButtonClicked={props.isUserButtonClicked}
                            totalItemList={props.users}
                            userObj={userObj}
                            taskId={selectedTask.id}
                            selectedMemberListObj={selectedMemberListObj}
                            updateTaskSelectedMemberList={updateTaskSelectedMemberList}
                        >
                        </TagContainer>}
                        {!selectedTask && <TagContainer
                            type="user"
                            onAddButtonClickedAction={onUserAddButtonClicked}
                            isButtonClicked={props.isUserButtonClicked}
                            totalItemList={props.users}
                            selectedMemberListObj={selectedMemberListObj}>
                        </TagContainer>}
                    </div>

                    <div className="task-detail-date-container">
                        <div className="task-detail-due-date-container">
                            <div className="task-detail-due-date-text">Due Date</div>
                            {selectedTask && <DatePickerForm title="Due Date" dataType="due" onRemoveDate={props.onRemoveDueDate} onUpdateDate={onUpdateTaskDueDate} style={{ marginTop: "7px" }} taskId={selectedTask.id} />}
                            {!selectedTask && <DatePickerForm title="Due Date" dataType="due" onRemoveDate={props.onRemoveDueDate} onUpdateDate={onUpdateTaskDueDate} style={{ marginTop: "7px" }} />}
                            {/* <IconLabel size="tiny" icon="calendar minus outline" name="Due Date"></IconLabel> */}

                        </div>
                        <div className="task-detail-start-date-container">
                            <div className="task-detail-start-date-text">Start Date</div>
                            {selectedTask && <DatePickerForm title="Start Date" dataType="start" onRemoveDate={props.onRemoveStartDate} onUpdateDate={onUpdateTaskStartDate} style={{ marginTop: "7px" }} taskId={selectedTask.id} />}
                            {!selectedTask && <DatePickerForm title="Start Date" dataType="start" onRemoveDate={props.onRemoveStartDate} onUpdateDate={onUpdateTaskStartDate} style={{ marginTop: "7px" }} />}
                            {/* <IconLabel size="tiny" icon="calendar minus outline" name="Start Date"></IconLabel> */}

                        </div>
                        <div className="task-detail-duration-container">
                            <div className="task-detail-duration-text">Duration</div>
                            <div style={{ marginTop: "7px" }}>
                                {selectedTask && <DurationForm taskId={selectedTask.id} onUpdateTaskDuration={onUpdateTaskDuration}></DurationForm>}
                                {!selectedTask && <DurationForm onUpdateTaskDuration={onUpdateTaskDuration}></DurationForm>}
                                {/* <IconLabel size="small" icon="clock outline" name="Duration" /> */}

                            </div>

                        </div>

                    </div>

                    <div className="task-detail-labels-container">
                        <div>Labels</div>
                        {selectedTask &&
                            <TagContainer
                                type="label"
                                onAddButtonClickedAction={onLabelAddButtonClicked}
                                isButtonClicked={props.isLabelButtonClicked}
                                totalItemList={props.labels}
                                taskId={selectedTask.id}
                                selectedLabelListObj={selectedLabelListObj}
                                updateTaskSelectedLabelList={updateTaskSelectedLabelList}
                                findLabelById={findLabelById}
                                isDialogOpened={props.isLabelDialogOpened}
                                labelDialogState={labelDialogState}
                                onLabelDialogStateChanged={onLabelDialogStateChanged}
                                onUpdateLabelDialogForm={onUpdateLabelDialogForm}
                                labelDialogFormDataInit={labelDialogFormDataInit}
                                saveLabel={saveLabel}
                                deleteLabel={deleteLabel}>
                            </TagContainer>
                        }
                        {!selectedTask &&
                            <TagContainer
                                type="label"
                                onAddButtonClickedAction={onLabelAddButtonClicked}
                                isButtonClicked={props.isLabelButtonClicked}
                                totalItemList={props.labels}
                                selectedLabelListObj={selectedLabelListObj}
                                isDialogOpened={props.isLabelDialogOpened}
                                labelDialogState={labelDialogState}
                                onLabelDialogStateChanged={onLabelDialogStateChanged}
                                saveLabel={saveLabel}
                                deleteLabel={deleteLabel}>
                            </TagContainer>
                        }
                    </div>

                    {props.subTaskList && props.subTaskList.length !== 0 && <div className="task-detail-sub-tasks-container">
                        <div>Subtasks</div>
                        <div style={{ marginTop: 10 }}>
                            {
                                map(props.subTaskList, function (subTask, index) {
                                    //console.log("Looping through Sub task", subTask);
                                    return (
                                        <div key={index} style={{ marginBottom: 10 }}>
                                            {subTask.isCompleted && <SubTask subTaskId={subTask.id} title={subTask.title} isSelected="isSelected" onSaveSubTask={onSaveSubTask}></SubTask>}
                                            {!subTask.isCompleted && subTask.id && <SubTask subTaskId={subTask.id} title={subTask.title} isSelected="" onSaveSubTask={onSaveSubTask}></SubTask>}
                                            {!subTask.id && <SubTask title="" isSelected="" onSaveSubTask={onSaveSubTask}></SubTask>}
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

                    {commentList && commentList.length !== 0 && <div>
                        <div style={{ marginTop: 10 }}>Comments</div>
                        <div>
                            {
                                map(commentList, function (comment, index) {
                                    let memberObj = {};
                                    if(comment.ownerId){
                                        memberObj = findMemberById(comment.ownerId);
                                    }
                                    let name;
                                    name = memberObj.firstName;
                                    if(memberObj.lastName){
                                        name = `${name} ${memberObj.lastName}`;
                                    }
                                    let createdTime = "";
                                    if(comment.createdTime){
                                        createdTime = moment(comment.createdTime).fromNow();
                                    }
                                    return (
                                        <TaskComment key={index} name={name} time={createdTime} comment={comment.title} />
                                    )
                                })
                            }
                        </div>
                    </div>}





                </div>
                <SnaphyForm error={error} onSubmit={handleSubmit}>
                    <TaskCommentForm invalid={props.invalid} submitting={props.submitting} pristine={props.pristine}/>
                </SnaphyForm>
               
                <ShareDialog onClose={props.openShareDialog} isShareDialogOpened={props.isShareDialogOpened}></ShareDialog>
            {/* </SnaphyForm> */}
        </div>
    )

}

function mapStateToProps(store) {
    return {
        isMarkCompletedClicked: store.TaskListReducer.isMarkCompletedClicked,
        isStatusClicked: store.TaskListReducer.isStatusClicked,
        statusData: store.TaskListReducer.statusData,
        isUserButtonClicked: store.TaskListReducer.isUserButtonClicked,
        isLabelButtonClicked: store.TaskListReducer.isLabelButtonClicked,
        //labels : store.ModelDataReducer.labels,
        //users : store.ModelDataReducer.users,
        // selectedUserList : store.TaskListReducer.selectedUserList
    }
}

const mapActionsToProps = {
    onMarkCompleteClickedAction,
    onStatusChangedAction,
    getStatusDataAction,
    onUserAddButtonClickedAction,
    onLabelAddButtonClickedAction,
}


const TaskDetailForm = reduxForm({
    form: "taskForm",
    enableReinitialize: true
})(TaskDetail);

export default connect(mapStateToProps, mapActionsToProps)(TaskDetailForm);


