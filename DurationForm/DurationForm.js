import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'semantic-ui-react';

//Custom Import
import IconLabel from '../IconLabel';
import {onDurationStateChangedAction, getDurationDataAction} from '../TaskList/TaskListActions';

const DurationForm = (props) =>{

    const {
        isDurationClicked,
        durationData,
        onDurationStateChangedAction,
        getDurationDataAction
    } = props;

    const onDurationClicked = () =>{
        onDurationStateChangedAction(!isDurationClicked);
    }

    const onEnter = function(e){
        if(e.key === 'Enter'){
            const hourRegex = /^[1-9]*h/g;
            const minRegex = /^[1-9]*m/g;
            const hourRegex_ = /^[1-9]*/g;
            console.log("Duration Event Listener", e.target.value, e.key);
            if(hourRegex.test(e.target.value) || minRegex.test(e.target.value)){
                //console.log("data Mathches with hr and min");
                getDurationDataAction(e.target.value);
            } else if(hourRegex_.test(e.target.value)){
                //console.log("Data Matched for hr");
                getDurationDataAction(`${e.target.value}h`);
            } 
          
            onDurationStateChangedAction(false);
        }
      
    }

    const onRemoveDurationData = function(e){
        getDurationDataAction(null);
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    return (
        <div>
            {isDurationClicked && <Input onKeyDown={onEnter} autoFocus defaultValue={durationData} size="mini" style={{width:"120px"}}></Input>}
            {!isDurationClicked && !durationData && <IconLabel size="small" icon="clock outline" name="Duration" onClick={onDurationClicked}></IconLabel>}
            {!isDurationClicked && durationData && <IconLabel size="small" icon="clock outline" name={durationData} isLabel onClick={onDurationClicked} onRemove={onRemoveDurationData}></IconLabel>}
        </div>
    )
}


function mapStateToProps(store){
    return {
        isDurationClicked : store.TaskListReducer.isDurationClicked,
        durationData : store.TaskListReducer.durationData
    }
}

const mapActionsToProps = {
    onDurationStateChangedAction,
    getDurationDataAction
}


export default connect(mapStateToProps, mapActionsToProps)(DurationForm);