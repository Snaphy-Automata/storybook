import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Icon, Button } from 'semantic-ui-react';
import map from 'lodash/map';
import capitalize from 'lodash/capitalize';
import moment from 'moment';

import './TaskDetail.css';

//Custom import
import SubTask          from './SubTask';
import TaskAttachment   from './TaskAttachment'
import TagContainer     from '../TagContainer';
import DatePickerForm   from '../CustomDatePicker/DatePickerForm';
import DropDownFieldUI  from '../ReduxForm/DropDownField';
import SnaphyForm       from '../ReduxForm/SnaphyForm'
import TaskComment      from '../TaskComment'
import TaskCommentForm  from '../TaskCommentForm'
import DurationForm     from '../DurationForm';
import DescriptionField from '../ReduxForm/DescriptionField';
import TaskTitle        from './TaskTitle';
import Header           from './Header';

import {
    onMarkCompleteClickedAction,
    onStatusChangedAction,
    getStatusDataAction,
    onUserAddButtonClickedAction,
    onLabelAddButtonClickedAction,
} from '../TaskList/TaskListActions';


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
        onAddSubTask,
        onSaveSubTaskState,
        onDeleteSubTask,
        deleteComment,
        onUpdateDescription
    } = props;


    //console.log("Task Detail Props", subTaskList);
    //console.log("Task Detail Props", selectedTask);

    const getOptions = () => {
        let optionsList = [];
        if (props.status && props.status.length) {
            props.status.forEach((status) => {
                optionsList.push({ key: status.id, text: capitalize(status.title), value: `${status.title}--${status.id}-,${status.colorCode}` });
            })
        }
        return optionsList;
    }

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
        if(subTaskDataList.length){
            if(subTaskDataList[subTaskDataList.length-1].id){
                subTaskDataList.push({});
            }
        } else{
            subTaskDataList.push({});
        }

        //console.log("Add SubTask getting called", subTaskDataList);
        onAddSubTask(selectedTask.id, subTaskDataList, "empty", null, null);
    }

    const onSaveSubTask = (subTaskId, titleValue, eventType) => {
        console.log("On Save SUb task", subTaskId, titleValue, eventType);
        let subTaskDataList = [...subTaskList];
        let indexValue;
        if(subTaskId && eventType === "enter"){
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
        }
        onAddSubTask(selectedTask.id, subTaskDataList, "filled", subTaskId, titleValue, indexValue, eventType);
    }

    const onSubTaskStateChanged = (subTaskId, isCompleted, indexValue) => {
        if(selectedTask && selectedTask.id){
            onSaveSubTaskState(selectedTask.id, subTaskId, isCompleted, indexValue);
        }
    }

    const onRemoveSubTask = (subTaskId, isCompleted, indexValue) => {
        if(selectedTask && selectedTask.id){
            onDeleteSubTask(selectedTask.id, subTaskId, isCompleted, indexValue);
        }
    }

    const onDeleteComment = (commentId, indexValue) => {
        if(selectedTask && selectedTask.id){
            deleteComment(selectedTask.id, commentId, indexValue);
        }
    }

    const onUpdateTaskDescription = (descriptionData) => {
        if(selectedTask && selectedTask.id){
            onUpdateDescription(selectedTask.id, descriptionData);
        }
    }

    return (
        <div>
          {/* Header Section */}
          <Header openShareDialog={props.openShareDialog} isShareDialogOpened={props.isShareDialogOpened} onAddSubTasksToList={onAddSubTasksToList} />

          {/* Task Detail Form */}
          <div className="task-detail-task-detail-container">
              <SnaphyForm>
              <div className="task-detail-task-name-container">
                  <TaskTitle  task={selectedTask} onDataChanged={onTitleDataChanged} />
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
                      {selectedTask && <DatePickerForm title="Due Date" dataType="due" onRemoveDate={props.onRemoveDueDate} onUpdateDate={onUpdateTaskDueDate} style={{ marginTop: "7px" }} taskId={selectedTask.id} dateValue={selectedTask.endDate}/>}
                      {!selectedTask && <DatePickerForm title="Due Date" dataType="due" onRemoveDate={props.onRemoveDueDate} onUpdateDate={onUpdateTaskDueDate} style={{ marginTop: "7px" }} />}
                      {/* <IconLabel size="tiny" icon="calendar minus outline" name="Due Date"></IconLabel> */}

                  </div>
                  <div className="task-detail-start-date-container">
                      <div className="task-detail-start-date-text">Start Date</div>
                      {selectedTask && <DatePickerForm title="Start Date" dataType="start" onRemoveDate={props.onRemoveStartDate} onUpdateDate={onUpdateTaskStartDate} style={{ marginTop: "7px" }} taskId={selectedTask.id} dateValue={selectedTask.startDate}/>}
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
                  <div className="task-detail-labels-text">Labels</div>
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
                  <div className="task-detail-sub-tasks-text">Subtasks</div>
                  <div style={{ marginTop: 10 }}>
                      {
                          map(props.subTaskList, function (subTask, index) {
                              //console.log("Looping through Sub task", subTask);
                              return (
                                  <div key={index} style={{ marginBottom: 10 }}>
                                      {subTask.isCompleted && <SubTask indexValue={index} onSubTaskStateChanged={onSubTaskStateChanged} subTaskId={subTask.id} title={subTask.title} isSelected="isSelected" onSaveSubTask={onSaveSubTask} onRemoveSubTask={onRemoveSubTask}></SubTask>}
                                      {!subTask.isCompleted && subTask.id && <SubTask indexValue={index} onSubTaskStateChanged={onSubTaskStateChanged} subTaskId={subTask.id} title={subTask.title} isSelected="" onSaveSubTask={onSaveSubTask} onRemoveSubTask={onRemoveSubTask}></SubTask>}
                                      {!subTask.id && <SubTask indexValue={index} onSubTaskStateChanged={onSubTaskStateChanged} title="" isSelected="" onSaveSubTask={onSaveSubTask} onRemoveSubTask={onRemoveSubTask}></SubTask>}
                                  </div>

                              )
                          })
                      }
                  </div>

              </div>}
              <SnaphyForm error={error} onSubmit={handleSubmit}>
                  <div className="task-detail-description-container">
                      <div className="task-detail-description-text">Description</div>
                      {/* <Field name={getTitleFieldName()} type="text" placeholder="Write a task name" size="large" rows="1" label="TaskTitle" component={InputElement} onDataChanged={onTitleDataChanged}></Field> */}
                      {selectedTask && selectedTask.description &&  <Field name="description" type="text" placeholder="Write a description Here" size="large" rows="3" label="TaskDescription" component={DescriptionField} invalid={props.invalid} submitting={props.submitting} pristine={props.pristine} descriptionData={selectedTask.description} onUpdateTaskDescription={onUpdateTaskDescription} taskId={selectedTask.id}></Field>}
                      {selectedTask && !selectedTask.description && <Field name="description" type="text" placeholder="Write a description Here" size="large" rows="3" label="TaskDescription" component={DescriptionField} invalid={props.invalid} submitting={props.submitting} pristine={props.pristine} onUpdateTaskDescription={onUpdateTaskDescription} taskId={selectedTask.id}></Field>}
                      {!selectedTask && <Field name="description" type="text" placeholder="Write a description Here" size="large" rows="3" label="TaskDescription" component={DescriptionField} invalid={props.invalid} submitting={props.submitting} pristine={props.pristine} onUpdateTaskDescription={onUpdateTaskDescription}></Field>}

                      {/* <Field name="title" type="text" placeholder="Write a task name" size="large" comonent={InputField}></Field> */}
                      {/* <Description placeholder="Write Description Here" style={{ minHeight: '150px', marginTop: '15px' }}></Description> */}

                  </div>
              </SnaphyForm>

              {props.attachmentList && props.attachmentList.length !== 0 && <div className="task-detail-attachment-container">
                  <div className="task-detail-attachment-text">Attachment</div>
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
                  <div className="task-detail-comment-text">Comments</div>
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
                                  <TaskComment indexValue={index} key={index} name={name} time={createdTime} comment={comment.title} onDeleteComment={onDeleteComment} commentId={comment.id}/>
                              )
                          })
                      }
                  </div>
              </div>}





          </div>
          <SnaphyForm error={error} onSubmit={handleSubmit}>
              <TaskCommentForm invalid={props.invalid} submitting={props.submitting} pristine={props.pristine}/>
          </SnaphyForm>



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


