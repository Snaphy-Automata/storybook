import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';
import map from 'lodash/map';
import { SubmissionError, reset } from 'redux-form';

//Custom Import
import SelectedLabel from '../SelectLabel';
import OverFlowLabel from '../OverFlowLabel';

//Import Action..
import {addSelectedUserToListAction} from '../TaskList/TaskListActions';
//import {  addUserElementAction,addLabelElementAction, labelDialogOpenedAction, initializeLabelDialogFormAction, editLabelAction, addLabelAction} from '../../AllTaskActions';
import LabelDialog from '../LabelDialog';

//Import CSS
import './TagContainer.css';


const handleSubmit = function(props, value){
    const {
        reset,
        initializeLabelDialogFormData,
        editLabelAction,
        addLabelAction,
        initializeLabelDialogFormAction
    } = props;

    if(initializeLabelDialogFormData){
        editLabelAction(value);
        initializeLabelDialogFormAction(null);
        reset('labelCreateForm');

    } else{
        value = {
            ...value,
            isSelected : false
        }
        addLabelAction(value);
        initializeLabelDialogFormAction(null);
        reset('labelCreateForm');
    }
}


const TagContainer = (props) => {

    const {
        isButtonClicked, 
        onAddButtonClickedAction, 
        totalItemList, 
        selectedItemList, 
        type, 
        addUserElementAction, 
        addLabelElementAction, 
        isDialogOpened, 
        labelDialogOpenedAction, 
        initializeLabelDialogFormData
    } = props;

   // console.log("tag Container total list", totalItemList);
    const getClassName = function () {
        let className;
        if (isButtonClicked) {
            className = `tag-container-data-container-without-border`;
        } else {
            className = `tag-container-data-container`;
        }
        return className
    }

    const getIconType = function () {
        let iconName;
        if (type === "user") {
            iconName = "user"
        } else if (type === "label") {
            iconName = "tags";
        }

        return iconName;
    }

    const onOpenLabelDialog = function(){
        labelDialogOpenedAction(true);
    }

    const onSubmit = function(value){
        return handleSubmit(props, value);
    }

    return (
        <div>
            <div className={getClassName()}>
                <div className="tag-container-type-container">
                    <Icon style={{marginTop:8}}name={getIconType()} />
                </div>
                {type==="label" && <div className="tag-container-list-container">
                    {
                        map(selectedItemList, function(selectedItem, index){
                            return(
                                <OverFlowLabel key={index} name={selectedItem.name} color = {selectedItem.color}></OverFlowLabel>
                            )
                        })
                    }
                </div>}
                {type === "user" && <div className="tag-container-list-container">
                    {
                        map(selectedItemList, function(selectedItemId, index){
                            const userObj = totalItemList.byId[selectedItemId];
                            let name = `${userObj.firstName}`
                            const lastName = `${userObj.lastName}` ? `${userObj.lastName}` : "";
                            name = `${name} ${lastName}`
                            return(
                                <OverFlowLabel key={index} name={name} src = "fdr"></OverFlowLabel>
                            )
                        })
                    }
                </div>}
                <div className="tag-container-add-button-container" onClick={onAddButtonClickedAction}>
                    {!isButtonClicked && <Icon size="small" name="add" style={{ margin: 0 }} ></Icon>}
                    {isButtonClicked && <Icon size="small" name="close" style={{ margin: 0 }} ></Icon>}
                </div>
            </div>
            {isButtonClicked && 
                <div className="tag-conatiner-total-item-list-container">
                    {
                        map(totalItemList.allIds, function (itemId, index) {

                            const selectItemClick = function(){
                                if(type === "user"){
                                    
                                    let selectedItemDataList = [...selectedItemList];
                                    let notFoundCount = 0;
                                    for(var i=0;i<selectedItemDataList.length;i++){
                                        if(selectedItemDataList[i] === itemId){
                                            
                                            selectedItemDataList.splice(i, 1);
                                            console.log("Select Item List", selectedItemList, selectedItemDataList);
                                            //console.log("Checking Selected Value", selectedItemDataList);
                                            break;
                                        }
                                        notFoundCount ++;
                                    }
                                    if(notFoundCount === selectedItemList.length){
                                        console.log(" I am getting called", selectedItemDataList, notFoundCount, selectedItemList.length);
                                        selectedItemDataList.push(itemId);
                                    }
                                  
                                    props.addSelectedUserToListAction(selectedItemDataList);
                                }
                                // itemObj = {
                                //     ...itemObj,
                                //     isSelected : !itemObj.isSelected
                                // }
                                // if(type === "label"){
                                //     addLabelElementAction(itemObj);
                                // } else if(type === "user"){
                                //     addUserElementAction(itemObj);
                                // }

                            }

                            const getSelectedValue = function(){
                                let isSelected = false;
                                if(type === "user"){
                                    for(var i=0;i<selectedItemList.length;i++){
                                        console.log("Selecred User ", itemId);
                                        if(selectedItemList[i] === itemId){
                                            isSelected = true;
                                            break;
                                        }
                                    }
                                }

                                return isSelected;
                            }

                            const itemObj = totalItemList.byId[itemId];
                            let name = `${itemObj.firstName}`
                            const lastName = `${itemObj.lastName}` ? `${itemObj.lastName}` : "";
                            name = `${name} ${lastName}`

                            return (
                                <div key={index} style={{ display: "inline-block" }}>
                                    {index !== totalItemList.length - 1 && <SelectedLabel key={index} style={{ marginRight: 10, marginBottom:10}} name={name} isSelected={getSelectedValue()} color={itemObj.color} onClick={selectItemClick}/>}
                                    {index === totalItemList.length - 1 && type === "label" && <Button size="tiny" onClick={onOpenLabelDialog} basic>
                                        <Icon name="tag" />
                                        Create/Update Label
                                    </Button>}
                                    {index === totalItemList.length -1 && type==="user" && <Button size="tiny" basic>
                                        <Icon name="user" />
                                    Invite Team
                                    </Button>}
                                </div>
                            )
                        })
                    }
                </div>}
                 {type==="label" && <LabelDialog isDialogOpened= {isDialogOpened} totalItemList = {totalItemList} initialValues={initializeLabelDialogFormData} onSubmit={onSubmit} labelDialogOpenedAction={labelDialogOpenedAction}></LabelDialog>}
        </div>
    )
}


// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        selectedItemList : store.TaskListReducer.selectedUserList,
        // isLabelDialogOpened : store.AllTaskReducer.isLabelDialogOpened,
        // initializeLabelDialogFormData : store.AllTaskReducer.initializeLabelDialogFormData
    }
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    addSelectedUserToListAction
    // addLabelElementAction,
    // addUserElementAction,
    // labelDialogOpenedAction,
    // initializeLabelDialogFormAction,
    // reset,
    // editLabelAction,
    // addLabelAction
};



export default connect(mapStateToProps, mapActionsToProps)(TagContainer);