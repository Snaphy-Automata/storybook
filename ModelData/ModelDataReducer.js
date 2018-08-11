import {
    ON_TASK_DATA_FETCHED,
    ON_LOGIN_USER_DATA_FETCHED,
    ON_MEMBER_DATA_FETCHED,
    ON_LABEL_DATA_FETCHED
} from './ModelDataActions';

import {
    nomalizeTaskData,
} from './TaskHelper';

import {
    normalizeUserData
} from './MemberHelper';

import {
    normalizeLabelData
} from './LabelHelper';

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
            const {taskObj, taskIds, allTaskSectionId, activeTaskSectionId} = nomalizeTaskData(action.payload.taskList);
            let allTaskSectionNewId = state.project.byId[action.payload.projectId].allTaskSectionId?state.project.byId[action.payload.projectId].allTaskSectionId: allTaskSectionId;
            let activeTaskSectionNewId = state.project.byId[action.payload.projectId].activeTaskSectionId?state.project.byId[action.payload.projectId].activeTaskSectionId: activeTaskSectionId;
            state = {
                ...state,
                project:{
                    byId:{
                        ...state.project.byId,
                        [action.payload.projectId]:{
                            ...state.project.byId[action.payload.projectId],
                            allTaskSectionId: allTaskSectionNewId,
                            activeTaskSectionId: activeTaskSectionNewId,
                            activeTasks: [...state.project.byId[action.payload.projectId].activeTasks, ...taskIds],
                        }
                    }
                },
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
        case ON_MEMBER_DATA_FETCHED:{
            const userObj = normalizeUserData(action.payload.userList);
            state = {
                ...state,
                user:{
                    byId:{
                        ...state.user.byId,
                        ...userObj

                    }
                }
            }
            break;
        }
        case ON_LABEL_DATA_FETCHED:{
            const labelObj = normalizeLabelData(action.payload.labelList);
            state = {
                ...state,
                label:{
                    byId:{
                        ...state.label.byId,
                        ...labelObj

                    }
                }
            }
            break;
        }

    }

    return state;
}




export default ModelDataReducer;