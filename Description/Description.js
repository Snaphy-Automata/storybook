import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Form, TextArea } from 'semantic-ui-react'

import './Description'

const Description = ({placeholder, style}) => {
    return (
    <Form>
        <TextArea placeholder= {placeholder} style={style} />
    </Form>
    )
}

export default Description;