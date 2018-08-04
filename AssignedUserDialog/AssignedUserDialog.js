import React from 'react';
import {Icon} from 'semantic-ui-react';

import './AssignedUserDialog.css';
import TeamCircleIcon from '../TeamCircleIcon';
import CustomCheckbox from '../CustomCheckbox';

class AssignedUserDailog extends React.Component {

    componentDidMount(){

    }

    render() {

        return(
            <div className="assigned-user-dialog-container">
                <div className="assigned-user-dialog-heading-container">
                    <div className="assigned-user-dialog-heading-text">Assign Users</div>
                    <div className="assigned-user-dialog-close-container" onClick={this.props.onClose}>
                        <Icon name="close"/>
                    </div>
                </div>
                <div className="assigned-user-dialog-list-container">
                    <div className="assigned-user-dialog-item-container">
                        <TeamCircleIcon className="assined-user-dialog-icon-container" size="mini" src=""></TeamCircleIcon>
                        <div className="assined-user-dialog-name-container">Nikita Mittal</div>
                        <CustomCheckbox size="mini" className="assigned-user-dialog-checkbox-container"></CustomCheckbox>
                    </div>
                    <div className="assigned-user-dialog-item-container">
                        <TeamCircleIcon className="assined-user-dialog-icon-container" size="mini" src=""></TeamCircleIcon>
                        <div className="assined-user-dialog-name-container">Nikita Mittal</div>
                        <CustomCheckbox size="mini" className="assigned-user-dialog-checkbox-container"></CustomCheckbox>
                    </div>
                    <div className="assigned-user-dialog-item-container">
                        <TeamCircleIcon className="assined-user-dialog-icon-container" size="mini" src=""></TeamCircleIcon>
                        <div className="assined-user-dialog-name-container">Nikita Mittal</div>
                        <CustomCheckbox size="mini" className="assigned-user-dialog-checkbox-container"></CustomCheckbox>
                    </div>
                    <div className="assigned-user-dialog-item-container">
                        <TeamCircleIcon className="assined-user-dialog-icon-container" size="mini" src=""></TeamCircleIcon>
                        <div className="assined-user-dialog-name-container">Nikita Mittal</div>
                        <CustomCheckbox size="mini" className="assigned-user-dialog-checkbox-container"></CustomCheckbox>
                    </div>
                    <div className="assigned-user-dialog-see-more-container">See More</div>
                </div>
            </div>

        )
    }

}

export default AssignedUserDailog
