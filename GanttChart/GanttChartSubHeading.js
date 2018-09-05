/**
 * Created by Robins 29th July 2018
 */
import React, {Component} from "react";
import PropTypes from 'prop-types';

import CircularLabel from "../CircularLabel";


const GanttChartSubHeading = ({}) => {
    return (
        <div className="gantt-chart-top-subheading-container">
            <CircularLabel colorCode="#ffc162" iconStyle={{
                opacity: "0.30"
            }} title="pending" />
            <CircularLabel colorCode="#ff4141" title="delayed" iconStyle={{
                opacity: "0.30"
            }}/>
            <CircularLabel colorCode="#a177ff" title="in progress"iconStyle={{
                opacity: "0.30"
            }}/>
            <CircularLabel colorCode="#5ee2a0" title="completed"  iconStyle={{
                opacity: "0.30"
            }}/>
            <CircularLabel colorCode="#75818d" title="unassigned date" iconStyle={{
                opacity: "0.30"
            }}/>
        </div>
    )
};



GanttChartSubHeading.propTypes = {

};



export default GanttChartSubHeading;
