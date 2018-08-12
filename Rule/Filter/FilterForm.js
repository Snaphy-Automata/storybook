/**
 * Created By Robins
 * 28th June 2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm, formValueSelector, change } from 'redux-form';
import {connect} from 'react-redux';

//Custom Import...
import SnaphyForm from '../../ReduxForm/SnaphyForm';
import FilterFormItem from './FilterFormItem';
import {
  TYPE_PARSER,
 } from "./FIlterData";


//style
import "./Filter.css";


/**
 * FilterForm Component..
 * @param {*} props
 */
const FilterForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, invalid, error, panelPropType, panelPropObj, where, changeReduxFieldValue} = props;
  return (
    <SnaphyForm error={error}  onSubmit={handleSubmit} errorHeading={'Something went wrong!'} className="grid-view-rules-filter-form">
      <FieldArray changeReduxFieldValue={changeReduxFieldValue} where={where} panelPropType={panelPropType} panelPropObj={panelPropObj} name={`where`} component={FilterFormItem} />
    </SnaphyForm>
  );
};


FilterForm.propTypes = {

}




/**
 * Will validate form data for login.
 */
const validate = values => {
  const errors = {}

  console.log(values);

  // if (!values.title) {
  //   errors.title = 'Required'
  // }

  // if (!values.color) {
  //   errors.color = 'Required'
  // }

  return errors
}

const GridViewFilterForm = reduxForm({
  form: 'gridViewFilterForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(FilterForm);

//Decorate with connect to read form values
const selector = formValueSelector('gridViewFilterForm') // <-- same as form name
const GridViewCreateForm = connect(
  state => {
    //Required for forcing auto reloading..
    // // can select values individually
    const where = selector(state, 'where')
    // Check all where types
    return {
      where,
    }
  },
  //actionToProps
  {
    changeReduxFieldValue: change
  }
  )(GridViewFilterForm)


export default GridViewCreateForm;
