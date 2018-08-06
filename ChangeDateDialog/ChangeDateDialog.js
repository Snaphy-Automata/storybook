import React from 'react';
import moment from 'moment';

//Custom Import
import './ChangeDateDialog.css'
import CustomCheckbox from '../CustomCheckbox';


const ChangeDateDialog = (props) => {

    const nextWeek = moment().add(1, 'weeks').startOf('isoWeek').format("DD MMM");

    const onDateSelected = (type, data) => {
        console.log(" I am getting called");
        //props.onSelectDateAction(type, data);
    }

    console.log("Change Data Dialog Getting called");

    return(
        <div className="change-date-dialog-container">
            <div className="change-date-dialog-item-container">
                <div className="change-date-dialog-item-text">Today</div>
                {/* <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" isSelected={props.isTodaySelected} onSelectDateAction ={props.onSelectDateAction} type="today" data={!props.isTodaySelected}   onItemClicked={onDateSelected("today", !props.isTodaySelected)}></CustomCheckbox> */}
                <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" isSelected={props.isTodaySelected}  type="today" data={!props.isTodaySelected} task={props.task}></CustomCheckbox>
            </div>
            <div className="change-date-dialog-item-container">
                <div className="change-date-dialog-item-text">Tomorrow</div>
                <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" isSelected={props.isTomorrowSelected} type="tomorrow" data={!props.isTomorrowSelected} task={props.task}></CustomCheckbox>
            </div>
            <div className="change-date-dialog-item-container" style={{border: 'none'}}>
                <div className="change-date-dialog-item-text">Next Week ({nextWeek})</div>
                <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini" color="blue" isSelected={props.isNextWeekSelected} type="next week" data={!props.isNextWeekSelected} task={props.task}></CustomCheckbox>
            </div>

        </div>
    )
}

export default ChangeDateDialog;