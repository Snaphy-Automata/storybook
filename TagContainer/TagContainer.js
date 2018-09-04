import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';
import map from 'lodash/map';
import { SubmissionError, reset } from 'redux-form';
import { generate } from 'shortid';

//Custom Import
import SelectedLabel from '../SelectLabel';
import OverFlowLabel from '../OverFlowLabel';

//Import Action..
import LabelDialog from '../LabelDialog';

//Import CSS
import './TagContainer.css';


const handleSubmit = function (props, value) {
    const {
        reset,
        labelDialogFormDataInit,
        saveLabel

    } = props;

    if (labelDialogFormDataInit) {
        //console.log("Edit Label value", value);
        saveLabel(value);
        //onUpdateLabelDialogForm(null);
        reset('labelCreateForm');

    } else {
        value = {
            ...value,
            isSelected: false
        }
        value.id = generate();
        saveLabel(value);
        //onUpdateLabelDialogForm(null);
        reset('labelCreateForm');
    }
}


const TagContainer = (props) => {

    const {
        isButtonClicked,
        onAddButtonClickedAction,
        totalItemList,
        type,
        taskId,
        selectedMemberListObj,
        selectedLabelListObj,
        updateTaskSelectedLabelList,
        updateTaskSelectedMemberList,
        userObj,
        findLabelById,
        labelDialogState,
        onLabelDialogStateChanged,
        onUpdateLabelDialogForm,
        labelDialogFormDataInit,
        saveLabel,
        deleteLabel
    } = props;

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

    const onOpenLabelDialog = function () {
        onLabelDialogStateChanged(true);
    }

    const onSubmit = function (value) {
        return handleSubmit(props, value);
    }

    let selectedMemberList = [];
    if (selectedMemberListObj && selectedMemberListObj.taskId === taskId) {
        selectedMemberList = selectedMemberListObj.selectedMemberList;
    }

    let selectedLabelList = [];
    if (selectedLabelListObj && selectedLabelListObj.taskId === taskId) {
        selectedLabelList = selectedLabelListObj.selectedLabelList;
        //console.log("Tag Container", selectedLabelListObj.selectedLabelList);
    }

    return (
        <div>
            <div className={getClassName()}>
                <div className="tag-container-type-container">
                    <Icon style={{ marginTop: 8 }} name={getIconType()} />
                </div>
                {type === "label" && <div className="tag-container-list-container">
                    {
                        map(selectedLabelList, function (selectedItem, index) {
                            const labelObj = findLabelById(selectedItem);
                            let title = `${labelObj.title}`
                            let colorCode = `${labelObj.colorCode}`
                            return (
                                <OverFlowLabel key={index} name={title} color={colorCode}></OverFlowLabel>
                            )
                        })
                    }
                </div>}
                {type === "user" && <div className="tag-container-list-container">
                    {
                        map(selectedMemberList, function (selectedItemId, index) {
                            const userObjData = userObj.byId[selectedItemId];
                            let name = `${userObjData.firstName}`
                            const lastName = `${userObjData.lastName}` ? `${userObjData.lastName}` : "";
                            name = `${name} ${lastName}`
                            return (
                                <OverFlowLabel key={index} name={name} src="fdr"></OverFlowLabel>
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
                    {totalItemList.length !== 0 && <div>
                        {
                            map(totalItemList, function (itemObj, index) {
                                //console.log("Total Item list getting called", totalItemList);

                                const selectItemClick = function () {
                                    let itemId = itemObj.id;
                                    let selectedItemDataList;
                                    if (type === "user") {
                                        selectedItemDataList = [...selectedMemberList];
                                    } else if (type === "label") {
                                        selectedItemDataList = [...selectedLabelList];

                                    }

                                    for (var i = 0; i < selectedItemDataList.length; i++) {
                                        if (selectedItemDataList[i] === itemId) {
                                            selectedItemDataList.splice(i, 1);
                                            break;
                                        }
                                    }
                                    if (type === "user") {
                                        if (selectedItemDataList.length === selectedMemberList.length) {
                                            selectedItemDataList.push(itemId);
                                        }
                                        //console.log("Selected Item List", selectedItemDataList);
                                        updateTaskSelectedMemberList(selectedItemDataList);
                                    } else if (type === "label") {
                                        if (selectedItemDataList.length === selectedLabelList.length) {
                                            selectedItemDataList.push(itemId);
                                        }
                                        updateTaskSelectedLabelList(selectedItemDataList);
                                    }

                                }

                                const getSelectedValue = function () {
                                    let isSelected = false;
                                    const itemId = itemObj.id;
                                    if (type === "user") {
                                        for (var i = 0; i < selectedMemberList.length; i++) {
                                            if (selectedMemberList[i] === itemId) {
                                                isSelected = true;
                                                break;
                                            }
                                        }
                                    } else if (type === "label") {
                                        for (var i = 0; i < selectedLabelList.length; i++) {
                                            if (selectedLabelList[i] === itemId) {
                                                isSelected = true;
                                                break;
                                            }
                                        }
                                    }
                                    return isSelected;
                                }

                                const getName = function () {
                                    //const itemObj = totalItemList.byId[itemId];
                                    let name;
                                    if (type === "user") {
                                        name = `${itemObj.firstName}`
                                        const lastName = `${itemObj.lastName}` ? `${itemObj.lastName}` : "";
                                        name = `${name} ${lastName}`
                                    } else if ("label") {
                                        name = `${itemObj.title}`
                                    }
                                    //console.log("Name", name);
                                    return name;
                                }

                                const getColor = function () {
                                    //const itemObj = totalItemList.byId[itemId];
                                    let color;
                                    if (type === "label") {
                                        color = `${itemObj.colorCode}`
                                    }
                                    return color;
                                }



                                return (
                                    <div key={index} style={{ display: "inline-block" }}>
                                        <SelectedLabel key={index} style={{ marginRight: 10, marginBottom: 10 }} name={getName()} isSelected={getSelectedValue()} color={getColor()} onClick={selectItemClick} />
                                        {totalItemList.length !== 0 && index === totalItemList.length - 1 && type === "label" && <Button size="tiny" onClick={onOpenLabelDialog} basic>
                                            <Icon name="tag" />
                                            Create/Update Label
                                            </Button>}
                                        {totalItemList.length === 0 && <Button size="tiny" onClick={onOpenLabelDialog} basic>
                                            <Icon name="tag" />
                                            Create/Update Label
                                            </Button>}
                                        {totalItemList.length !== 0 && index === totalItemList.length - 1 && type === "user" && <Button size="tiny" basic>
                                            <Icon name="user" />
                                            Invite Team
                                            </Button>}
                                        {totalItemList.length === 0 && <Button size="tiny" basic>
                                            <Icon name="user" />
                                            Invite Team
                                            </Button>}

                                    </div>
                                )
                            })
                        }
                    </div>}
                    {totalItemList.length === 0 && type === "label" && <Button size="tiny" onClick={onOpenLabelDialog} basic>
                        <Icon name="tag" />
                        Create/Update Label
                </Button>}

                </div>}
            {type === "label" && <LabelDialog isDialogOpened={labelDialogState} totalItemList={totalItemList} initialValues={labelDialogFormDataInit} formData={labelDialogFormDataInit} onSubmit={onSubmit} onLabelDialogStateChanged={onLabelDialogStateChanged} onUpdateLabelDialogForm={onUpdateLabelDialogForm} deleteLabel={deleteLabel}></LabelDialog>}
        </div>
    )
}


// Retrieve data from store as props
function mapStateToProps(store) {
    //console.log("Map To state Props of tag container");
    return {
        // isLabelDialogOpened : store.AllTaskReducer.isLabelDialogOpened,
        // initializeLabelDialogFormData : store.AllTaskReducer.initializeLabelDialogFormData
    }
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    reset
    // addLabelElementAction,
    // addUserElementAction,
    // labelDialogOpenedAction,
    // initializeLabelDialogFormAction,
    // reset,
    // editLabelAction,
    // addLabelAction
};



export default connect(mapStateToProps, mapActionsToProps)(TagContainer);
