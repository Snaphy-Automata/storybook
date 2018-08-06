import React from 'react';
import {Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';


import './CustomCheckbox.css'

import {onSelectDateAction, onOpenChangeDateDialogAction} from '../TaskList/TaskListActions';

console.log("Custom Checkbox getting called");


const CustomCheckbox = ({size, isSelected, color, className, onItemClicked, onSelectDateAction, type, data, task}) => {
    const customCheckboxClicked = () => {
        onSelectDateAction(type, data, task.id);
        //onOpenChangeDateDialogAction(false, task.id);
    }
    className = className ? `custom-checkbox-wrapper ${className}`: `custom-checkbox-wrapper`
    className = isSelected ? `${className} isSelected ${color}`: className
    className = size ? `${className} ${size}`: className

    return (
        <div className={className} onClick={customCheckboxClicked}>
            <Icon name="check" style={{margin:0}}></Icon>
        </div>
    )
}

// Retrieve data from store as props
function mapStateToProps(store) {
    return {
    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    onSelectDateAction,
    onOpenChangeDateDialogAction
};


export default connect(mapStateToProps, mapActionsToProps)(CustomCheckbox);