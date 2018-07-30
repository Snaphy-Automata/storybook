import {
    ON_OPEN_DATE_PICKER,
    SET_DATE_DATA
} from './DatePickerAction';

const initialState = {
    isDatePickerOpened : false,
    dateData : null
}


const DatePickerReducer = (state = initialState, action) => {
    switch(action.type){
        case ON_OPEN_DATE_PICKER:{
            state = {
                ...state,
                isDatePickerOpened : action.payload
            }
            break;
        }
        case SET_DATE_DATA:{
            state = {
                ...state,
                dateData : action.payload
            }
            break;
        }
    }
    return state;
}




export default DatePickerReducer;