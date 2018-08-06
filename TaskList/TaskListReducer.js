import {
    ON_TASK_LIST_EXAPANDED,
    TASK_LIST,
    ON_SECTION_EXPANDED,
    SECTION_TASK_LIST,
    ON_OPEN_CHANGE_DATE_DIALOG,
    ON_OPEN_ASSIGNED_USER_DIALOG,
    ON_SELECT_DATE
} from './TaskListActions';
import { isToday } from 'date-fns';


const initialState = {
    isOpened: false,
    isDateDialogOpened : false,
    isAssinedUserDialogOpened : false,
    isTodaySelected : false,
    isTomorrowSelected : false,
    isNextWeekSelected : false,
    sectionList: [
        {
            sectionId: "section1",
            title: "Active Tasks",
            items: [
                {
                    id: 1,
                    title: "This is the first issue to be solved",
                    icon: {
                        title: "Nikita",
                        toolTip: "Nikita",
                        onClick: "Items has been clicked"
                    },
                    status: {
                        title: "Completed",
                        color: "#1ed0c1"
                    },
                    subTask: {
                        total: 9,
                        completed: 4
                    },
                    attachment: 3,
                    labels: [
                        { title: "Bug", color: "#ff9b00", onClick: "Bug" }
                    ],
                    dueDate: {
                        date: "2018-07-10T01:14:00Z",
                        onClick: "Date has been clicked"
                    }
                },
                {
                    id: 2,
                    title: "Disable the button after clicking and then enable the button after getting response",
                    icon: {
                        icon: "users",
                        toolTip: "Nikita, Mitsu, Sakura",
                        onClick: "Items has been clicked"
                    },
                    status: {
                        title: "In Progress",
                        color: "#3b86ff"
                    },
                    subTask: {
                        total: 15,
                        completed: 10
                    },
                    attachment: 6,
                    dueDate: {
                        date: "2018-07-23T01:14:00Z",
                        onClick: "Date has been clicked"
                    }
                },
                {
                    id: 3,
                    title: "Not able to login",
                    icon: {
                        icon: "users",
                        toolTip: "Nikita, Mitsu, Sakura",
                        onClick: "Items has been clicked"
                    },
                    status: {
                        title: "In Progress",
                        color: "#3b86ff"
                    },
                    subTask: {
                        total: 15,
                        completed: 10
                    },
                    attachment: 6,
                    dueDate: {
                        date: "2018-07-23T01:14:00Z",
                        onClick: "Date has been clicked"
                    }
                },
                {
                    id: 4,
                    title: "Logout not working properly",
                    icon: {
                        icon: "users",
                        toolTip: "Nikita, Mitsu, Sakura",
                        onClick: "Items has been clicked"
                    },
                    status: {
                        title: "In Progress",
                        color: "#3b86ff"
                    },
                    subTask: {
                        total: 15,
                        completed: 10
                    },
                    attachment: 6,
                    dueDate: {
                        date: "2018-07-23T01:14:00Z",
                        onClick: "Date has been clicked"
                    }
                }
            ]

        },
        {
            sectionId: "section2",
            title: "All Tasks",
            items: [
                {
                    id: 5,
                    title: "Second issue to be solved",
                    icon: {
                        title: "Nikita",
                        toolTip: "Nikita",
                        onClick: "Items has been clicked"
                    },
                    status: {
                        title: "Completed",
                        color: "#1ed0c1"
                    },
                    subTask: {
                        total: 9,
                        completed: 4
                    },
                    attachment: 3,
                    labels: [
                        { title: "Bug", color: "#ff9b00", onClick: "Bug" }
                    ],
                    dueDate: {
                        date: "2018-07-10T01:14:00Z",
                        onClick: "Date has been clicked"
                    }
                },
                {
                    id: 6,
                    title: "Enable all buttons after getting response",
                    icon: {
                        icon: "users",
                        toolTip: "Nikita, Mitsu, Sakura",
                        onClick: "Items has been clicked"
                    },
                    status: {
                        title: "In Progress",
                        color: "#3b86ff"
                    },
                    subTask: {
                        total: 15,
                        completed: 10
                    },
                    attachment: 6,
                    dueDate: {
                        date: "2018-07-23T01:14:00Z",
                        onClick: "Date has been clicked"
                    }
                },
                {
                    id: 7,
                    title: "Facebook Login not working",
                    icon: {
                        icon: "users",
                        toolTip: "Nikita, Mitsu, Sakura",
                        onClick: "Items has been clicked"
                    },
                    status: {
                        title: "In Progress",
                        color: "#3b86ff"
                    },
                    subTask: {
                        total: 15,
                        completed: 10
                    },
                    attachment: 6,
                    dueDate: {
                        date: "2018-07-23T01:14:00Z",
                        onClick: "Date has been clicked"
                    }
                },
                {
                    id: 8,
                    title: "Not able to get the otp messages",
                    icon: {
                        icon: "users",
                        toolTip: "Nikita, Mitsu, Sakura",
                        onClick: "Items has been clicked"
                    },
                    status: {
                        title: "In Progress",
                        color: "#3b86ff"
                    },
                    subTask: {
                        total: 15,
                        completed: 10
                    },
                    attachment: 6,
                    dueDate: {
                        date: "2018-07-23T01:14:00Z",
                        onClick: "Date has been clicked"
                    }
                }
            ]
        }
    ],
    taskList: [
        {
            id: 1,
            title: "This is the first issue to be solved",
            icon: {
                title: "Nikita",
                toolTip: "Nikita",
                onClick: "Items has been clicked"
            },
            status: {
                title: "Completed",
                color: "#1ed0c1"
            },
            subTask: {
                total: 9,
                completed: 4
            },
            attachment: 3,
            labels: [
                { title: "Bug", color: "#ff9b00", onClick: "Bug" }
            ],
            dueDate: {
                date: "2018-07-10T01:14:00Z",
                onClick: "Date has been clicked"
            }
        },
        {
            id: 2,
            title: "Disable the button after clicking and then enable the button after getting response",
            icon: {
                icon: "users",
                toolTip: "Nikita, Mitsu, Sakura",
                onClick: "Items has been clicked"
            },
            status: {
                title: "In Progress",
                color: "#3b86ff"
            },
            subTask: {
                total: 15,
                completed: 10
            },
            attachment: 6,
            dueDate: {
                date: "2018-07-23T01:14:00Z",
                onClick: "Date has been clicked"
            }
        },
        {
            id: 3,
            title: "Not able to login",
            icon: {
                icon: "users",
                toolTip: "Nikita, Mitsu, Sakura",
                onClick: "Items has been clicked"
            },
            status: {
                title: "In Progress",
                color: "#3b86ff"
            },
            subTask: {
                total: 15,
                completed: 10
            },
            attachment: 6,
            dueDate: {
                date: "2018-07-23T01:14:00Z",
                onClick: "Date has been clicked"
            }
        },
        {
            id: 4,
            title: "Logout not working properly",
            icon: {
                icon: "users",
                toolTip: "Nikita, Mitsu, Sakura",
                onClick: "Items has been clicked"
            },
            status: {
                title: "In Progress",
                color: "#3b86ff"
            },
            subTask: {
                total: 15,
                completed: 10
            },
            attachment: 6,
            dueDate: {
                date: "2018-07-23T01:14:00Z",
                onClick: "Date has been clicked"
            }
        }
    ]
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
                    isDateDialogOpened : action.payload.data
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
                    isTodaySelected : todayValue,
                    isTomorrowSelected : tomorrowValue,
                    isNextWeekSelected : nextWeekValue
                }
               

            }
            //console.log("Date Reducer getting called", state.isTodaySelected, state.isTomorrowSelected, state.isNextWeekSelected);

           
            break;
        }
    }
    return state;
}

export default TaskListReducer;