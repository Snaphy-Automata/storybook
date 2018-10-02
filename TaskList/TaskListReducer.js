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
    isOpened: false,
    isDateDialogOpened : false,
    assignedUserDialog:{
        taskId: null
    },
    dateDialog: {
        taskId : null
    },
    datePickerDialog :{
        taskId : null
    },
    quickUpdateDialog :{
        taskId : null,
        date : null
    },
    quickCurrentUpdateDate: {
        taskId : null,
        isTodaySelected : false,
        isTomorrowSelected : false,
        isNextWeekSelected : false
    },
    isTodaySelected : false,
    isTomorrowSelected : false,
    isNextWeekSelected : false,
    selectedMemberList : null,
    isTaskSelected : false,
    previousDateDialogId: null,
    isDurationClicked : false,
    durationData : {
        taskId : null,
        data: null
    },
    isMarkCompletedClicked : false,
    isStatusClicked : false,
    statusData : "Status",
    isUserButtonClicked : false,
    isLabelButtonClicked : false,
    selectedUserList : [],
    selectedLabelList : [],
    dateData : null,
    isDatePickerOpened : false,
    taskDateObj: {},
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
        case ON_DUE_DATE_UPDATED_ACTION:{
            state = {
                ...state,

            }
            break;
        }

        // case "on_task_update":{
        //   const task = action.payload
        //   console.time("on_title_update")
        //   if(task){
        //     state = {
        //       ...state,
        //       [task.id]: {
        //         ...task
        //       },
        //     }
        //   }
        //   console.timeEnd("on_title_update")
        //   break;
        // }

        // case ON_QUICK_UPDATE_DATE_DIALOG:{
        //     state = {
        //         ...state,
        //         quickUpdateDialog:{
        //             taskId: action.payload.taskId,
        //             date: action.payload.date
        //         }
        //     }
        // }
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
            state = {
                ...state,
                datePickerDialog:{
                    taskId: action.payload.state ? action.payload.id: null
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
                durationData :{
                    taskId: action.payload.taskId,
                    data: action.payload.data
                }
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

        case ON_STATUS_CLICKED:{
            state = {
                ...state,
                isStatusClicked : action.payload
            }
            break;
        }

        case STATUS_DATA:{
            state = {
                ...state,
                statusData : action.payload
            }
            break;
        }

        case  ON_USER_ADD_BUTTON_CLICKED:{
            state = {
                ...state,
                isUserButtonClicked : action.payload
            }
            break;
        }

        case ON_LABEL_ADD_BUTTON_CLICKED:{
            state = {
                ...state,
                isLabelButtonClicked : action.payload
            }
        }

        case ADD_SELECTED_USER_TO_LIST:{
            //console.log("Reducer getting called", state.selectedUserList, action.payload);
            state = {
                ...state,
                selectedUserList : [...action.payload]
            }
            break;
        }

        case ADD_SELECTED_LABEL_TO_LIST:{
            state = {
                ...state,
                selectedLabelList : [...action.payload]
            }
        }

        case ON_OPEN_DATE_PICKER:{
            state = {
                ...state,
                [action.payload.id]:{
                    isDatePickerOpened : action.payload.data,
                    dateData : action.payload.dateData
                },

            }
            break;
        }

        case SET_DATE_DATA:{
            state = {
                ...state,
                [action.payload.id]:{
                    dateData : action.payload.data,
                    isDatePickerOpened : action.payload.isDatePickerOpened,
                    taskId : action.payload.taskId
                }
            }
            break;
        }

        case ON_QUICK_CURRENT_UPDATE_DATE:{
            state = {
                ...state,
                quickCurrentUpdateDate:{
                    taskId : action.payload.taskId,
                    isTodaySelected : action.payload.isTodaySelected,
                    isTomorrowSelected : action.payload.isTomorrowSelected,
                    isNextWeekSelected : action.payload.isNextWeekSelected
                }
            }
            //console.log("Change Date Reducer getting called", state.quickCurrentUpdateDate);
            break;
        }

        case ON_TASK_DATE_CHANGE_ACTION:{
            state = {
                ...state,
                taskDateObj:{
                    ...state.taskDateObj,
                    [action.payload.dateType]: {
                        ...state.taskDateObj[action.payload.dateType],
                        dateData: action.payload.dateData
                    }
                }
            }
            break;
        }

    }
    return state;
}

export default TaskListReducer;
