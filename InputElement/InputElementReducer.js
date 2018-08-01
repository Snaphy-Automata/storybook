import {
    ON_INPUT_FOCUSED
} from './InputElementAction';


const initialState = {
}

const InputElementReducer = (state = initialState, action) => {
    switch(action.type){
        case ON_INPUT_FOCUSED:{
            state = {
                ...state,
                [action.payload.label]:{
                    isFocused : action.payload.isFocused
                }
                
            }
            break;
        }
            

    }
    return state;
}

export default InputElementReducer;