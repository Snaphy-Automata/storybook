/**
 * Created By Robins
 * 30th June 2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Form, Button } from 'semantic-ui-react'
import { Field, FieldArray, reduxForm } from 'redux-form';
import map from 'lodash/map';


//Custom Import...
import InputForm from '../../ReduxForm/InputField';
import DropDownField from '../../ReduxForm/DropDownField';
import DatePicker from '../../ReduxForm/DatePicker/DatePicker';
import {
  QUERY_TYPE,
  TYPE_PARSER,
  BOOLEAN_FIELD_VALUE,
} from "./FIlterData";


//style
import "./Filter.css";


/**
 * FilterForm Component..
 * @param {*} props
 */
const FilterFormItem = ({ fields, meta: { error }, panelPropType, panelPropObj, where, changeReduxFieldValue}) => {
  const onAddBtnClick = () => {
    if(fields.length === 0){
      const field = initializeForm('and', panelPropType, panelPropObj);
      fields.push( field );
    }else{
      const lastField = fields.get(fields.length-1);
      const type = lastField.queryType?lastField.queryType:'and';
      const field = initializeForm(type, panelPropType, panelPropObj);
      fields.push(field);
    }
  }

  //FIXME: Also display error here.. 30th June 2018
  //https://redux-form.com/7.4.2/examples/fieldarrays/
  return (
    <ul className="rules-filter-ul">
      {fields.length === 0  &&
        <div className="rules-filter-empty-state">
          Click <span onClick={onAddBtnClick} className="rules-filter-add-filter-text-btn" >Add Filter</span> to apply filters
        </div>
      }
      {
        fields.map((filterItem, index) => {
          const queryTypeStyle = {};
          index === 0? queryTypeStyle.display = 'none': '';
          const fieldItem = fields.get(index);
          let typeOptions = [], dataType="", filterType="";

          if(fieldItem.panelPropId){
            //Get the Panel Prop Id item..
            let panelPropItem = panelPropObj[fieldItem.panelPropId]

            if(panelPropItem){
              const type = panelPropItem.type;
              if(TYPE_PARSER[type]){
                dataType = type;
                filterType = fieldItem.type;
                typeOptions = TYPE_PARSER[type];
              }
            }else{
              console.log("Unknown PanelProp type in filter.");
            }
          }

          //On Property Changed..
          const onPropertyChanged = (event, value) => {
            if(value){
              const panelPropItem = panelPropObj[value];
              if(panelPropItem){
                const type = panelPropItem.type;
                if(TYPE_PARSER[type]){
                  if(TYPE_PARSER[type]){
                    const filterTypeItem = TYPE_PARSER[type][0];
                    if(filterTypeItem){
                      setTimeout(()=> {
                        changeReduxFieldValue('gridViewFilterForm', `${filterItem}.type`, filterTypeItem.value);
                        changeReduxFieldValue('gridViewFilterForm', `${filterItem}.value`, "");
                      });
                    }
                  }
                }
                //Set filterType as first item as default..
              }
            }
          }; //func ends

          //Type value changed..
          const onTypeChanged = (event, value) => {
            //changeReduxFieldValue('gridViewFilterForm', `${filterItem}.value`, "");
            //console.log("Type Value changed.", value);
          };


          return (
            <li key={index}>
              <Form.Group widths={16} inline>
                { index === 0 && <div className="rules-filter-where-filter-first two wide field">where</div> }
                {index !== 0 && <Field style={queryTypeStyle} width={2} className="rules-filter-dropdown" inline options={QUERY_TYPE} required  name={`${filterItem}.queryType`} type="text" size="large" component={DropDownField} placeholder="where"></Field>}
                <Field onChange={onPropertyChanged} width={3} className="rules-filter-dropdown" inline options={panelPropType} required   name={`${filterItem}.panelPropId`} type="text" size="large" component={DropDownField}  placeholder="Property"></Field>
                <Field onChange={onTypeChanged}  width={3} className="rules-filter-dropdown"  inline options={typeOptions} required name={`${filterItem}.type`} type="text" size="large" component={DropDownField} placeholder="Filter"></Field>
                {getFilterInputComp(dataType, filterType, filterItem, panelPropType, panelPropObj, fieldItem)}
                <div onClick={() => fields.remove(index)} className="rules-filter-icon"><Icon name="close"></Icon></div>
              </Form.Group>
            </li>
          );
        })
      }
       <li onClick={onAddBtnClick} className="rules-filter-add-filter-text-btn">
        Add Filter
      </li>
    </ul>
  );
};



/**
 * Get Filter Input Componenet..
 * dataType string|number|boolean|date|
 * filterType contains|equals
 */
const getFilterInputComp = (dataType, filterType, filterItem, panelPropType, panelPropObj, data) => {
  //default
  let inputComp = (<Field  width={6} required name={`${filterItem}.value`} type="text" inline fluid component={InputForm} placeholder="Value"/>);

  if(filterType === 'is_empty' || filterType === 'is_not_empty'){
    inputComp = (<div className="six wide field"></div>)
  }else if( dataType === "enum" ){
    let ENUM_VALUES_OPTIONS = [];
    if(data.panelPropId && panelPropObj[data.panelPropId] && panelPropObj[data.panelPropId].options && panelPropObj[data.panelPropId].options.length){
      ENUM_VALUES_OPTIONS = map(panelPropObj[data.panelPropId].options, (item, index)=>{
        return {
          key: index,
          text: item,
          value: item,
        }
      });
    }
    inputComp = (<Field width={6} className="rules-filter-dropdown"  inline options={ENUM_VALUES_OPTIONS} required name={`${filterItem}.value`} type="text" size="large" component={DropDownField} placeholder="Select Value"></Field>);

  }else if(dataType === 'date'){
    let format = "MM/DD/YYYY";
    if(data.panelPropId && panelPropObj[data.panelPropId] && panelPropObj[data.panelPropId].format){
      format = panelPropObj[data.panelPropId].format;
    }
    inputComp = (<Field width={6} inline  required name={`${filterItem}.value`} component={DatePicker} placeholder="Select Date"></Field>);
  }

  if(filterType === 'is' && dataType === "boolean"){
    inputComp = (<Field width={6} className="rules-filter-dropdown" defaultValue={'true'} inline options={BOOLEAN_FIELD_VALUE} required name={`${filterItem}.value`} type="text" size="large" component={DropDownField} placeholder="Select Value"></Field>);
  }

  return inputComp;
}


FilterFormItem.propTypes = {

}


/**
 * Initialize form.....
 * @param {*} queryType
 * @param {*} panelPropList
 * @param {*} panelPropObj
 */
export const initializeForm = (queryType, panelPropList, panelPropObj) => {
  const panelPropId = panelPropList[0].value;
  const panelPropItem = panelPropObj[panelPropId];
  const FILTER_TYPE = TYPE_PARSER[panelPropItem.type]
  const FILTER_TYPE_ITEM = FILTER_TYPE[0];

  return {
    queryType,
    panelPropId,
    type: FILTER_TYPE_ITEM.value,
  }
}

export default FilterFormItem;
