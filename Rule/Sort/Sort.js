/**
 * Created By Robins
 * 28th June 2018
 */
import React from 'react';
import PropTypes from 'prop-types';



//Custom Import...
import SortForm from './SortForm';
//style
import "./Sort.css";


/**
 * Sort Component..
 * @param {*} props
 */
const Sort = ({className, style, panelPropType, panelPropObj}) => {

  className = className || "";
  className = `${className}`

  style = style || {};


  const initialValues = {

  };

  //Submit listener
  const onSubmit = function(value){
    console.log("Form Submitted");
    //return handleSubmit(props, value, helper);
  }

  return (
    <div className={className} style={style}>
      <div className="rules-sort-heading">
        Sort By
      </div>
      {/* Sort Form Area */}
      <div>
        <div>
          <SortForm panelPropType={panelPropType} panelPropObj={panelPropObj} initialValues={initialValues} onSubmit={onSubmit}></SortForm>
        </div>
      </div>
    </div>
  );
};


Sort.propTypes = {

}


export default Sort;
