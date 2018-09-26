/**
 * Created by Robins Gupta.
 * 24th Sept 2018
 */

import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import map from 'lodash/map'
import {generate} from 'shortid'
import { compose, graphql, withApollo } from 'react-apollo';
import { reset} from 'redux-form';
//Custom import
import Label from '../SelectLabel'
import LabelDialog from '../LabelDialog'
import {
  getRemainingLabels,
}    from '../../baseComponents/GridView/components/ModelData/Label/selector'

import {
  onLabelSaveAction,
  onLabelRemoveAction,
} from '../../baseComponents/GridView/components/ModelData/Label/action'


import {
  initializeLabelDialogFormDataAction
} from '../LabelDialog/LabelDialogAction'

import {
  createOrEditLabelMutation,
  deleteLabelMutation
} from '../../baseComponents/GridView/components/graphql/label/mutation';


class TaskLabelBox extends PureComponent{
  static defaultProps = {
    //Will store all labels of the project by ids..
    allLabelIds: [],
    selectedLabelIds: [],
    createLabelPlaceholder: "Create/Edit Labels"
  }

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    selectedLabelIds: PropTypes.array,
    onLabelAdded: PropTypes.func,
  }

  constructor(props){
    super(props)
    this.state = {
      isLabelDialogOpen: false
    }
    this.onAddEditLabelDialogBtnClick = this._onAddEditLabelDialogBtnClick.bind(this)
    this.onLabelSave                  = this._onLabelSave.bind(this)
    this.onLabelDelete                = this._onLabelDelete.bind(this)
    this.saveLabel                    = this._saveLabel.bind(this)
  }

  getLabels(labelIds, onLabelAdded){
    const onLabelBtnAddClick = (event, labelId)=>{
      onLabelAdded? onLabelAdded(event, labelId):null
    }
    return map(labelIds, (labelId, index)=>{
      return (
        <Label key={index} className="label-list-label-item" labelClassName="task-detail-select-label-wrapper" onClick={onLabelBtnAddClick} labelId={labelId} type="add"/>
      )
    })
  }

  _onAddEditLabelDialogBtnClick(event){
    const state = !this.state.isLabelDialogOpen
    this.setState({isLabelDialogOpen:state})
  }

  _onLabelSave(data){
    const {initializeLabelDialogFormDataAction, initialValues, reset} = this.props
    let isNew;
    if(initialValues){
      isNew = false
      this.saveLabel(data, isNew)
    }else{
      isNew = true
      //On Create operation..
      const labelValue = {
        ...data,
        isSelected: false
      }
      labelValue.id = generate()
      this.saveLabel(labelValue, isNew)
    }

    reset('labelCreateForm')
    //Reset the initilize form..
    initializeLabelDialogFormDataAction(null)
  }


  _onLabelDelete(label){
    const {onLabelRemoveAction, projectId, deleteLabelMutation, reset, initializeLabelDialogFormDataAction} = this.props
    onLabelRemoveAction(label, projectId, deleteLabelMutation)
    .then(data=>{
      //Data removed..
    })
    .catch(error=>{
      console.error("Error updating label.", error)
    })
    reset('labelCreateForm')
    //Reset the initilize form..
    initializeLabelDialogFormDataAction(null)
  }


  _saveLabel(labelObj, isNew){
    const {createOrEditLabelMutation, onLabelSaveAction, projectId}  = this.props
    onLabelSaveAction(labelObj, isNew, projectId, createOrEditLabelMutation)
    .then(label=>{
      console.log("Label Saved or Updated", label)
    })
    .catch(error=>{
      console.error("Error saving label", error)
    })
  }


  render(){
    const {allLabelIds, onLabelAdded, createLabelPlaceholder, projectId, initialValues} = this.props
    const {isLabelDialogOpen} = this.state
    const hasLabels = !!allLabelIds.length

    return (
      <div className="task-detail-select-label-box-container noselect">
        {
          hasLabels &&
          this.getLabels(allLabelIds, onLabelAdded)
        }
        {/* Add Create Label Dialog Box */}
        <div onClick={this.onAddEditLabelDialogBtnClick} className="task-detail-create-label-btn">
          <Icon name='tag'/>
          {createLabelPlaceholder}
        </div>
        <LabelDialog projectId={projectId} initialValues={initialValues} formData={initialValues} isDialogOpened={isLabelDialogOpen} onSubmit={this.onLabelSave} onLabelDelete={this.onLabelDelete} onLabelDialogStateChanged={this.onAddEditLabelDialogBtnClick} />
      </div>
    )
  }
}



function mapStateToProps(store, props) {
  let allLabelIds = getRemainingLabels(store, props)
  const labelDialogFormDataInit = store.LabelDialogReducer.labelDialogFormDataInit
  return {
    allLabelIds: allLabelIds,
    initialValues: labelDialogFormDataInit,
  }
}


const mapActionsToProps = {
  onLabelSaveAction,
  onLabelRemoveAction,
  initializeLabelDialogFormDataAction,
  reset,
}

const TaskLabelBoxMutation = compose(
  graphql(createOrEditLabelMutation, { name: "createOrEditLabelMutation" }),
  graphql(deleteLabelMutation, { name: "deleteLabelMutation" }),
)(TaskLabelBox);


export default withApollo(connect(mapStateToProps, mapActionsToProps)(TaskLabelBoxMutation));
