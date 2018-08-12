/* 
Created By Robins 
10th April 2018
*/

import React from 'react';
import PropTypes from 'prop-types';
import {Label} from 'semantic-ui-react';

//Custom imports..
import './team.css';

//List of colors for teams
const colors = [
    "#ffc162",
    "#a177ff",
    "#2ecc71",
    "#ff1744",
    "#3b86ff"
]

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
const Team = function({title}){
    const char = title[0];
    const max = colors.length -1;
    const index = getRandomInt(0, max);
    const currentColorCode = colors[index];
    return (
        <div className="team-text-to-title-container">

              <div className="team-text-to-title-box" style={{backgroundColor: currentColorCode}} >
                <div className="team-text-to-title-text" >
                    <span>
                        {char}
                    </span>
                </div>
              </div>
               <span className="dark-text team-text-to-title-full-name">
                    {title}
               </span> 
        </div>
    );
};


Team.propTypes = {
    //Project data fetched using GraphQL
    
}

export default Team;