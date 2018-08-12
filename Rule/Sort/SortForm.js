/**
 * Created By Robins
 * 28th June 2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react'


//Custom Import...
import SnaphyForm from '../../ReduxForm/SnaphyForm';
import {SORT_OPTIONS,} from '../Filter/FIlterData';
import DropDownField from '../../ReduxForm/DropDownField';


//style
import "./Sort.css";


/**
 * SortForm Component..
 * @param {*} props
 */
const SortForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, invalid, error, panelPropType, panelPropObj} = props;

  //FIXME: Also display error here.. 30th June 2018
  //https://redux-form.com/7.4.2/examples/fieldarrays/
  return (
    <SnaphyForm error={error}  onSubmit={handleSubmit} errorHeading={'Something went wrong!'} className="grid-view-rules-filter-form">
      <ul className="rules-filter-ul">
        <li>
          <Form.Group widths={16} inline>
            <Field  width={8} className="rules-filter-dropdown" inline options={panelPropType} required   name={`panelPropId`} type="text" size="large" component={DropDownField}  placeholder="Select Property"></Field>
            <Field  width={8} className="rules-filter-dropdown"  inline options={SORT_OPTIONS} required name={`type`} type="text" size="large" component={DropDownField} placeholder="Sort By"></Field>
          </Form.Group>
        </li>
      </ul>
    </SnaphyForm>
  );
};



SortForm.propTypes = {

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


export default reduxForm({
  form: 'gridViewSortForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(SortForm);
