import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'semantic-ui-react'

//Style import..
import "./CircularIconBox.css"


const CircularIconBox = (props) => {
  const className = `${props.className}`
  return (
    <div className={className} onMouseDown={props.onClick}>
        <Icon name={props.icon} style={{margin:0}}></Icon>
    </div>
  )
}


CircularIconBox.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
}

CircularIconBox.defaultProps = {
  className: ""
}


export default CircularIconBox
