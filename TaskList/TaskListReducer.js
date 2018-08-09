import {
    ON_TASK_LIST_EXAPANDED,
    TASK_LIST,
    ON_SECTION_EXPANDED,
    SECTION_TASK_LIST,
    ON_OPEN_CHANGE_DATE_DIALOG,
    ON_OPEN_ASSIGNED_USER_DIALOG,
    ON_SELECT_DATE,
    SELECTED_MEMBER_LIST,
    ON_MEMBER_SELECTED,
    ON_DATE_PICKER_OPENED,
    ON_TASK_SELECTED,
    TASK_DATA,
    LIST_CURSOR_DATA,
    ON_DURATION_STATE_CHANGED,
    DURATION_DATA,
    IS_COMPLTETED_CLICKED,
} from './TaskListActions';


const initialState = {
    isOpened: false,
    isDateDialogOpened : false,
    isAssinedUserDialogOpened : false,
    isTodaySelected : false,
    isTomorrowSelected : false,
    isNextWeekSelected : false,
    selectedMemberList : null,
    isTaskSelected : false,
    taskData : null,
    cursor : 0,
    previousDateDialogId: null,
    isDurationClicked : false,
    durationData : null,
    isMarkCompletedClicked : false
}

const TaskListReducer = (state = initialState, action) => {
    //console.log("Reducer called Init", action, state);
    switch (action.type) {
        case ON_TASK_LIST_EXAPANDED: {
            state = {
                ...state,
                isOpened: action.payload
            }
            break;
        }
        case TASK_LIST: {
            state = {
                ...state,
                taskList: action.payload
            }
            break;
        }
        case ON_SECTION_EXPANDED: {
            state = {
                ...state,
                [action.payload.sectionKey]: {
                    isOpened: action.payload.isOpened
                }
            }
            break;
        }
        case SECTION_TASK_LIST: {
            state = {
                ...state,
                sectionList: action.payload,
            }

            break;
        }
        case ON_OPEN_CHANGE_DATE_DIALOG:{
            state = {
                ...state,
                [action.payload.id]:{
                    
                    isDateDialogOpened : action.payload.data,
                }
            }
            break;
        }
        case ON_OPEN_ASSIGNED_USER_DIALOG:{
            state = {
                ...state,
                [action.payload.id]:{
                    isAssinedUserDialogOpened : action.payload.data
                }
            }
            break;
        }
        case ON_SELECT_DATE:{
            let type = action.payload.dataType;
            let todayValue;
            let tomorrowValue;
            let nextWeekValue;
            if(type === "today"){
                todayValue = action.payload.data;
                tomorrowValue = false;
                nextWeekValue = false;
            } else if(type === "tomorrow"){
                tomorrowValue = action.payload.data;
                todayValue = false;
                nextWeekValue = false;
            } else if(type === "next week"){
                nextWeekValue = action.payload.data;
                todayValue = false;
                tomorrowValue = false;
            }
            state = {
                ...state,
                [action.payload.id]: {
                    isDateDialogOpened : action.payload.isDateDialogOpened,
                    isTodaySelected : todayValue,
                    isTomorrowSelected : tomorrowValue,
                    isNextWeekSelected : nextWeekValue
                }
               

            }
            break;
        }

        case ON_DATE_PICKER_OPENED:{
            if(action.payload.previousId){
                state = {
                    ...state,
                    [action.payload.previousId]:{
                        isDatePickerOpened : false
                    }
                }
            }
            state = {
                ...state,
                previousDateDialogId : action.payload.id,
                [action.payload.id]:{
                    isDatePickerOpened : action.payload.data
                }
            }
            break;
        }

        case SELECTED_MEMBER_LIST:{
            state = {
                ...state,
                selectedMemberList : action.payload
            }
            break;
        }

        case ON_MEMBER_SELECTED:{
            let selectedMemberDataList  = [...state.selectedMemberList];
            let listCount =0;
            for(var i=0;i<selectedMemberDataList.length;i++){
                if(selectedMemberDataList[i].member === action.payload.memberId){
                    selectedMemberDataList.splice(i, 1, {member: action.payload.memberId, isSelected: action.payload.isSelected});
                    break;
                } 
                listCount++;
            }
            if(listCount === selectedMemberDataList.length){
                selectedMemberDataList.push({member: action.payload.memberId, isSelected: action.payload.isSelected});
            }
            state = {
                ...state,
                selectedMemberList : selectedMemberDataList
            }
            break;
        }

        case ON_TASK_SELECTED:{
            state = {
                ...state,
                [action.payload.id]:{
                    isTaskSelected : action.payload.data
                }
            }
            break;
        }

        case TASK_DATA:{
            state = {
                ...state,
                taskData : action.payload
            }
            break;
        }

        case LIST_CURSOR_DATA:{
            state = {
                ...state,
                cursor : action.payload
            }
            break;
        }

        case ON_DURATION_STATE_CHANGED:{
            state = {
                ...state,
                isDurationClicked : action.payload
            }
            break;
        }

        case DURATION_DATA:{
            state = {
                ...state,
                durationData : action.payload
            }
            break;
        }

        case IS_COMPLTETED_CLICKED:{
            state = {
                ...state,
                isMarkCompletedClicked : action.payload
            }
            break;
        }

    }
    return state;
}

export default TaskListReducer;