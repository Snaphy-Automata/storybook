import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon, Button } from 'semantic-ui-react'

import CustomCheckbox from '../CustomCheckbox'

const SubTask = ({title, isSelected}) => {
    return(
        <div className="task-detail-subtask-container">
            <div className="task-detail-subtask-checkbox-container">
                <CustomCheckbox size='mini' isSelected={isSelected}></CustomCheckbox>
            </div>
            <div className="task-detail-subtask-data-container">
                {title}
            </div>
            <div className="task-detail-subtask-delete-container">
                <Icon name="trash" style={{color: "#707070"}}></Icon>
            </div>
        </div>
    )
}

export default SubTask;