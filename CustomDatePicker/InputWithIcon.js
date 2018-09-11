import React from 'react';
import {Input} from 'semantic-ui-react';
import { connect } from 'react-redux';

//import {} from '../../AllTaskActions';

import {onDatePickerStateChangedAction} from '../TaskList/TaskListActions';

const InputWithIcon = (props) => {
    console.log("Input With Icon Props", props);

    const onBlurEvent = function(){
        console.log("On Blur", props.dataType);
        if(props.dataType === "due"){
            props.onDatePickerStateChangedAction("due", !props.isDatePickerOpened, props.dateData);
          } else if(props.dataType === "start"){
            props.onDatePickerStateChangedAction("start", !props.isDatePickerOpened, props.dateData);
          }

    }
    return (
        <Input
            {...props}
            size="mini"
            onBlur={onBlurEvent}
            autoFocus
            style={{width:"120px", height:"32px"}}
            icon='calendar minus outline'
            iconPosition='left'>
        </Input>
    )
}

 const mapStateToProps = (store, props) => {
    return {
       
    }
}

const mapActionsToProps = {
    onDatePickerStateChangedAction
}





export default connect(mapStateToProps, mapActionsToProps)(InputWithIcon);