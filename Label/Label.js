import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon } from 'semantic-ui-react'

import './Label.css'


const Label = ({title, color, className, style}) => {

    return(
        <div className={className} style={style}>
              {title === "..." && <div className="label-empty-container">...</div>}
              {title !== "..." && <div className="label-container" style={{backgroundColor:color}}>{title}</div>}
        </div>
      
    )
}

export default Label