import {
    ON_INPUT_FOCUSED
} from './InputElementAction';


const initialState = {
    isFocused : false
}

const InputElementReducer = (state = initialState, action) => {
    switch(action.type){
        case ON_INPUT_FOCUSED:{
            state = {
                ...state,
                isFocused : action.payload
            }
            break;
        }
            

    }
    return state;
}

export default InputElementReducer;