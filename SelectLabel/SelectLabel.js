import React from 'react';
import PropTypes from 'prop-types'
import {Icon} from 'semantic-ui-react'
import './SelectLabel.css';


const SelectLabel = ({name, isSelected, color, style, onClick, type, className}) => {
    let className_ = className? `${className} select-label-container`: `select-label-container`
    return (
        <div className={className_} style={style} onClick={onClick}>
            <div className="select-label-content-container">{name}</div>
            <div className="select-label-add-container" style={{backgroundColor: color}}>
                {type!=="edit" && !isSelected && <Icon style={{margin:0}} name="add"/>}
                {type!=="edit" && isSelected && <Icon style={{margin:0}} name="check"/>}
                {type==="edit" && <Icon style={{margin:0}} name="pencil"/>}
            </div>
        </div>
    )
}


SelectLabel.defaultProps = {
  color: "#a6b9cc",
  type: undefined,
  isSelected: false,
}

SelectLabel.propTypes = {
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,

}

export default SelectLabel;
