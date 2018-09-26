import {
  ON_LABEL_DIALOG_DATA_INITIALIZE
} from './LabelDialogAction';



const initialState = {
  labelDialogFormDataInit : {
    colorCode: "#3b86ff"
  },
}

const LabelDialogReducer = (state = initialState, action) => {
  switch(action.type){
    case ON_LABEL_DIALOG_DATA_INITIALIZE:{
      let data = action.payload
      if(!data){
        data = {
          colorCode: "#3b86ff"
        }
      }
      state = {
        ...state,
        labelDialogFormDataInit: {...data}
      }
      break;
    }
  }
  return state;
}

export default LabelDialogReducer;
