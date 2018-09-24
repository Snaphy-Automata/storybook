/**
 * Created by Robins Gupta.
 * 24th Sept 2018
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import map from 'lodash/map'

//Custom import
import Label from '../SelectLabel'
import {
  getRemainingLabels,
}    from '../../baseComponents/GridView/components/ModelData/Label/selector'

const TaskLabelBox = ({allLabelIds, onAddEditLabelDialogBtnClick, onLabelAdded}) => {
  const hasLabels = !!allLabelIds.length
  return (
    <div className="task-detail-select-label-box-container noselect">
      {
        hasLabels &&
        getLabels(allLabelIds, onLabelAdded)
      }
      {/* Add Create Label Dialog Box */}
      <div onClick={onAddEditLabelDialogBtnClick} className="task-detail-create-label-btn"></div>
    </div>
  )
}



const getLabels=(labelIds, onLabelAdded)=>{
  const onLabelBtnAddClick = (event, labelId)=>{
    onLabelAdded? onLabelAdded(event, labelId):null
  }
  return map(labelIds, (labelId, index)=>{
    let style = {
      marginRight: "15px",
      marginBottom: "10px",
    }
    if(index === (labelIds.length-1)){
      delete style.marginRight
    }

    return (
      <Label key={index} labelClassName="task-detail-select-label-wrapper" onClick={onLabelBtnAddClick} labelId={labelId} style={style} type="add"/>
    )
  })
}



TaskLabelBox.defaultProps = {
  //Will store all labels of the project by ids..
  allLabelIds: [],
  selectedLabelIds: []
}



TaskLabelBox.propTypes = {
  projectId: PropTypes.string.isRequired,
  selectedLabelIds: PropTypes.array,
  onAddEditLabelDialogBtnClick: PropTypes.func,
  onLabelAdded: PropTypes.func,
}

function mapStateToProps(store, props) {
  let allLabelIds = getRemainingLabels(store, props)
  return {
    allLabelIds: allLabelIds
  }
}


const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(TaskLabelBox)
