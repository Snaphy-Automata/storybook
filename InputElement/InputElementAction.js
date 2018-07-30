export const ON_INPUT_FOCUSED = "on_input_focused";

export function inputFocusChagedAction(isFocused){
    return (dispatch) => {
        dispatch({
          type: ON_INPUT_FOCUSED,
          payload: isFocused,
        })
    }
}