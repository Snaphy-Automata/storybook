import React from 'react';
import moment from 'moment';

//Custom Import
import './ChangeDateDialog.css'
import CustomCheckbox from '../CustomCheckbox';


const ChangeDateDialog = (props) => {

    const nextWeek = moment().add(1, 'weeks').startOf('isoWeek').format("DD MMM");

    return(
        <div className="change-date-dialog-container">
            <div className="change-date-dialog-item-container">
                <div className="change-date-dialog-item-text">Today</div>
                <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini"></CustomCheckbox>
            </div>
            <div className="change-date-dialog-item-container">
                <div className="change-date-dialog-item-text">Tomorrow</div>
                <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini"></CustomCheckbox>
            </div>
            <div className="change-date-dialog-item-container" style={{border: 'none'}}>
                <div className="change-date-dialog-item-text">Next Week ({nextWeek})</div>
                <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini"></CustomCheckbox>
            </div>

        </div>
    )
}

export default ChangeDateDialog;