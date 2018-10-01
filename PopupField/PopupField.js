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
            console.log("I am getting called");
            onDialogStateChange(false);
        }
        
    }
    return (
        <Popup
        trigger={props.triggerComponent}
        content={props.contentComponent}
        on='click'
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