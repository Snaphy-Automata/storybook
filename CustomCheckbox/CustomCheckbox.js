import React from 'react';
import {Icon} from 'semantic-ui-react';


import './CustomCheckbox.css'


const CustomCheckbox = ({size, isSelected, className}) => {
    className = className ? `custom-checkbox-wrapper ${className}`: `custom-checkbox-wrapper`
    className = isSelected ? `${className} ${isSelected}`: className
    className = size ? `${className} ${size}`: className
    console.log("ClassName Checkbox", className);
    return (
        <div className={className}>
            <Icon name="check" style={{margin:0}}></Icon>
        </div>
    )
}


export default CustomCheckbox;