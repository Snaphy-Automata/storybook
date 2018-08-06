export const ON_TASK_LIST_EXAPANDED = "on_all_task_list_expanded";
export const TASK_LIST              = "task_list";

export const ON_SECTION_EXPANDED    = "on_section_expanded";
export const SECTION_TASK_LIST      = "section_task_list";
export const ON_OPEN_CHANGE_DATE_DIALOG = "on_open_change_date_dialog";
export const ON_OPEN_ASSIGNED_USER_DIALOG = "on_open_assigned_user_dialog"
export const ON_SELECT_DATE = "on_select_date"


export function sectionExpandedAction(sectionKey, isOpened){
    return (dispatch) => {
        dispatch({
            type : ON_SECTION_EXPANDED,
            payload : {
                sectionKey,
                isOpened
            }
        })
    }
}

export function populateSectionTaskList(sectionList){
    return (dispatch) => {
        dispatch({
            type : SECTION_TASK_LIST,
            payload : sectionList
        })
    }
}


export function expandTaskListAction(isOpened){
    return (dispatch) => {
        dispatch({
          type: ON_TASK_LIST_EXAPANDED,
          payload: isOpened,
        })
    }
}


export function populateTaskListAction(taskList){
    return (dispatch) => {
        dispatch({
            type: TASK_LIST,
            payload: taskList
        })
    }
}

export function onOpenChangeDateDialogAction(data, id){
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

export function onSelectDateAction(dataType, data, id){
    //console.log("Action getting called", dataType, data);
    return (dispatch) => {
        dispatch({
            type : ON_SELECT_DATE,
            payload : {
                dataType,
                data,
                id
            }
        })
    }
}


