import {INIT_DATA} from './ModelDataActions';


const initialState = {
    users : null,
    labels : null,
    status : null,
    section : null,
    task : null
}

const ModelDataReducer = (state = initialState, action) => {
    switch(action.type){
        case INIT_DATA:{
            let userObj = action.payload.user;
            let labelObj = action.payload.label;
            let statusObj = action.payload.status;
            let sectionObj = action.payload.section;
            let taskObj = action.payload.task;

            state = {
                ...state,
                users : userObj,
                labels : labelObj,
                status : statusObj,
                section : sectionObj,
                task : taskObj
            }
            console.log("Redux getting called", state);
        }
        break;
    }
    return state;
}

export default ModelDataReducer;