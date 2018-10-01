import React from 'React';
import {Popup} from 'semantic-ui-react';


const PopupField = (props) => {
    const {isDialogOpened, onDialogStateChange, style, position, basic} = props;
    //sconsole.log("Popup Field Props", props);
    const onOpenDialog = () => {
        if(onDialogStateChange){
            onDialogStateChange(true);
        }
      
    }

    const onCloseDialog = () => {
        if(onDialogStateChange){
            onDialogStateChange(false);
        }
        
    }
    return (
        <Popup
        trigger={props.triggerComponent}
        content={props.contentComponent}
        on='click'
        basic
        open={isDialogOpened}
        position={position}
        style={style}
        basic={basic}
        onClose={onCloseDialog}
        onOpen={onOpenDialog}
        
        />
    )
}


export default PopupField;