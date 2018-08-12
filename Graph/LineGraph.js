/* 
Created By Robins 
10th April 2018
*/

import React from 'react';
import PropTypes from 'prop-types';
import {Line} from 'react-chartjs';

//Custom imports..
import './LineGraph.css';
import ChartImage from './images/AreaChart.png';


/*
Project Card Components.. 
 */
const LineGraph = function(){
    
    const chartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(225,193,98, 0.2)",
                strokeColor: "rgba(225,193,98,1)",
                pointColor: "rgba(225,193,98, 1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(225,193,98, 1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(225,23,68,0.2)",
                strokeColor: "rgba(225,23,68,1)",
                pointColor: "rgba(225,23,68,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(225,23,68,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };


    return (
        <div>
            <div className="dark-text graph-line-title">
                Project Bug Tracking
            </div>
            <div className="graph-line-container">
                <Line width="393" height="100" data={chartData}/>
                {/* <img width="100%" height="auto" src={ChartImage} alt="line graph" ></img> */}
            </div>
        </div>
    );
};


LineGraph.propTypes = {
    //Project data fetched using GraphQL
    
}

export default LineGraph;
