export const INIT_DATA = "init_data";


export function initializeDataAction(data){
    return (dispatch) =>{
        dispatch({
            type : INIT_DATA,
            payload: data
        })
    }
}