/**
 * Created by Nikita
 * 11th Aug 2018
 */

export const ON_TASK_DATA_FETCHED         = "on_task_data_fetched";
export const ON_LOGIN_USER_DATA_FETCHED   = "on_login_user_data_fetched"; 
export const ON_MEMBER_DATA_FETCHED       = "on_member_data_fetched";
export const ON_LABEL_DATA_FETCHED        = "on_label_data_fetched";
export const ON_STATUS_DATA_FETCHED       = "on_status_data_fetched";
export const ON_PROJECT_ACL_FETCHED       = "on_project_acl_fetched";


export const onTaskDataFetchedAction = (projectId, taskList) => {
    return (dispatch) => {
        dispatch({
            type: ON_TASK_DATA_FETCHED,
            payload:{
                projectId,
                taskList,
            }
        })
    }
};


export const onLoginUserFetched = (user) => {
    return (dispatch) => {
        dispatch({
            type: ON_LOGIN_USER_DATA_FETCHED,
            payload:{
                user,
            }
        })
    }
}


export const onMemberDataFetched = (projectId, userList) => {
    return (dispatch) => {
        dispatch({
            type : ON_MEMBER_DATA_FETCHED,
            payload : {
                projectId,
                userList
            }
        })
    }
}

export const onLabelDataFetched = (projectId, labelList) => {
    return (dispatch) => {
        dispatch({
            type : ON_LABEL_DATA_FETCHED,
            payload : {
                projectId,
                labelList,
            }
        })
    }
}

export const onStatusDataFetched  = (projectId, statusList) => {
    return (dispatch) => {
        dispatch({
            type : ON_STATUS_DATA_FETCHED,
            payload : {
                projectId,
                statusList
            }
        })
    }
}

export const onProjectAclFetched = (projectAclList) => {
    return (dispatch) => {
        dispatch({
            type : ON_PROJECT_ACL_FETCHED,
            payload : {
                projectId,
                projectAclList
            }
        })
    }
}



