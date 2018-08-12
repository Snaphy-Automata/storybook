/*
Created By Robins
9th April 2018
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Label } from 'semantic-ui-react'

//Custom imports..


//Css
import '../../components/AutomataApp/ProjectRouter/ProjectDashboard/AllProjectsDashboard.css';


/**
 *  Notification Box Components..
 */
const NotificationBox = function({unread}){
    return (
        <Label className="project-card-mail-notification-box" style={{float: 'right'}}>
            <Icon name='mail' style={{margin:0}}  />
            {
                unread > 0 &&
                (
                    <span style={{
                        marginLeft: ".833em"
                    }}>
                        {unread}
                    </span>
                )
            }
        </Label>
    );
};



//PropTypes..
NotificationBox.propTypes = {

}

export default NotificationBox;
