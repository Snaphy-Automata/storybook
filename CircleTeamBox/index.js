/*
Created By Robins
10th April 2018
*/

import React from 'react';
import PropTypes from 'prop-types';
import {Label} from 'semantic-ui-react';

//Custom imports..
import './index.css';

//List of colors for teams
const colors = [
    "#ffc162",
    "#a177ff",
    "#2ecc71",
    "#ff1744",
    "#3b86ff"
]


const inactiveColor = "#f3f3f3";
const inactiveTextColor = "#707070";


const STATUS_OBJ = {
    pending: "pending",
    active: "active"
}

/**
 * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/*
Project Card Components..
 */
const CircleTeamBox = function({title, status}){
    const char = title[0];
    const max = colors.length -1;
    const index = getRandomInt(0, max);
    const currentColorCode = status!== STATUS_OBJ.pending ? colors[index] : inactiveColor;
    const charColor = status === STATUS_OBJ.pending? inactiveTextColor : "#ffffff";
    const textStyle = {};

    if(status === STATUS_OBJ.pending){
        textStyle.color = inactiveTextColor;
    }

    return (
        <div className="circle-team-box-text-to-title-container">
            <div className="circle-team-box-text-to-title-box" style={{
                backgroundColor: currentColorCode,
            }} >
                <div className="circle-team-box-text-to-title-text" >
                    <span style={{
                        color: charColor
                    }}>
                        {char}
                    </span>
                </div>
            </div>
            <div className="dark-text circle-team-box-text-to-title-full-name" style={textStyle} >
                {title}
            </div>
        </div>
    );
};


CircleTeamBox.propTypes = {
    //Project data fetched using GraphQL

}

export default CircleTeamBox;
