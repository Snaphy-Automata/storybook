import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';
import map from 'lodash/map';
import { SubmissionError, reset } from 'redux-form';

//Custom Import
import SelectedLabel from '../SelectLabel';
import OverFlowLabel from '../OverFlowLabel';
import LabelDialog   from '../LabelDialog';

//Import Action..
import { onAddButtonClickedAction, addTagElementAction, addLabelAction, editLabelAction } from '../TagElement/TagElementAction';
import {initializeLabelDialogFormAction} from '../LabelDialog/LabelDialogAction';

//Import CSS
import './TagContainer.css';


const handleSubmit = function(props, value){
    const {
        reset,
        initializeLabelDialogFormData,
        editLabelAction,
        addLabelAction,
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

    const { isButtonClicked, onAddButtonClickedAction, addTagElementAction, totalItemList, selectedItemList, type, initializeLabelDialogFormData } = props;
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

    const onAddButtonClicked = function () {
        //console.log("Add Button Clicked", isButtonClicked);
        onAddButtonClickedAction(!isButtonClicked);
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
                        map(selectedItemList, function(selectedItem, index){
                            return(
                                <OverFlowLabel key={index} name={selectedItem.name} src = "fdr"></OverFlowLabel>
                            )
                        })
                    }
                </div>}
                <div className="tag-container-add-button-container" onClick={onAddButtonClicked}>
                    {!isButtonClicked && <Icon size="small" name="add" style={{ margin: 0 }} ></Icon>}
                    {isButtonClicked && <Icon size="small" name="close" style={{ margin: 0 }} ></Icon>}
                </div>
            </div>
            {isButtonClicked && <div className="tag-conatiner-total-item-list-container">
                {
                    map(totalItemList, function (itemObj, index) {

                        const selectItemClick = function(){
                            itemObj = {
                                ...itemObj,
                                isSelected : !itemObj.isSelected
                            }
                            addTagElementAction(itemObj);

                        }
                        return (
                            <div key={index} style={{ display: "inline-block" }}>
                                <SelectedLabel key={index} style={{ marginRight: 10, marginBottom:5}} name={itemObj.name} isSelected={itemObj.isSelected} color={itemObj.color} onClick={selectItemClick}/>
                                {index === totalItemList.length - 1 && type === "label" && <Button size="tiny" basic>
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
            <LabelDialog initialValues={initializeLabelDialogFormData} onSubmit={onSubmit}></LabelDialog>
        </div>
    )
}


// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        isButtonClicked: store.TagElementReducer.isButtonClicked,
        totalItemList : store.TagElementReducer.totalTagItemList,
        selectedItemList : store.TagElementReducer.selectedTagItemList,
        initializeLabelDialogFormData : store.LabelDialogReducer.initializeLabelDialogFormData
    }
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    onAddButtonClickedAction,
    addTagElementAction,
    reset,
    addLabelAction,
    editLabelAction,
    initializeLabelDialogFormAction,
};



export default connect(mapStateToProps, mapActionsToProps)(TagContainer);