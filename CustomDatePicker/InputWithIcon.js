import React from 'react';
import {Input} from 'semantic-ui-react';

//import {} from '../../AllTaskActions';

const InputWithIcon = (props) => {

    const onBlurEvent = function(){
        console.log("On Blur");

    }
    return (
        <Input
            {...props}
            size="tiny"
            onBlur={onBlurEvent}
            autoFocus
            icon='calendar minus outline'
            iconPosition='left'>
        </Input>
    )
}


export default InputWithIcon;