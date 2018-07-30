export const ON_OPEN_DATE_PICKER = "on_open_date_picker";
export const SET_DATE_DATA       = "set_date_data";

export function onOpenDatePickerAction(isOpened){
    return (dispatch) => {
        dispatch({
            type : ON_OPEN_DATE_PICKER,
            payload : isOpened
        })
    }
}


export function setDateAction(data){
    return (dispatch) => {
        dispatch({
            type : SET_DATE_DATA,
            payload : data
        })
    }
}