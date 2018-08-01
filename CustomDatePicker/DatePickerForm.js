import React from 'react';
import {Field, reduxForm} from 'redux-form';

import CustomDatePicker from './CustomDatePicker';

const DatePickerForm = (props) =>{

    return (
        <Field width={6} inline  required name="dateValue" {...props} component={CustomDatePicker}></Field>
    )

}

const DatePickerReduxForm = reduxForm({
    form: "Date Form"
})(DatePickerForm);


export default DatePickerReduxForm;