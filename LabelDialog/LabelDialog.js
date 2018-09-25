import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import {Modal, Icon, Button, Input, Form} from 'semantic-ui-react';
import map from 'lodash/map';
import {connect} from "react-redux";
import { Field, reduxForm, reset} from 'redux-form';

//Style.
import './LabelDialog.css';
//Custom Import..
import SelectLabel from '../SelectLabel';
import CheckboxGroupField from '../ReduxForm/CheckboxGroup';
import InputFieldUI from '../ReduxForm/InputField';
import SubmitButton from '../ReduxForm/SubmitButton';
import SnaphyForm from '../ReduxForm/SnaphyForm';
import {getAllLabels} from '../../baseComponents/GridView/components/ModelData/Label/selector'
import {
  initializeLabelDialogFormDataAction,
} from './LabelDialogAction'


class LabelDialog extends PureComponent{
  static defaultProps = {
    colorList:["#3b86ff", "#ff1744", "#a177ff", "#ffc162", "#2ecc71", "#2d7dd2", "#ffa177", "#9e9e9e", "#ff9b00", "#1ed0c1", "#4d4f5c", "#00c5e4", "#d55fe0"],
    heading: "Create/Edit Labels",
    errorMessage: "Something went wrong!",
    labelPlaceholder: "Enter label name",
    allLabelIds: [],
    initialValues: null,
    formData: null,
  }

  static propTypes = {
    colorList:                 PropTypes.array,
    projectId:                 PropTypes.string.isRequired,
    isDialogOpened:            PropTypes.bool.isRequired,
    onSubmit:                  PropTypes.func.isRequired,
    onLabelDialogStateChanged: PropTypes.func.isRequired,
    heading:                   PropTypes.string,
    errorMessage:              PropTypes.string,
    onLabelDelete:             PropTypes.func.isRequired,
    //New data to be initialized..
    initialValues:             PropTypes.object,
    formData:                  PropTypes.object,
  }

  constructor(props){
    super(props)
    this.onReset                 = this._onReset.bind(this)
    this.onDialogClose           = this._onDialogClose.bind(this)
    this.deleteFormLabel         = this._deleteFormLabel.bind(this)
    this.onUpdateLabelDialogForm = this._onUpdateLabelDialogForm.bind(this)
  }

  _deleteFormLabel(){
    console.log("Deleting Form label")
    const {formData, onLabelDelete} = this.props
    if(formData){
      onLabelDelete(formData);
    }
  }

  _onUpdateLabelDialogForm(labelId){
    this.props.initializeLabelDialogFormDataAction(labelId)
  }

  _onReset(){
      const {formData, reset} = this.props
      //console.log("I am getting called");
      if(formData){
        reset();
        this.onUpdateLabelDialogForm(formData);
      } else{
        reset();
      }
  }

  _onDialogClose(event){
    this.props.onLabelDialogStateChanged(event)
  }

  render(){
    const {
        heading,
        allLabelIds,
        pristine,
        reset,
        submitting,
        invalid,
        error,
        handleSubmit,
        isDialogOpened,
        formData,
        colorList,
        errorMessage,
        labelPlaceholder,
    } = this.props;
    const onUpdateLabelDialogForm = this.onUpdateLabelDialogForm;
    let optionsList = map(colorList, function(color){
      return {
        value: color,
        style:{
          background: color
        }
      }
    });

    return(
      <div>
          <Modal open={isDialogOpened}>
            <div>
              <div className="label-dialog-header">
                  <div style={{display:"inline-block"}}>{heading}</div>
                  <div onClick={this.onDialogClose} style={{float:"right", cursor:'pointer'}}>
                      <Icon name="close"/>
                  </div>
              </div>
              <div className="label-dialog-content-container">
                  <div className="label-dialog-create-label-conatiner">
                      <SnaphyForm  error={error} onSubmit={handleSubmit} errorHeading={errorMessage}>
                          <Field required name="title" type="text" size="large" component={InputFieldUI} placeholder={labelPlaceholder}/>
                              <div className="label-dialog-color-list-container">
                                  <Field name="colorCode"  options={optionsList}  component={CheckboxGroupField}></Field>
                              </div>
                          <div>
                              {!formData && <SubmitButton basic style={{float:'left'}} size="tiny" disabled = {invalid|| submitting || pristine} content="Create"></SubmitButton>}
                              {formData && <SubmitButton basic style={{float:'left'}} size="tiny" disabled = {invalid|| submitting || pristine} content="Update"></SubmitButton>}
                              <Button type="button" basic color="grey" size="tiny" content="Reset" onClick={this.onReset}/>
                              <Button type="button" basic color="red" size="tiny" style={{float:"right", display:"inline-block"}} onClick={this.deleteFormLabel}>Delete</Button>
                          </div>
                      </SnaphyForm>
                  </div>
                  <div className="label-dialog-label-list-container">
                    {
                        map(allLabelIds, function(labelId, index){
                          const onEditLabel = function(){
                            onUpdateLabelDialogForm(labelId);
                          }
                          return (
                              <div key={index} style={{display:"inline-block"}}>
                                {
                                  labelId &&
                                  <div className="label-dialog-label-container">
                                    <SelectLabel labelId={labelId} type="edit" onClick={onEditLabel} />
                                  </div>
                                }
                              </div>
                          )
                        })
                    }
                  </div>
              </div>
            </div>
          </Modal>
      </div>
    ) //Return..
  } //end Render Fn.
} //End LabelDialog Class

// Retrieve data from store as props
function mapStateToProps(store, props) {

  return {
    allLabelIds: getAllLabels(store, props),

  }
}

//Map Redux Actions to Props..
const mapActionsToProps = {
    reset,
    initializeLabelDialogFormDataAction,
};

const LabelDialogWithForm = reduxForm({
    form: 'labelCreateForm',
    enableReinitialize : true
})(LabelDialog)

export default connect(mapStateToProps, mapActionsToProps)(LabelDialogWithForm);
