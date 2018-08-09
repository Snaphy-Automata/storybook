import React from 'react';
import {Field, reduxForm} from 'redux-form';

import CustomDatePicker from './CustomDatePicker';

const DatePickerForm = (props) =>{

    return (
        <Field inline  required name="dateValue" {...props} component={CustomDatePicker} style={props.style}></Field>
    )

}

const DatePickerReduxForm = reduxForm({
    form: "Date Form"
})(DatePickerForm);


export default DatePickerReduxForm;