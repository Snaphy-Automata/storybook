import React from 'react';
import {Modal, Icon, Button, Input, Form} from 'semantic-ui-react';
import map from 'lodash/map';
import {connect} from "react-redux";

import './LabelDialog.css';
import { Field, reduxForm, reset} from 'redux-form';
import SelectLabel from '../SelectLabel';
import CheckboxGroupField from '../ReduxForm/CheckboxGroup';
import InputFieldUI from '../ReduxForm/InputField';
import SubmitButton from '../ReduxForm/SubmitButton';
import SnaphyForm from '../ReduxForm/SnaphyForm';




const LabelDialog = (props) => {


    const {
        totalItemList,
        pristine, 
        reset, 
        submitting, 
        invalid, 
        error,
        handleSubmit,
        isDialogOpened,
        onLabelDialogStateChanged,
        onUpdateLabelDialogForm,
        formData,
        deleteLabel
    } = props;

    //console.log("Label Dialog Props", props);

    const colorList = [
        "#3b86ff",
        "#ff1744",
        "#a177ff",
        "#ffc162",
        "#2ecc71",
        "#2d7dd2",
        "#ffa177",
        "#9e9e9e",
        "#ff9b00",
        "#1ed0c1",
        "#4d4f5c",
        "#00c5e4",
        "#d55fe0"
    ]

    let optionsList = map(colorList, function(color){
        return {
          value: color,
          style:{
            background: color
          }
        }
    });

    const deleteFormLabel = function(){
        if(formData){
            deleteLabel(formData);
           // onUpdateLabelDialogForm(null);
        }
     }

     const onReset = function(){
         //console.log("I am getting called");
         if(formData){
             reset();
             onUpdateLabelDialogForm(formData);
         } else{
             reset();
         }
     }

     const onDialogClose = function(){
        onLabelDialogStateChanged(false)
     }


    return(
        <div>
            <Modal open={isDialogOpened}>
                <div>
                    <div className="label-dialog-header">
                        <div style={{display:"inline-block"}}>Create/Edit Labels</div>
                        <div onClick={onDialogClose} style={{float:"right", cursor:'pointer'}}>
                            <Icon name="close"/>
                        </div>
                    </div>
                    <div className="label-dialog-content-container">
                        <div className="label-dialog-create-label-conatiner">
                            <SnaphyForm  error={error} onSubmit={handleSubmit} errorHeading={'Something went wrong!'} className="">
                                <Field required name="title" type="text" size="large" component={InputFieldUI} placeholder="Name your label"/>
                                    <div className="label-dialog-color-list-container">
                                        <Field name="colorCode"  options={optionsList}  component={CheckboxGroupField}></Field>
                                    </div>
                                <div>
                                    {!formData && <SubmitButton basic style={{float:'left'}} size="tiny" disabled = {invalid|| submitting || pristine} content="Create"></SubmitButton>}
                                    {formData && <SubmitButton basic style={{float:'left'}} size="tiny" disabled = {invalid|| submitting || pristine} content="Update"></SubmitButton>}
                                    <Button type="button" basic color="grey" size="tiny" content="Reset" onClick={onReset}/>
                                    <Button type="button" basic color="red" size="tiny" style={{float:"right", display:"inline-block"}} onClick={deleteFormLabel}>Delete</Button>
                                </div>
                            </SnaphyForm>
                        </div>
                        <div className="label-dialog-label-list-container">
                                {
                                    map(totalItemList, function(itemObj, index){

                                        const onEditLabel = function(){
                                            //console.log("ItemObj", itemObj);
                                            onUpdateLabelDialogForm(itemObj);
                                        }
                                        return (
                                            <div key={index} style={{display:"inline-block"}}>
                                                 {itemObj && itemObj.title && <div className="label-dialog-label-container">
                                                   <SelectLabel type="edit" name={itemObj.title} color={itemObj.colorCode} onClick={onEditLabel} style={{height:"25px", lineHeight:"17px"}}/>
                                                </div>}
                                            </div>
                                        )
                                    })
                                }
                        </div>

                    </div>
                    
                </div>
            </Modal>
        </div>
    )
}

// Retrieve data from store as props
function mapStateToProps(store) {
    return {
       // initializeLabelDialogFormData : store.AllTaskReducer.initializeLabelDialogFormData
    }
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    //initializeLabelDialogFormAction,
    reset,
   

};

const LabelDialogWithForm = reduxForm({
    form: 'labelCreateForm',
    enableReinitialize : true
})(LabelDialog)


export default connect(mapStateToProps, mapActionsToProps)(LabelDialogWithForm);
