/**
 * Created by Robins Gupta
 * 28th July 2018
 */
import React, {Component} from "react";
import PropTypes from 'prop-types';

//Custom import..
import "./CircularLabel.css";

//size = mini | tiny | small | large | big | huge | massive

//Color code mapping..
const colorCodeCss =  {
    "#ffc16233": "yellow",
    "#a177ff33": "purple",
    "#5ee2a033": "green",
    "#ff414133": "red",
    "#75818d": "grey"
};

const CircularLabel = ({colorCode, title, style, className, size, iconStyle}) => {
    className = className || "";
    className = `circular-label-container ${className}`;
    size = size || "mini";
    const iconColor = colorCodeCss[colorCode] || "";

    const iconClass = `circular-label-circular-icon ${iconColor} ${size}`;

    iconStyle = {
        backgroundColor: colorCode,
        ...iconStyle,
    }

    const labelTextClass = `circular-label-circular-text ${size}`

    return (
        <div  style={style} className={className}>
            <div style={iconStyle} className={iconClass}/>
            <div  className={labelTextClass}>
                {title}
            </div>
        </div>
    )
}


CircularLabel.propTypes = {
   title: PropTypes.string.isRequired,
   colorCode: PropTypes.string.isRequired,
   size: PropTypes.string,
   iconStyle: PropTypes.object
};


export default CircularLabel;