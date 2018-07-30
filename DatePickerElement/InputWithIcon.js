import React from 'react';
import {Input} from 'semantic-ui-react';

const InputWithIcon = (props) => {
    return (
        <Input
            {...props}
            size="tiny"
            icon='calendar minus outline'
            iconPosition='left'>
        </Input>
    )
}


export default InputWithIcon;