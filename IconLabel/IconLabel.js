import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react'


import './IconLabel.css';

import TeamCircleIcon from '../TeamCircleIcon';

const IconLabel = ({ size, icon, title, src, name, isLabel, onClick, onRemove }) => {
    return (
        <div onClick={onClick}>
            {!src && <div className="label-icon-container">
                <div className="label-icon-side-icon-container">
                    {title && <TeamCircleIcon size={size} style={{ backgroundColor: "#dddddd" }} title={title} onClick={() => { console.log("Item Has been clicked") }}></TeamCircleIcon>}
                    {icon && <TeamCircleIcon size={size} style={{ backgroundColor: "#dddddd" }} icon={icon} onClick={() => { console.log("Item Has been clicked") }}></TeamCircleIcon>}
                </div>
                {/* <div style={{ minWidth: "100px" }}>

                </div> */}

                <div className="label-icon-name-container">{name}</div>

               <div  style={{width:"15px", display:"inline-block", marginRight:"5px"}} onClick={onRemove}>
                    {isLabel && <div className="label-icon-cross-button-container"><Icon name="close"></Icon></div>}
                </div>
                


            </div>}
            {src && <div className="label-icon-container-with-border">
                <div style={{ display: 'inline-block', float: "left", marginLeft: -2 }}>
                    {src && <TeamCircleIcon size={size} style={{ backgroundColor: "#dddddd" }} src="sdxed" onClick={() => { console.log("Item Has been clicked") }}></TeamCircleIcon>}
                </div>
                <div className="label-icon-name-container">{name}</div>

            </div>}
        </div>

    )
}

IconLabel.propTypes = {

}


export default IconLabel;

