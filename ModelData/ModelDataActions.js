/**
 * Created by Nikita
 * 11th Aug 2018
 */

export const ON_TASK_DATA_FETCHED         = "on_task_data_fetched";
export const ON_LOGIN_USER_DATA_FETCHED   = "on_login_user_data_fetched"; 

export const onTaskDataFetchedAction = (taskList) => {
    return (dispatch) => {
        dispatch({
            type: ON_TASK_DATA_FETCHED,
            payload:{
                taskList,
            }
        })
    }
};


export const onLoginUserAdded = (user) => {
    return (dispatch) => {
        dispatch({
            type: ON_LOGIN_USER_DATA_FETCHED,
            payload:{
                user,
            }
        })
    }
}
