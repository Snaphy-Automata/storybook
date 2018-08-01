export const ON_INPUT_FOCUSED = "on_input_focused";

export function inputFocusChagedAction(isFocused, label) {
    return (dispatch) => {
        dispatch({
            type: ON_INPUT_FOCUSED,
            payload: {
                label,
                isFocused
            }
        })
    }
}