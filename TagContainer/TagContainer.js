import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';
import map from 'lodash/map';
import { SubmissionError, reset } from 'redux-form';

//Custom Import
import SelectedLabel from '../SelectLabel';
import OverFlowLabel from '../OverFlowLabel';

//Import Action..
import {addSelectedUserToListAction, addSelectedLabelToListAction} from '../TaskList/TaskListActions';
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
        initializeLabelDialogFormAction,
        
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
        selectedLabelList,
        type, 
        isDialogOpened, 
        labelDialogOpenedAction, 
        initializeLabelDialogFormData,
        taskId,
        selectedMemberListObj,
        updateTaskSelectedMemberList,
        userObj
    } = props;

    //console.log("tag Container total list", totalItemList);
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

    let selectedMemberList = [];
    if(selectedMemberListObj && selectedMemberListObj.taskId === taskId){
        selectedMemberList = selectedMemberListObj.selectedMemberList;
    }

    return (
        <div>
            <div className={getClassName()}>
                <div className="tag-container-type-container">
                    <Icon style={{marginTop:8}}name={getIconType()} />
                </div>
                {type==="label" && <div className="tag-container-list-container">
                    {
                        map(selectedLabelList, function(selectedItem, index){
                            const labelObj = totalItemList.byId[selectedItem];
                            let title = `${labelObj.title}`
                            let colorCode = `${labelObj.colorCode}`
                            return(
                                <OverFlowLabel key={index} name={title} color = {colorCode}></OverFlowLabel>
                            )
                        })
                    }
                </div>}
                {type === "user" && <div className="tag-container-list-container">
                    {
                        map(selectedMemberList, function(selectedItemId, index){
                            const userObjData = userObj.byId[selectedItemId];
                            let name = `${userObjData.firstName}`
                            const lastName = `${userObjData.lastName}` ? `${userObjData.lastName}` : "";
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
                        map(totalItemList, function (itemObj, index) {

                            const selectItemClick = function(){
                                let itemId = itemObj.id;
                                let selectedItemDataList;
                                if(type === "user"){
                                    selectedItemDataList = [...selectedMemberList];
                                } else if(type === "label"){

                                }

                                for(var i=0;i<selectedItemDataList.length;i++){
                                    if(selectedItemDataList[i] === itemId){
                                        selectedItemDataList.splice(i, 1);
                                        break;
                                    }
                                }
                                if(type === "user"){
                                    if(selectedItemDataList.length === selectedMemberList.length){
                                        selectedItemDataList.push(itemId);
                                    }
                                    //console.log("Selected Item List", selectedItemDataList);
                                    updateTaskSelectedMemberList(selectedItemDataList);
                                }
                               


                                // let selectedItemDataList;
                                // if(type === "user"){
                                //      selectedItemDataList = [...selectedUserList];
                                // } else if(type === "label"){
                                //     selectedItemDataList = [...selectedLabelList];
                                // }
                                // let notFoundCount = 0;
                                // for(var i=0;i<selectedItemDataList.length;i++){
                                //     if(selectedItemDataList[i] === itemId){
                                        
                                //         selectedItemDataList.splice(i, 1);
                                //         break;
                                //     }
                                //     notFoundCount ++;
                                // }
                                // if(type === "user"){
                                //     if(notFoundCount === selectedUserList.length){
                                //         selectedItemDataList.push(itemId);
                                //     }
                                //     props.addSelectedUserToListAction(selectedItemDataList);
                                // } else if(type === "label"){
                                //     if(notFoundCount === selectedLabelList.length){
                                //         selectedItemDataList.push(itemId);
                                //     }
                                //     props.addSelectedLabelToListAction(selectedItemDataList);
                                // }
                               
                                // if(type === "user"){
                                  
                                // } else if(type === "label"){
                                //     console.log("Add Selected Label", selectedItemDataList);
                                   
                                // }

                            }

                            const getSelectedValue = function(){
                                let isSelected = false;
                                const itemId = itemObj.id;
                                if(type === "user"){
                                    for(var i=0;i<selectedMemberList.length;i++){
                                        if(selectedMemberList[i] === itemId){
                                            isSelected=true;
                                            break;
                                        }
                                    }
                                }
                                return isSelected;
                                // let isSelected = false;
                                // if(type === "user"){
                                //     for(var i=0;i<selectedUserList.length;i++){
                                //         //console.log("Selecred User ", itemId);
                                //         if(selectedUserList[i] === itemId){
                                //             isSelected = true;
                                //             break;
                                //         }
                                //     }
                                // } else if(type === "label"){
                                //     for(var i=0;i<selectedLabelList.length;i++){
                                //         console.log("Selecred User ", itemId);
                                //         if(selectedLabelList[i] === itemId){
                                //             isSelected = true;
                                //             break;
                                //         }
                                //     }
                                // }

                                // return isSelected;
                            }

                            const getName = function(){
                                //const itemObj = totalItemList.byId[itemId];
                                let name;
                                if(type === "user"){
                                    name = `${itemObj.firstName}`
                                    const lastName = `${itemObj.lastName}` ? `${itemObj.lastName}` : "";
                                    name = `${name} ${lastName}`
                                } else if("label"){
                                    name = `${itemObj.title}`
                                }
                                //console.log("Name", name);
                                return name;
                            }

                            const getColor = function(){
                                //const itemObj = totalItemList.byId[itemId];
                                let color;
                                if(type === "label"){
                                    color = `${itemObj.colorCode}`
                                }
                                return color;
                            }

                           

                            return (
                                <div key={index} style={{ display: "inline-block" }}>
                                    {index === 0 && <SelectedLabel key={index} style={{ marginRight: 10, marginBottom:10}} name={getName()} isSelected={getSelectedValue()} color={getColor()} onClick={selectItemClick}/>}
                                    {index !== totalItemList.length - 1 && <SelectedLabel key={index} style={{ marginRight: 10, marginBottom:10}} name={getName()} isSelected={getSelectedValue()} color={getColor()} onClick={selectItemClick}/>}
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
    //console.log("Map To state Props of tag container");
    return {
        selectedUserList : store.TaskListReducer.selectedUserList,
        selectedLabelList : store.TaskListReducer.selectedLabelList,
        // isLabelDialogOpened : store.AllTaskReducer.isLabelDialogOpened,
        // initializeLabelDialogFormData : store.AllTaskReducer.initializeLabelDialogFormData
    }
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    addSelectedUserToListAction,
    addSelectedLabelToListAction
    // addLabelElementAction,
    // addUserElementAction,
    // labelDialogOpenedAction,
    // initializeLabelDialogFormAction,
    // reset,
    // editLabelAction,
    // addLabelAction
};



export default connect(mapStateToProps, mapActionsToProps)(TagContainer);