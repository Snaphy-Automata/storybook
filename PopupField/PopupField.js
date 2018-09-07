import React from 'React';
import {Popup} from 'semantic-ui-react';


const PopupField = (props) => {
    const {isDialogOpened, onDialogStateChange} = props;
    //sconsole.log("Popup Field Props", props);
    const onOpenDialog = () => {
        onDialogStateChange(true);
    }

    const onCloseDialog = () => {
        //onDialogStateChange(false);
    }
    return (
        <Popup
        trigger={props.triggerComponent}
        content={props.contentComponent}
        on='click'
        basic
        open={isDialogOpened}
        style={props.style}
        onClose={onOpenDialog}
        onOpen={onCloseDialog}
        
        />
    )
}


export default PopupField;