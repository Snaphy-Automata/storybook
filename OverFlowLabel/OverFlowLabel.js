import React from 'react';

import './OverFlowLabel.css';
import IconLabel from '../IconLabel';

const OverFlowLabel = ({name, color, src}) => {
    let colorValue = color ? color : "#fff"
    return (
        <div style={{display:"inline-block"}}>
            {color && <div className="overflow-label-container" style={{backgroundColor: colorValue}}>
                <div>{name}</div>
            </div> 
            }
            {src && <div style={{display:"inline-block", marginRight:5}}>
                <IconLabel size="tiny" src="fgvtr" name={name}></IconLabel>
                </div>}
        </div>
       
    )
}

export default OverFlowLabel;