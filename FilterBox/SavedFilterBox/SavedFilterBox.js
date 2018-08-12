import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react'


//Custom Import...
//style
import "./SavedFilterBox.css";


/**
 * Grid View Component..
 * @param {*} props
 */
const SavedFilterBox = ({onClick, label, isActive, className, style, isEditView, onEditBtnClick, onDeleteBtnClick}) => {
  className = className || "";
  style = style || {};

  let containerClassName = isActive? "saved-filter-box active": "saved-filter-box";
  containerClassName = `${containerClassName} ${className}`;

  let btnClass = `saved-filter-box-btn`;
  btnClass = isActive? `${btnClass} active`: btnClass;

  if(isEditView){
    return (editViewFilterComp(onEditBtnClick, onDeleteBtnClick, containerClassName, style, label, btnClass));
  }else{
    return (savedFilterComp(onClick, containerClassName, style, label, btnClass));
  }
};




/**
 * Saved Filter Component
 * @param {*} onEditBtnClick
 * @param {*} onDeleteBtnClick
 * @param {*} containerClassName
 * @param {*} style
 * @param {*} label
 * @param {*} btnClass
 */
const editViewFilterComp = (onEditBtnClick, onDeleteBtnClick, containerClassName, style, label, btnClass) => {
  return (
    <div className={containerClassName} style={style}>
      <div className="saved-filter-box-heading">
        {label}
      </div>
      <div title="Edit" onClick={onEditBtnClick} className={btnClass}>
        <Icon style={{
          marginRight:0
        }} name='pencil' />
      </div>
      <div title="Delete" onClick={onDeleteBtnClick} className={btnClass}>
        <Icon style={{
          marginRight:0
        }} name='trash' />
      </div>
    </div>
  );
}


/**
 * Saved Filter Component
 * @param {*} onClick
 * @param {*} containerClassName
 * @param {*} style
 * @param {*} label
 * @param {*} btnClass
 */
const savedFilterComp = (onClick, containerClassName, style, label, btnClass) => {
  return (
    <div onClick={onClick} className={containerClassName} style={style}>
      <div  className="saved-filter-box-heading">
        {label}
      </div>
      <div className={btnClass}>
        <Icon style={{
          marginRight:0
        }} name='check' />
      </div>
    </div>
  );
}



SavedFilterBox.propTypes = {
  //GridView data fetched using GraphQL
  //GridView ROuter..
  // match: PropTypes.shape({
  //     params: PropTypes.shape({
  //         projectId: PropTypes.string.isRequired,
  //         projectSlug: PropTypes.string.isRequired,
  //     }),
  // }).isRequired,
}





export default SavedFilterBox;
