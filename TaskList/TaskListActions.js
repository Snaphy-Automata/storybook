
export const ON_OPEN_CHANGE_DATE_DIALOG           = "on_open_change_date_dialog";
export const ON_OPEN_ASSIGNED_USER_DIALOG         = "on_open_assigned_user_dialog";
export const ON_SELECT_DATE                       = "on_select_date";
export const SELECTED_MEMBER_LIST                 = "selected_member_list";
export const ON_MEMBER_SELECTED                   = "on_member_selected";
export const ON_DATE_PICKER_OPENED                = "on_date_picker_opened";
export const ON_DURATION_STATE_CHANGED            = "on_duration_state_changed";
export const DURATION_DATA                        = "duration_data";
export const IS_COMPLTETED_CLICKED                = "is_completed_clicked";
export const ON_STATUS_CLICKED                    = "on_status_changed";
export const STATUS_DATA                          = "status_data";
export const ON_USER_ADD_BUTTON_CLICKED           = "on_user_add_button_clicked";
export const ADD_SELECTED_USER_TO_LIST            = "add_selected_user_to_list";
export const ADD_SELECTED_LABEL_TO_LIST           = "add_selected_label_ti_list";
export const ON_OPEN_DATE_PICKER                  = "on_open_date_picker";
export const SET_DATE_DATA                        = "set_date_data";
export const ON_LABEL_ADD_BUTTON_CLICKED          = "on_label_add_button_clicked";
export const ON_DUE_DATE_UPDATED_ACTION           = "on_due_date_updated_action";
export const ON_QUICK_CURRENT_UPDATE_DATE         = "on_quick_current_update_date";

export function onOpenChangeDateDialogAction(state, id){
    //console.log("Change date Dialog Action called", data, id)
    return (dispatch) => {
        dispatch({
            type : ON_OPEN_CHANGE_DATE_DIALOG,
            payload : {
                id,
                state
            }
        })
    }
}

/**
 * Will get called on closing or opening of assigned user dialog.
 * state: Boolean
 * id: taskId
 */
export function onOpenAssignedUserDialogAction(state, id){
    return (dispatch) => {
        console.log("Open Assigned getting called", state, id);
        dispatch({
            type: ON_OPEN_ASSIGNED_USER_DIALOG,
            payload : {
                id,
                state
            }
        })
    }
}


// /**
//  * When a due date value is assigned through any dialog..
//  * @param {*} taskId 
//  * @param {*} dueDate 
//  * @param {*} onDueDateUpdatedMutation 
//  */
// export const onDueDateUpdatedAction = (taskId, dueDate, onDueDateUpdatedMutation) => {
//     return (dispatch) => {
//         dispatch({
//             type: ON_DUE_DATE_UPDATED_ACTION,
//             taskId,
//             dueDate,
//             onDueDateUpdatedMutation,
//         });
//     }
// }

//Deprecated
export function onSelectDateAction(dataType, data, id, isDateDialogOpened){
    //console.log("Action getting called", dataType, data);
    return (dispatch) => {
        dispatch({
            type : ON_SELECT_DATE,
            payload : {
                dataType,
                data,
                id,
                isDateDialogOpened
            }
        })
    }
}

export function getSelectedMemberListAction(selectedMemberList){
    return (dispatch) => {
        dispatch({
            type : SELECTED_MEMBER_LIST,
            payload : selectedMemberList
        })
    }
}


export function onMemberSelectedAction(memberId, isSelected){
    return (dispatch) => {
        dispatch({
            type : ON_MEMBER_SELECTED,
            payload : {
                memberId,
                isSelected
            }
        })
    }
}

export function onDatePickerOpenedAction(data, id){
    return (dispatch) => {
        dispatch({
            type : ON_DATE_PICKER_OPENED,
            payload : {
                id,
                data
            }
        })
    }
}




export function onDurationStateChangedAction(data){
    return (dispatch) => {
        dispatch({
            type : ON_DURATION_STATE_CHANGED,
            payload : data
        })
    }
}

export function getDurationDataAction(data, taskId){
    return (dispatch) => {
        dispatch({
            type : DURATION_DATA,
            payload : {
                data,
                taskId
            }
        })
    }
}

export function onMarkCompleteClickedAction(data){
    return (dispatch) => {
        dispatch({
            type : IS_COMPLTETED_CLICKED,
            payload : data
        })
    }
}

export function onStatusChangedAction(data){
    return (dispatch) => {
        dispatch({
            type : ON_STATUS_CLICKED,
            payload : data
        })
    }
}


export function getStatusDataAction(data){
    return (dispatch) => {
        dispatch({
            type : STATUS_DATA,
            payload : data
        })
    }
}


export function onUserAddButtonClickedAction(isButtonClicked){
    return (dispatch) => {
        dispatch({
            type : ON_USER_ADD_BUTTON_CLICKED,
            payload : isButtonClicked
        })
    }

}

export function addSelectedUserToListAction(selectedUserList){
    return (dispatch) => {
        dispatch({
            type : ADD_SELECTED_USER_TO_LIST,
            payload : selectedUserList
        })
    }
}

export function addSelectedLabelToListAction(selectedLabelList){
    return (dispatch) => {
        dispatch({
            type : ADD_SELECTED_LABEL_TO_LIST,
            payload : selectedLabelList
        })
    }
}


export function onDatePickerStateChangedAction(id, data, dateData){
    return (dispatch) => {
        dispatch({
            type : ON_OPEN_DATE_PICKER,
            payload : {
                id,
                data,
                dateData
            }
        })
    }
}

export function setDateDataAction(id, data, isDatePickerOpened, taskId){
    return (dispatch) => {
        dispatch({
            type : SET_DATE_DATA,
            payload : {
                id,
                data,
                isDatePickerOpened,
                taskId
            }
        })
    }
}

export function onLabelAddButtonClickedAction(isButtonClicked){
    return (dispatch) => {
        dispatch({
            type : ON_LABEL_ADD_BUTTON_CLICKED,
            payload : isButtonClicked
        })
    }
}

export function onQuickUpdateCurrentDateAction(taskId, isTodaySelected, isTomorrowSelected, isNextWeekSelected){
    return (dispatch) => {
        dispatch({
            type : ON_QUICK_CURRENT_UPDATE_DATE,
            payload: {
                taskId,
                isTodaySelected,
                isTomorrowSelected,
                isNextWeekSelected
            }
        })
    }
}




