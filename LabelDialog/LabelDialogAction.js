/**
 * Created by Robins Gupta
 * 25th Sept 2018
 */
export const ON_LABEL_DIALOG_DATA_INITIALIZE = "on_label_dialog_data_initialize";


const initializeLabelData = (data) => {
  return {
    type: ON_LABEL_DIALOG_DATA_INITIALIZE,
    payload: data
  }
}


/**
 * Will Store the label form data..
 * @param {*} formObj
 */
export const initializeLabelDialogFormDataAction = (labelId) => {
  return (dispatch, getState) => {
    const modelData = getState().ModelDataReducer
    let labelData;
    if(labelId){
      labelData = modelData.label.byId[labelId]
    }
    dispatch(initializeLabelData(labelData))
  }
}




