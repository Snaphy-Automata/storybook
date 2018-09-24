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

const TaskLabelBox = ({allLabelIds, onAddEditLabelDialogBtnClick }) => {
  const hasLabels = !!allLabelIds.length


  return (
    <div className="task-detail-select-label-box-container noselect">
      {
        hasLabels &&
        getLabels(allLabelIds)
      }
      {/* Add Create Label Dialog Box */}
      <div onClick={onAddEditLabelDialogBtnClick} className="task-detail-create-label-btn"></div>
    </div>
  )
}


const onLabelBtnAddClick = (event, labelId) => {
  console.log("On Label Btn Add click", labelId);
}


const getLabels=(labelIds)=>{
  return map(labelIds, (labelId, index)=>{
    let style = {
      marginRight: "15px",
      marginBottom: "10px",
    }
    if(index === (labelIds.length-1)){
      delete style.marginRight
    }
    return (
      <Label key={index} onClick={onLabelBtnAddClick} labelId={labelId} style={style} type="read"/>
    )
  })
}


TaskLabelBox.defaultProps = {
  //Will store all labels of the project by ids..
  allLabelIds: []
}



TaskLabelBox.propTypes = {
  projectId: PropTypes.string.isRequired,
  onAddEditLabelDialogBtnClick: PropTypes.func,

}

function mapStateToProps(store, props) {
  const projectId = props.projectId
  const modelData = store.ModelDataReducer
  let allLabelIds
  if(projectId){
    const project = modelData.project.byId[projectId]
    if(project){
      allLabelIds =  project.labels
    }
  }

  return {
    allLabelIds: allLabelIds
  }
}


const mapActionsToProps = {}



export default connect(mapStateToProps, mapActionsToProps)(TaskLabelBox)
