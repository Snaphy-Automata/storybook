import React from 'react';

//Custom Import
import './ChangeDateDialog.css'
import CustomCheckbox from '../CustomCheckbox';

const ChangeDateDialog = (props) => {

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
            <div className="change-date-dialog-item-container">
                <div className="change-date-dialog-item-text">Next Week (26 June)</div>
                <CustomCheckbox className="change-date-dialog-item-checkbox" size="mini"></CustomCheckbox>
            </div>

        </div>
    )
}

export default ChangeDateDialog;