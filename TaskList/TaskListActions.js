
export const ON_OPEN_CHANGE_DATE_DIALOG           = "on_open_change_date_dialog";
export const ON_OPEN_ASSIGNED_USER_DIALOG         = "on_open_assigned_user_dialog";
export const ON_SELECT_DATE                       = "on_select_date";
export const SELECTED_MEMBER_LIST                 = "selected_member_list";
export const ON_MEMBER_SELECTED                   = "on_member_selected";
export const ON_DATE_PICKER_OPENED                = "on_date_picker_opened";
export const ON_TASK_SELECTED                     = "on_task_selected";
export const TASK_DATA                            = "task_data";
export const LIST_CURSOR_DATA                     = "list_cursor_data";
export const STORE_PREVIOUS_DATE_DIALOG_STATE     = "store_previous_date_dialog_state";
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


export function onOpenChangeDateDialogAction(data, id){
    //console.log("Change date Dialog Action called", data, id)
    return (dispatch) => {
        dispatch({
            type : ON_OPEN_CHANGE_DATE_DIALOG,
            payload : {
                id,
                data
            }
        })
    }
}

export function onOpenAssignedUserDialogAction(data, id){
    return (dispatch) => {
        dispatch({
            type: ON_OPEN_ASSIGNED_USER_DIALOG,
            payload : {
                id,
                data
            }
        })
    }
}

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


export function onTaskSelectedAction(data, id){
    return (dispatch) => {
        dispatch({
            type : ON_TASK_SELECTED,
            payload : {
                id,
                data
            }
        })
    }
}

export function getSelectedtaskItemAction(data){
    return (dispatch) => {
        dispatch({
            type : TASK_DATA,
            payload : data
        })
    }
}

export function setCursorValueAction(data){
    return (dispatch) => {
        dispatch({
            type : LIST_CURSOR_DATA,
            payload : data
        })
    }
}

export function storeDateDialogState(taskId){
    return (dispatch) => {
        dispatch({
            type : STORE_PREVIOUS_DATE_DIALOG_STATE,
            payload : taskId
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

export function getDurationDataAction(data){
    return (dispatch) => {
        dispatch({
            type : DURATION_DATA,
            payload : data
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

export function setDateDataAction(id, data, isDatePickerOpened){
    return (dispatch) => {
        dispatch({
            type : SET_DATE_DATA,
            payload : {
                id,
                data,
                isDatePickerOpened
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


