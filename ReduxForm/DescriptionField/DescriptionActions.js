/**
 * Created by Nikita Mittal
 * 6th Sept 2018
 */

export const ON_CHANGE_FORMAT_DIALOG_STATE = "on_change_format_dialog_state";



export const onChangeFormatDialogStateAction = (taskId, isDialogOpened) => {
    console.log("Description Action getting called", taskId, isDialogOpened);
    return (dispatch) => {
        dispatch({
            type: ON_CHANGE_FORMAT_DIALOG_STATE,
            payload:{
                taskId,
                isDialogOpened
            }
        })
    }
}