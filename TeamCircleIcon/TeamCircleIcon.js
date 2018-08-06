import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Popup } from 'semantic-ui-react'

//Custom Import

import "./TeamCircleIcon.css";
import AssignedUserDialog from "../AssignedUserDialog";

//FIXME: Implement tooltip.. 2nd Aug 2018 Robins

const TeamCircleIcon = ({ className, style, onClick, title, icon, size, src, tooltip, isAssinedUserDialogOpened, onClose }) => {
    //size = mini | tiny | small | large | big | huge | massive;

    let char
    char = title ? title[0] : undefined;

    className = className ? `team-circle-icon-wrapper ${className}` : `team-circle-icon-wrapper`;
    className = size ? `${className} ${size}` : className;

    console.log("Icon Props", isAssinedUserDialogOpened);

    return (
        <div>
            {
                tooltip &&
                // <Popup
                //             trigger={<div>{!isAssinedUserDialogOpened && <div onClick={onClick} className={className} style={style}>
                //                 {!icon && src && <img className="team-circle-icon-image-container" src="https://homepages.cae.wisc.edu/~ece533/images/boat.png" />}
                //                 {char && !src && char}

                //                 {!char && icon && <Icon name={icon} />}
                //             </div>}</div>}
                //             content={tooltip}
                //             position='bottom center'
                //             inverted
                //             style={{ ontSize: '10px', paddingRight: "10px", paddingLeft: "10px", maxWidth: "200px", letterSpacing: "0.5px", wordBreak: "break-word", opacity: "0.8" }}
                //             size='mini'
                //         >

                //         </Popup>
                <div>
                    {
                        !isAssinedUserDialogOpened && <Popup
                            trigger={<div>{!isAssinedUserDialogOpened && <div onClick={onClick} className={className} style={style}>
                                {!icon && src && <img className="team-circle-icon-image-container" src="https://homepages.cae.wisc.edu/~ece533/images/boat.png" />}
                                {char && !src && char}

                                {!char && icon && <Icon name={icon} />}
                            </div>}</div>}
                            content={tooltip}
                            position='bottom center'
                            inverted
                            style={{ ontSize: '10px', paddingRight: "10px", paddingLeft: "10px", maxWidth: "200px", letterSpacing: "0.5px", wordBreak: "break-word", opacity: "0.8" }}
                            size='mini'
                        >

                        </Popup>
                    }
                    <Popup
                        trigger={<div>{isAssinedUserDialogOpened && <div onClick={onClick} className={className} style={style}>
                            {!icon && src && <img className="team-circle-icon-image-container" src="https://homepages.cae.wisc.edu/~ece533/images/boat.png" />}
                            {char && !src && char}

                            {!char && icon && <Icon name={icon} />}
                        </div>}</div>}
                        content={<AssignedUserDialog onClose={onClose}/>}
                        position='bottom center'
                        on='click'
                        open={isAssinedUserDialogOpened}
                        onClose={onClose}
                        style={{ width: "242px", height: "217px", padding: "0" }}
                        size='mini'
                    >

                    </Popup>

                </div>

            }
            {
                !tooltip && <div onClick={onClick} className={className} style={style}>
                    {!icon && src && <img className="team-circle-icon-image-container" src="https://homepages.cae.wisc.edu/~ece533/images/boat.png" />}
                    {char && !src && char}
                    {!char && icon && <Icon name={icon} />}
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
