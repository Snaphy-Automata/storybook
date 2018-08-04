import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon, Popup } from 'semantic-ui-react'

import './Label.css'

const getLabelDiv = (color, title) => {
    return (
        <div className="label-container" style={{backgroundColor:color}}>{title}</div>
    )
}


const Label = ({title, color, className, style, tooltip}) => {



    return(
        <div className={className} style={style}>
              {title === "..." && <Popup 
              trigger={<div className="label-empty-container"><div>...</div></div>}
              content={tooltip}
              inverted
              position = 'bottom center'
              style={{textTransform: 'capitalize', fontSize:'10px', paddingRight:"20px", paddingLeft:"20px", maxWidth:"200px", letterSpacing:"0.5px", wordBreak:"break-word"}}
              />}
              {title !== "..." && !tooltip && getLabelDiv(color, title)}
              {title !== "..." && tooltip && 
              <Popup 
                trigger={getLabelDiv(color, title)}
                content={tooltip}
                inverted
                position = 'bottom center'
                style={{textTransform: 'capitalize', fontSize:'10px', paddingRight:"20px", paddingLeft:"20px", maxWidth:"200px", letterSpacing:"0.5px", wordBreak:"break-word"}}
              />}
        </div>
      
    )
}

export default Label