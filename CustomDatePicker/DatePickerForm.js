import React from 'react';
import {Field, reduxForm} from 'redux-form';

import CustomDatePicker from './CustomDatePicker';

const DatePickerForm = () =>{

    return (
        <Field width={6} inline  required name="dateValue" component={CustomDatePicker} placeholder="Select Date"></Field>
    )

}

const DatePickerReduxForm = reduxForm({
    form: "Date Form"
})(DatePickerForm);


export default DatePickerReduxForm;