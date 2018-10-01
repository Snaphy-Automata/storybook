import React from 'react';
import PropTypes from 'prop-types';
import { Icon,} from 'semantic-ui-react'
import 'react-day-picker/lib/style.css'

//Custom Import

import "./TeamCircleIcon.css";

const TeamCircleIcon = ({
    className,
    style,
    onClick,
    title,
    icon,
    size,
    src,
    iconClassName,
}) => {
    //size = mini | tiny | small | large | big | huge | massive;

    let char
    char = title ? title[0] : undefined;

    className = className ? `team-circle-icon-wrapper ${className}` : `team-circle-icon-wrapper`;
    className = size ? `${className} ${size}` : className;


    return (
        <div style={{cursor:"pointer"}} className={className} style={style} onClick={onClick}>
              
                    {!icon && src && <img className="team-circle-icon-image-container" src="https://homepages.cae.wisc.edu/~ece533/images/boat.png" />}
                    {char && !src && <div>{char}</div>}
                    {!char && icon && <Icon className={iconClassName} name={icon} />}

        </div>

    )
};


TeamCircleIcon.defaultProps = {
  icon: "user"
}


TeamCircleIcon.propTypes = {
    src: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    onClick: PropTypes.func,
}


export default TeamCircleIcon;

