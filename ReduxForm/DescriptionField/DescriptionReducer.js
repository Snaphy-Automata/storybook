/**
 * Created By Nikita Mittal
 * 6th Sept 2018
 */

 import {
    ON_CHANGE_FORMAT_DIALOG_STATE
 } from './DescriptionActions';


 const initialState = {
     isDialogOpened : {
         taskId: null
     }
 }

const DescriptionReducer = (state = initialState, action) => {
    switch(action.type){
        case ON_CHANGE_FORMAT_DIALOG_STATE:{
            //console.log("Description Reducer getting called");
            state = {
                ...state,
                isDialogOpened:{
                    taskId: action.payload.isDialogOpened? action.payload.taskId : null
                }
            }
            break;
        }
       
    }
    //console.log("Updated State", state);

    return state;
}

export default DescriptionReducer;