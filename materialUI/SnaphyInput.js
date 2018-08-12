import React from "react";
import {Input} from 'semantic-ui-react';



/**
 * Snaphy Input Element
 * @param {*} props 
 */
const SnaphyInput = (props) => (
    <Input {...props}   className="material"  size="large" fluid/>
)


export default SnaphyInput;