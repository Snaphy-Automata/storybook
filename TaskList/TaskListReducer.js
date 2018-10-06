import {
    ON_OPEN_CHANGE_DATE_DIALOG,
    ON_OPEN_ASSIGNED_USER_DIALOG,
    ON_SELECT_DATE,
    SELECTED_MEMBER_LIST,
    ON_MEMBER_SELECTED,
    ON_DATE_PICKER_OPENED,
    ON_DURATION_STATE_CHANGED,
    DURATION_DATA,
    IS_COMPLTETED_CLICKED,
    ON_STATUS_CLICKED,
    STATUS_DATA,
    ON_USER_ADD_BUTTON_CLICKED,
    ON_LABEL_ADD_BUTTON_CLICKED,
    ADD_SELECTED_USER_TO_LIST,
    ADD_SELECTED_LABEL_TO_LIST,
    ON_OPEN_DATE_PICKER,
    SET_DATE_DATA,
    ON_DUE_DATE_UPDATED_ACTION,
    ON_QUICK_CURRENT_UPDATE_DATE,
    ON_TASK_DATE_CHANGE_ACTION
} from './TaskListActions';


const initialState = {
    assignedUserDialog:{
        taskId: null
    },
    dateDialog: {
        taskId : null
    },
    datePickerDialog :{
        taskId : null
    },
}

const TaskListReducer = (state = initialState, action) => {
    //console.log("Reducer called Init", action, state);
    switch (action.type) {
        case ON_OPEN_CHANGE_DATE_DIALOG:{
            state = {
                ...state,
                dateDialog:{
                    taskId : action.payload.state ? action.payload.id: null
                }
            }
            break;
        }
        case ON_OPEN_ASSIGNED_USER_DIALOG:{
            state = {
                ...state,
                assignedUserDialog:{
                    taskId: action.payload.state?action.payload.id: null
                }
            }
            break;
        }

        case ON_DATE_PICKER_OPENED:{
            state = {
                ...state,
                datePickerDialog:{
                    taskId: action.payload.state ? action.payload.id: null
                }
            }
            break;
        }



    }
    return state;
}

export default TaskListReducer;
