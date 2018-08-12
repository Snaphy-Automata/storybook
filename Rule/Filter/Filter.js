/**
 * Created By Robins
 * 28th June 2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react'

//Custom Import
import FilterForm from './FilterForm';
import  { initializeForm} from './FilterFormItem';

//style
import "./Filter.css";


/**
 * Filter Component..
 * @param {*} props
 */
const Filter = ({className, style, panelPropType, panelPropObj}) => {

  className = className || "";
  className = `${className}`

  style = style || {};

  const initialValues = {
    where:[initializeForm('and', panelPropType, panelPropObj)]
  };

  //Submit listener
  const onSubmit = function(value){
    console.log("Form Submitted");
    //return handleSubmit(props, value, helper);
  }

  return (
    <div className={className} style={style}>
      <div className="rules-filter-heading">
        Filter
      </div>
      {/* FIlter Form Area */}
      <div>
        <div>
          <FilterForm panelPropType={panelPropType} panelPropObj={panelPropObj} initialValues={initialValues} onSubmit={onSubmit}></FilterForm>
        </div>
      </div>
    </div>
  );
};


Filter.propTypes = {

}


export default Filter;
