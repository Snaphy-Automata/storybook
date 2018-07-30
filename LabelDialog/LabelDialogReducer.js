import {
    INITIALIZE_LABEL_DIALOG_FORM_DATA
} from './LabelDialogAction';


const initialState = {
    initializeLabelDialogFormData : null,
}

const LabelDialogReducer = (state = initialState, action) => {
    switch(action.type){
        case INITIALIZE_LABEL_DIALOG_FORM_DATA:{
            state = {
                ...state,
                initializeLabelDialogFormData : action.payload
            }
            break;
        }
            
    }

    return state;
}

export default LabelDialogReducer;