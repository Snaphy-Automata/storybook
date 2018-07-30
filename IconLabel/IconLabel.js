import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon, Button } from 'semantic-ui-react'


import './IconLabel.css';

import TeamCircleIcon from '../TeamCircleIcon';

const IconLabel = ({size, icon, title, src, name, isLabel, onClick}) => {
    return(
        <div onClick={onClick}>
            {!src && <div className="label-icon-container">
                <div style={{display:'inline-block', float:"left"}}>
                    {title && <TeamCircleIcon size={size} style={{backgroundColor:"#dddddd"}} title={title} onClick={()=>{console.log("Item Has been clicked")}}></TeamCircleIcon>}
                    {icon && <TeamCircleIcon size={size} style={{backgroundColor:"#dddddd"}} icon={icon} onClick={()=>{console.log("Item Has been clicked")}}></TeamCircleIcon>}
                </div>
                <div className="label-icon-name-container">{name}</div>

                {isLabel && <div className="label-icon-cross-button-container">
                    <Icon name="close"></Icon>
                </div>
                }

            </div>}
            {src && <div className="label-icon-container-with-border">
                <div style={{display:'inline-block', float:"left", marginLeft: -2}}>
                    {src && <TeamCircleIcon size={size} style={{backgroundColor:"#dddddd"}} src="sdxed" onClick={()=>{console.log("Item Has been clicked")}}></TeamCircleIcon>}
                </div>
                <div className="label-icon-name-container">{name}</div>

            </div>}
        </div>
       
    )
}

IconLabel.propTypes = {

}


export default IconLabel;

