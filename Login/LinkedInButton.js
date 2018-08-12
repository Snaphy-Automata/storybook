import React from 'react';
import { 
  Image
} from 'semantic-ui-react';


/**
 * Will return the LinkedIn Button
 */
const LinkedInButton = ({src, onHoverAction, onMouseOut, url, name}) => (
    <Image verticalAlign="middle" onMouseOver={onHoverAction} name={name} onMouseOut={onMouseOut} centered href={url} src={src} />
)



export default LinkedInButton;