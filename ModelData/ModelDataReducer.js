import {
    ON_TASK_DATA_FETCHED,
    ON_LOGIN_USER_DATA_FETCHED,
} from './ModelDataActions';

import {
    nomalizeTaskData,
} from './TaskHelper';

const initialState = {
    loginUserId: null,
    user: {
        byId:{}
    },
    label: {
        byId:{}
    },
    task: {
        byId:{}
    },
    status: {
        byId: {}   
    },
    project: {
        byId: {},
        allIds:[]   
    },
    projectAcl:{
        byId:{}
    },
    panel:{
        byId:{}
    },
    page:{
        byId:{}
    }
}


const ModelDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_TASK_DATA_FETCHED:{
            const taskObj = nomalizeTaskData(action.payload.taskList);
            state = {
                ...state,
                task:{
                    byId:{
                        ...state.task.byId,
                        ...taskObj,  
                    } 
                }
            }
            break;
        }
        case ON_LOGIN_USER_DATA_FETCHED:{
            state = {
                ...state,
                loginUserId: action.payload.user.id,
                user:{
                    byId:{
                        ...state.user.byId,
                        [action.payload.user.id]: action.payload.user,
                    }
                }
            }
            break;
        }

    }

    return state;
}




export default ModelDataReducer;