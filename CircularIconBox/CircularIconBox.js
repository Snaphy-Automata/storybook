import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'semantic-ui-react'

//Style import..
import "./CircularIconBox.css"


const CircularIconBox = (props) => {
  const className = `cirular-icon-custom-checkbox ${props.className}`
  return (
    <div className={className} onMouseDown={props.onClick}>
        <div className="cirular-icon-custom-tag">
          <Icon name="plus" style={{margin:0, color: "#fff", fontSize: "9px", paddingLeft: "1px"}}></Icon>
        </div>
        <Icon name={props.icon} style={{margin:0, color: "#4d4f5c", fontSize: "9px",position: "relative", bottom: "4px", textAlign: "center"}}></Icon>
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
