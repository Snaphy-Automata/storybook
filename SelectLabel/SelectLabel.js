import React from 'react';
import {Icon} from 'semantic-ui-react'
import './SelectLabel.css';


const SelectLabel = ({name, isSelected, color, style, onClick, type}) => {
    let colorValue = color ? color : "#a6b9cc"
    return (
        <div className="select-label-container" style={style} onClick={onClick}>
            <div className="select-label-content-container">{name}</div>
            <div className="select-label-add-container" style={{backgroundColor: colorValue}}>
                {type!=="edit" && !isSelected && <Icon style={{margin:0}} name="add"/>}
                {type!=="edit" && isSelected && <Icon style={{margin:0}} name="check"/>}
                {type==="edit" && <Icon style={{margin:0}} name="pencil"/>}
            </div>
        </div>
    )
}


export default SelectLabel;