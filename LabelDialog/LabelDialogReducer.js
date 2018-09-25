import {
  ON_LABEL_DIALOG_DATA_INITIALIZE
} from './LabelDialogAction';


const initialState = {
  labelDialogFormDataInit : null,
}

const LabelDialogReducer = (state = initialState, action) => {
  switch(action.type){
    case ON_LABEL_DIALOG_DATA_INITIALIZE:{
      state = {
        ...state,
        labelDialogFormDataInit: action.payload
      }
      break;
    }
  }
  return state;
}

export default LabelDialogReducer;
