import React from 'react';
import {Form, Icon} from 'semantic-ui-react';
import {connect} from 'react-redux';
import map from 'lodash/map';

import './TagElement.css';
import IconLabel from '../IconLabel';
import {onAddButtonClickedAction, addOptionsAction} from './TagElementAction';


const TagElement = (props) => {

    const{
        isButtonClicked,
        optionList
    } = props;

    const onAddButtonClicked = function(){
        console.log("Add Button Clicked", isButtonClicked);
        props.onAddButtonClickedAction(!props.isButtonClicked);
    }

    const onHandleAddItem = (e, {value}) => {
        props.addOptionsAction({ text: value, value });
    }

    const getClassName = function(){
        let className;
        if(isButtonClicked){
            className = `tag-element-data-container-without-border`;
        } else{
            className = `tag-element-data-container`;
        }
        return className
    }

    const onHandleBlur = function(){
        console.log("On Handle Blur");
        props.onAddButtonClickedAction(!props.isButtonClicked);
    }
    const selectedOption = ['English'];

    return(
        <div className={getClassName()}>
            <div className="tag-element-list-container">
                {isButtonClicked && <Form.Dropdown options= {props.optionList} search selection multiple allowAdditions fluid onAddItem = {onHandleAddItem} onBlur = {onHandleBlur} value={selectedOption}/>}
                {!isButtonClicked && <div>
                    {
                        map(optionList, function(options, index){
                            return(
                                <div style={{display:'inline-block', marginRight:'5px'}}>
                                    <IconLabel size="mini" title="Nikita Mittal" name="Nikita Mittal" isLabel></IconLabel>
                                </div>
                            )
                        })
                    }
                </div>}
            </div>
            {!isButtonClicked && <div className="tag-element-add-button-container" onClick={onAddButtonClicked}>
                <Icon size="small" name="add" style={{margin:0}} ></Icon>
            </div>}

        </div>
    )
}

 // Retrieve data from store as props
 function mapStateToProps(store) {

    return {
        isButtonClicked : store.TagElementReducer.isButtonClicked,
        optionList : store.TagElementReducer.optionList
    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
  //map action here
  onAddButtonClickedAction,
  addOptionsAction
};


export default connect(mapStateToProps, mapActionsToProps)(TagElement);