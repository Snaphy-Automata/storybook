import React from "react";
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react'


const SnaphyBackButton = function(props){

    const {onBack} = props;

    return (
        <Icon name="arrow left" size="small" onClick={onBack}></Icon>
    )
}


SnaphyBackButton.prototypes = {
    onBack : PropTypes.func.isRequired
}


export default SnaphyBackButton;