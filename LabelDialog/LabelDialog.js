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

//Import Actions
//import {initializeLabelDialogFormAction, deleteLabelAction, labelDialogOpenedAction} from '../../AllTaskActions';



const LabelDialog = (props) => {


    const {
        totalItemList,
        initializeLabelDialogFormAction,
        initializeLabelDialogFormData,
        deleteLabelAction,
        pristine, 
        reset, 
        submitting, 
        invalid, 
        error,
        handleSubmit,
        isDialogOpened,
        labelDialogOpenedAction
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

    const deleteLabel = function(){
        if(initializeLabelDialogFormData){
            deleteLabelAction(initializeLabelDialogFormData);
            initializeLabelDialogFormAction(null);
        }
     }

     const onReset = function(){
         console.log("I am getting called");
         if(initializeLabelDialogFormData){
             reset();
             initializeLabelDialogFormAction(initializeLabelDialogFormData);
         } else{
             reset();
         }
     }

     const onDialogClose = function(){
        labelDialogOpenedAction(false)
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
                                <Field required name="name" type="text" size="large" component={InputFieldUI} placeholder="Name your label"/>
                                    <div className="label-dialog-color-list-container">
                                        <Field name="color"  options={optionsList}  component={CheckboxGroupField}></Field>
                                    </div>
                                <div>
                                    {!initializeLabelDialogFormData && <SubmitButton basic style={{float:'left'}} size="tiny" disabled = {invalid|| submitting || pristine} content="Create"></SubmitButton>}
                                    {initializeLabelDialogFormData && <SubmitButton basic style={{float:'left'}} size="tiny" disabled = {invalid|| submitting || pristine} content="Update"></SubmitButton>}
                                    <Button type="button" basic color="grey" size="tiny" content="Reset" onClick={onReset}/>
                                    <Button type="button" basic color="red" size="tiny" style={{float:"right", display:"inline-block"}} onClick={deleteLabel}>Delete</Button>
                                </div>
                            </SnaphyForm>
                        </div>
                        <div className="label-dialog-label-list-container">
                                {
                                    map(totalItemList, function(itemObj, index){

                                        const onEditLabel = function(){
                                            console.log("ItemObj", itemObj);
                                            initializeLabelDialogFormAction(itemObj);
                                        }
                                        return (
                                            <div key={index} style={{display:"inline-block"}}>
                                                 {itemObj && itemObj.name && <div className="label-dialog-label-container">
                                                   <SelectLabel type="edit" name={itemObj.name} color={itemObj.color} onClick={onEditLabel}/>
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
    //deleteLabelAction,
    //labelDialogOpenedAction

};

const LabelDialogWithForm = reduxForm({
    form: 'labelCreateForm',
    enableReinitialize : true
})(LabelDialog)


export default connect(mapStateToProps, mapActionsToProps)(LabelDialogWithForm);
// import React from 'react';
// import {Modal, Icon, Button, Input, Form} from 'semantic-ui-react';
// import map from 'lodash/map';
// import {connect} from "react-redux";

// import './LabelDialog.css';
// import { Field, reduxForm, reset} from 'redux-form';
// import SelectLabel from '../SelectLabel';
// import CheckboxGroupField from '../CheckboxGroup';
// import InputFieldUI from '../InputField';
// import SubmitButton from '../SubmitButton';
// import SnaphyForm from '../SnaphyForm';

// //Import Actions
// import {initializeLabelDialogFormAction} from '../LabelDialog/LabelDialogAction';
// import {deleteLabelAction} from '../TagElement/TagElementAction';



// const LabelDialog = (props) => {


//     const {
//         totalItemList,
//         initializeLabelDialogFormAction,
//         initializeLabelDialogFormData,
//         deleteLabelAction,
//         pristine, 
//         reset, 
//         submitting, 
//         invalid, 
//         error,
//         handleSubmit
//     } = props;

//     console.log("Label Dialog Props", props);

//     const colorList = [
//         "#3b86ff",
//         "#ff1744",
//         "#a177ff",
//         "#ffc162",
//         "#2ecc71",
//         "#2d7dd2",
//         "#ffa177",
//         "#9e9e9e",
//         "#ff9b00",
//         "#1ed0c1",
//         "#4d4f5c",
//         "#00c5e4",
//         "#d55fe0"
//     ]

//     let optionsList = map(colorList, function(color){
//         return {
//           value: color,
//           style:{
//             background: color
//           }
//         }
//     });

//     const deleteLabel = function(){
//         if(initializeLabelDialogFormData){
//             deleteLabelAction(initializeLabelDialogFormData);
//             initializeLabelDialogFormAction(null);
//         }
//      }

//      const onReset = function(){
//          console.log("I am getting called");
//          if(initializeLabelDialogFormData){
//              reset();
//              initializeLabelDialogFormAction(initializeLabelDialogFormData);
//          } else{
//              reset();
//          }
//      }


//     return(
//         <div>
//             <Modal open>
//                 <div>
//                     <div className="label-dialog-header">
//                         <div style={{display:"inline-block"}}>Create/Edit Labels</div>
//                         <div style={{float:"right"}}>
//                             <Icon name="close"/>
//                         </div>
//                     </div>
//                     <div className="label-dialog-content-container">
//                         <div className="label-dialog-create-label-conatiner">
//                             <SnaphyForm  error={error} onSubmit={handleSubmit} errorHeading={'Something went wrong!'} className="">
//                                 <Field required name="name" type="text" size="large" component={InputFieldUI} placeholder="Name your label"/>
//                                     <div className="label-dialog-color-list-container">
//                                         <Field name="color"  options={optionsList}  component={CheckboxGroupField}></Field>
//                                     </div>
//                                 <div>
//                                     {!initializeLabelDialogFormData && <SubmitButton basic style={{float:'left'}} size="tiny" disabled = {invalid|| submitting || pristine} content="Create"></SubmitButton>}
//                                     {initializeLabelDialogFormData && <SubmitButton basic style={{float:'left'}} size="tiny" disabled = {invalid|| submitting || pristine} content="Update"></SubmitButton>}
//                                     <Button type="button" basic color="grey" size="tiny" content="Reset" onClick={onReset}/>
//                                     <Button type="button" basic color="red" size="tiny" style={{float:"right", display:"inline-block"}} onClick={deleteLabel}>Delete</Button>
//                                 </div>
//                             </SnaphyForm>
//                         </div>
//                         <div className="label-dialog-label-list-container">
//                                 {
//                                     map(totalItemList, function(itemObj, index){

//                                         const onEditLabel = function(){
//                                             console.log("ItemObj", itemObj);
//                                             initializeLabelDialogFormAction(itemObj);
//                                         }
//                                         return (
//                                             <div key={index} style={{display:"inline-block"}} >
//                                                 <div className="label-dialog-label-container">
//                                                     <SelectLabel type="edit" name={itemObj.name} color={itemObj.color} onClick={onEditLabel}/>
//                                                 </div>
                                                
//                                             </div>
//                                         )
//                                     })
//                                 }
//                         </div>

//                     </div>
                    
//                 </div>
//             </Modal>
//         </div>
//     )
// }

// // Retrieve data from store as props
// function mapStateToProps(store) {
//     return {
//         totalItemList : store.TagElementReducer.totalTagItemList,
//         initializeLabelDialogFormData : store.LabelDialogReducer.initializeLabelDialogFormData
//     }
// }


// //Map Redux Actions to Props..
// const mapActionsToProps = {
//     //map action here
//     initializeLabelDialogFormAction,
//     reset,
//     deleteLabelAction

// };

// const LabelDialogWithForm = reduxForm({
//     form: 'labelCreateForm',
//     enableReinitialize : true
// })(LabelDialog)


// export default connect(mapStateToProps, mapActionsToProps)(LabelDialogWithForm);