/**
 * Created by Robins Gupta
 * 23rd July 2018
 */

import React, { Component } from 'react';
import truncate from 'lodash/truncate';

//Custom Import
import TeamCircleIcon from "../TeamCircleIcon";

//Custom style
import "./GanttChart.css";

const GroupRenderer = ({group}) => {
    //console.log(group);
    const title = truncate(group.title,{
        'length': 24,
    });

    const icon = getAssignedToIcon(group);

    //https://github.com/namespace-ee/react-calendar-timeline#grouprenderer
    return (
        <div id={group.id} className="gantt-chart-group-wrapper">
            <div style={{
                display: "inline-block"
            }}>
                <TeamCircleIcon size="mini" {...icon}></TeamCircleIcon>
            </div>
            <div style={{
                display: "inline-block"
            }}>
                <div className="gantt-chart-group-title"> {title}</div>
                {/* <p className="tip">{group.title}</p> */}
            </div>
        </div>
    )
};

/**
 * Will return the Assigned to icon..
 * TODO: 24th Add icon to assigned or user name based on assigned to or some other..
 * //Also display unsassigned if cursor hover over it.
 */
const getAssignedToIcon = (task) => {
    const iconName = "user";
    const icon = {
        //icon: iconName,
        title : "Robins",
        //toolTip : name,
        onClick : () => ("Items has been clicked")
    }

    return icon;
}



export default GroupRenderer;
