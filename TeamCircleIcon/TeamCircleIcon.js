import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon, Popup } from 'semantic-ui-react'

//Custom Import

import "./TeamCircleIcon.css";

//FIXME: Implement tooltip.. 2nd Aug 2018 Robins

const TeamCircleIcon = ({ className, style, onClick, title, icon, size, src, tooltip})=>{
    //size = mini | tiny | small | large | big | huge | massive;

    let char
    char = title? title[0]: undefined;

    className = className? `team-circle-icon-wrapper ${className}`:`team-circle-icon-wrapper`; 
    className = size? `${className} ${size}`: className;
    
    return (
        <div>
            {
                tooltip && <Popup 
                trigger={<div onClick={onClick} className={className} style={style}>
                { !icon && src && <img className="team-circle-icon-image-container" src="https://homepages.cae.wisc.edu/~ece533/images/boat.png"/>}
                { char && !src && char}

                { !char && icon && <Icon  name={icon} />}
                </div>} 
                content={tooltip}
                position='bottom center'
                inverted
                style={{fontSize:'10px', paddingRight:"20px", paddingLeft:"20px"}}
                size='mini'
                > 

                </Popup>
            }
            {
                !tooltip && <div onClick={onClick} className={className} style={style}>
                { !icon && src && <img className="team-circle-icon-image-container" src="https://homepages.cae.wisc.edu/~ece533/images/boat.png"/>}
                { char && !src && char}
                { !char && icon && <Icon  name={icon} />}
                </div>
            }
        </div>
        
    )
};


TeamCircleIcon.propTypes = {
    src: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
    tooltip: PropTypes.string,
    size: PropTypes.string,
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
