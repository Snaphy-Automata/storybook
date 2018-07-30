import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon } from 'semantic-ui-react'

//Custom Import

import "./TeamCircleIcon.css";


const TeamCircleIcon = ({ className, style, onClick, title, icon, size, src})=>{
    //size = mini | tiny | small | large | big | huge | massive;

    let char
    char = title? title[0]: undefined;

    className = className? `team-circle-icon-wrapper ${className}`:`team-circle-icon-wrapper`; 
    className = size? `${className} ${size}`: className;
    
    return (
        <div onClick={onClick} className={className} style={style}>
            { char && char}
            {icon && <Icon  name={icon} />}
            {src && <img className="team-circle-icon-image-container" src="https://homepages.cae.wisc.edu/~ece533/images/boat.png"/>}
        </div>
    )
};


TeamCircleIcon.propTypes = {

}


export default TeamCircleIcon;

//   // Retrieve data from store as props
// function mapStateToProps(store) {

//     return {

//     };
// }


// //Map Redux Actions to Props..
// const mapActionsToProps = {
// //map action here

// };

  
//export default connect(mapStateToProps, mapActionsToProps)(TeamCircleIcon);
