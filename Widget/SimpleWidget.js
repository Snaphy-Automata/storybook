/* 
Created By Robins 
10th April 2018
*/

import React from 'react';
import PropTypes from 'prop-types';

//Custom imports..
import './SimpleWidget.css';


/*
Project Card Components.. 
 */
const SimpleWidget = function({color, title, subTitle}){

    return (
        <div>
            <div className="simple-widget-value" style={{ color}}>
                {subTitle}
            </div>
            <div className="purple-text simple-widget-title">
                {title}
            </div>
        </div>
    );
};


SimpleWidget.propTypes = {
    //Project data fetched using GraphQL
    
}

export default SimpleWidget;