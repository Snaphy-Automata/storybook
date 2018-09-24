import React from 'react';
import PropTypes from 'prop-types'
import {Icon} from 'semantic-ui-react'
import { connect } from 'react-redux';
import './SelectLabel.css';




const SelectLabel = ({name, isSelected, color, style, onClick, type, className, onButtonClick, labelId}) => {
    let className_ = className? `${className} select-label-container`: `select-label-container`

    const onLabelBtnClick = (event)=>{
      onButtonClick? onButtonClick(event, labelId): null
    }

    const onLabelBoxBtnClick = (event)=>{
      onClick?onClick(event, labelId): null
    }

    return (
        <div className={className_} style={style} onClick={onLabelBoxBtnClick}>
            <div className="select-label-content-container">{name}</div>
            <div onClick={onLabelBtnClick} className="select-label-add-container" style={{backgroundColor: color}}>
                {type!=="read" && type === "add" && type !=="edit" && !isSelected && <Icon style={{margin:0}} name="add"/>}
                {type!=="read" && type !== "add" && type !=="edit" && isSelected && <Icon style={{margin:0}} name="check"/>}
                {type!=="read" && type !== "add" && type ==="edit" && <Icon style={{margin:0}} name="pencil"/>}
                {type==="read" && <Icon style={{margin:0}} name="close"/>}
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
  //Get triggered when clicked on whole container..
  onClick: PropTypes.func,
  type: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  //When clicken on button..
  onButtonClick: PropTypes.func,
  labelId: PropTypes.string.isRequired,
}




function mapStateToProps(store, props) {
  const labelId = props.labelId
  const modelData = store.ModelDataReducer
  let title, color
  if(labelId){
    const label = modelData.label.byId[labelId]
    if(label){
      title = label.title
      color = label.colorCode
    }
  }

  return {
    name: title,
    color: color,
  }
}

const mapActionsToProps = {

}




export default connect(mapStateToProps, mapActionsToProps)(SelectLabel);
