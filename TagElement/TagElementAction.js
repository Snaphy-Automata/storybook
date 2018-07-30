export const ON_ADD_BUTTON_CLICKED = "on_add_button_clicked";
export const OPTIONS_LIST         = "options_list";
export const ON_ADD_TAG_ELEMENT = "on_add_tag_element";
export const DELETE_LABEL_ACTION  = "delete_label_action";
export const ADD_LABEL_ACTION     = "add_label_action";
export const EDIT_LABEL_ACTION    = "edit_label_action";


export function onAddButtonClickedAction(isButtonClicked){
    return (dispatch) => {
        dispatch({
            type : ON_ADD_BUTTON_CLICKED,
            payload : isButtonClicked
        })
    }

}


export function addOptionsAction(optionData){
    return (dispatch) => {
        dispatch({
            type : OPTIONS_LIST,
            payload: optionData
        })
    }
}


export function addTagElementAction(tagObj){
    return(dispatch) => {
        dispatch({
            type : ON_ADD_TAG_ELEMENT,
            payload: tagObj
        })
    }
}

export function deleteLabelAction(labelObj){
    return (dispatch) => {
        dispatch({
            type : DELETE_LABEL_ACTION,
            payload : labelObj
        })
    }
}

export function addLabelAction(labelObj){
    return (dispatch) => {
        dispatch({
            type : ADD_LABEL_ACTION,
            payload : labelObj
        })
    }
}

export function editLabelAction(labelObj){
    return (dispatch) => {
        dispatch({
            type : EDIT_LABEL_ACTION,
            payload : labelObj
        })
    }
}


