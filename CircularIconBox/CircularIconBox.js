import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'semantic-ui-react'

//Style import..
import "./CircularIconBox.css"


const CircularIconBox = (props) => {
  const className = `cirular-icon-custom-checkbox ${props.className}`
  let iconStyle = {margin:0, color: "#4d4f5c", fontSize: "9px", textAlign: "center"}
  if(props.isNew){
    iconStyle = {...iconStyle, position: "relative", bottom: "4px"}
  }else{
    iconStyle = {...iconStyle, lineHeight: "23px"}
  }

  return (
    <div className={className} onMouseDown={props.onClick}>
        {
          props.isNew &&
          <div className="cirular-icon-custom-tag">
            <Icon name="plus" style={{margin:0, color: "#fff", fontSize: "9px", paddingLeft: "1px"}}></Icon>
          </div>
        }
        <Icon name={props.icon} style={iconStyle}></Icon>
    </div>
  )
}


CircularIconBox.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
  isNew: PropTypes.bool.isRequired,
}

CircularIconBox.defaultProps = {
  className: "",
  isNew: true,
}


export default CircularIconBox
