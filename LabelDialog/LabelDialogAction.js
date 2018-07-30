export const INITIALIZE_LABEL_DIALOG_FORM_DATA = "initialize_label_dialog_form_data";


export function initializeLabelDialogFormAction(formData){
    return (dispatch) => {
        dispatch({
            type : INITIALIZE_LABEL_DIALOG_FORM_DATA,
            payload : formData
        })
    }
}




