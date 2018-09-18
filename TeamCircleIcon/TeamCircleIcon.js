import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Popup } from 'semantic-ui-react'
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'

//Custom Import

import "./TeamCircleIcon.css";
import AssignedUserDialog from "../AssignedUserDialog";

//FIXME: Implement tooltip.. 2nd Aug 2018 Robins
//FIXME: Robins
//Why is datepicker in
const TeamCircleIcon = ({
    className,
    style,
    onClick,
    title,
    icon,
    size,
    src,
    tooltip,
    isAssinedUserDialogOpened,
    onClose,
    task,
    isDatePicker,
    isDatePickerOpened,
    onDatePickerOpenedAction,
    previousDateDialogId,
    onDatePicked,
    findMemberById,
    memberIdList,
    taskMemberList,
    onQuickUpdateTaskMembers
}) => {
    //size = mini | tiny | small | large | big | huge | massive;

    let char
    char = title ? title[0] : undefined;

    className = className ? `team-circle-icon-wrapper ${className}` : `team-circle-icon-wrapper`;
    className = size ? `${className} ${size}` : className;

    const onDayChanged = function(day){
        console.log("Date Picked", day, task);
        onDatePicked(task.id, day);
        onDatePickerOpenedAction(previousDateDialogId, false, task.id)

    }
    if(!isDatePicker){

        //console.log("Tooltip Data", tooltip);
    }


    return (
        <div className={className}>
            {
                !isDatePicker && tooltip &&
                <div>
                    {
                        !isAssinedUserDialogOpened && <Popup
                            trigger={<div>{!isAssinedUserDialogOpened && <div onClick={onClick} style={style}>
                                {!icon && src && <img className="team-circle-icon-image-container" src="https://homepages.cae.wisc.edu/~ece533/images/boat.png" />}
                                {char && !src && char}

                                {!char && icon && <Icon name={icon} />}
                            </div>}</div>}
                            content={tooltip}
                            position='bottom center'
                            inverted
                            style={{ fontSize: '10px', paddingRight: "10px", paddingLeft: "10px", maxWidth: "200px", letterSpacing: "0.5px", wordBreak: "break-word", opacity: "0.8" }}
                            size='mini'
                        >
                        </Popup>
                    }
                    <Popup
                        trigger={<div>{isAssinedUserDialogOpened && <div onClick={onClick} style={style}>
                            {!icon && src && <img className="team-circle-icon-image-container" src="https://homepages.cae.wisc.edu/~ece533/images/boat.png" />}
                            {char && !src && char}
                            {!char && icon && <Icon name={icon} />}
                        </div>}</div>}
                        content={<AssignedUserDialog onClose={onClose} task={task} memberIdList={memberIdList} findMemberById={findMemberById} onQuickUpdateTaskMembers={onQuickUpdateTaskMembers} taskMemberList={taskMemberList}/>}
                        position='bottom center'
                        on='click'
                        //open
                        open={isAssinedUserDialogOpened}
                        onClose={onClose}
                        hideOnScroll
                        style={{ width: "242px", padding: "0" }}
                        size='mini'>
                    </Popup>
                </div>
            }
            {
                !isDatePicker && !tooltip && <div onClick={onClick} className={className} style={style}>
                    {!icon && src && <img className="team-circle-icon-image-container" src="https://homepages.cae.wisc.edu/~ece533/images/boat.png" />}
                    {char && !src && char}
                    {!char && icon && <Icon name={icon} />}
                </div>
            }
            {
                isDatePicker && tooltip &&
                <div>
                    {
                        !isDatePickerOpened && <Popup
                            trigger={<div>{!isDatePickerOpened && <div onClick={onClick} style={style}>
                                {!icon && src && <img className="team-circle-icon-image-container" src="https://homepages.cae.wisc.edu/~ece533/images/boat.png" />}
                                {char && !src && char}

                                {!char && icon && <Icon name={icon} />}
                            </div>}</div>}
                            content={tooltip}
                            position='bottom center'
                            inverted
                            style={{ fontSize: '10px', paddingRight: "10px", paddingLeft: "10px", maxWidth: "200px", letterSpacing: "0.5px", wordBreak: "break-word", opacity: "0.8" }}
                            size='mini'
                        >

                        </Popup>
                    }
                    <Popup
                        trigger={<div>{isDatePickerOpened && <div onClick={onClick} style={style}>
                            {!icon && src && <img className="team-circle-icon-image-container" src="https://homepages.cae.wisc.edu/~ece533/images/boat.png" />}
                            {char && !src && char}

                            {!char && icon && <Icon name={icon} />}
                        </div>}</div>}
                        content={<div style={{textAlign:'center'}}>
                            <DayPicker className = "date-picker-container" onDayClick={onDayChanged}/>
                        </div>}
                        position='bottom center'
                        on='click'
                        open={isDatePickerOpened}
                        onClose={onClose}
                        hideOnScroll
                        style={{ width: "242px", padding: "0" }}
                        size='mini'
                    >

                    </Popup>

                </div>
            }

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
    tooltip: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
}


export default TeamCircleIcon;

