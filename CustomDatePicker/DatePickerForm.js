import React from 'react';
import {Field, reduxForm} from 'redux-form';

import CustomDatePicker from './CustomDatePicker';
import SnaphyForm from '../ReduxForm/SnaphyForm';

const DatePickerForm = (props) =>{

    //console.log("Date Picker Form ", props);

    return (
        <SnaphyForm>
        <Field inline dataType={props.dataType} required name={props.nameValue} {...props} component={CustomDatePicker} style={props.style}></Field>
        </SnaphyForm>
    )

}

const DatePickerReduxForm = reduxForm({
    form: "Date Form"
})(DatePickerForm);


export default DatePickerReduxForm;