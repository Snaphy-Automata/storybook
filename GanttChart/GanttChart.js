/**
 * Created By Robins Gupta
 * 25th July 2018
 */
import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PropTypes            from 'prop-types';

//Custom Import
import {
  onTaskInitAction,
}                           from "./GanttChartActions";
import GanttChartSubHeading from './GanttChartSubHeading';
import GanttTimeline        from './GanttTimeline';
import TaskListHeading      from '../TaskList/TaskListHeading';
import CustomScroller       from '../CustomScrollbar';

/**
 * Get element
 */
const getElement = (id) => {
  return ()=>{
    const elem = document.getElementById(id);
    console.log(elem.firstChild);
    //First child is responsible for scrolling...
    return elem.firstChild;

  }
}

class GanttChart extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {
            tasks,
            onTaskInitAction,
        } = this.props;
        onTaskInitAction(tasks);
    }

    render(){
        const {
            isTaskLoaded,
            onTaskResized,
            onItemMoved,
        } = this.props;
        if(isTaskLoaded){
          return (
            <CustomScroller id="gantt-chart-custom-scrollbar">
                <TaskListHeading iconClassName="gantt-chart-top-heading-arrow" className="gantt-chart-top-header-container" headingClassName="gantt-chart-top-heading-title" heading="Project Plan" isOpened={true} type="fixed" subHeadingComponent={<GanttChartSubHeading />} ></TaskListHeading>
                <GanttTimeline scrollRef={getElement("gantt-chart-custom-scrollbar")} onTaskResized={onTaskResized} onItemMoved={onItemMoved}></GanttTimeline>
            </CustomScroller>
          )
        }else{
          //Load loading component..
          return (
              <div>Loading Gantt Chart</div>
          )
        }
    }
}




// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        isTaskLoaded: store.GanttChartReducer.isTaskLoaded,
    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    onTaskInitAction,
};



GanttChart.propTypes = {
    tasks: PropTypes.array.isRequired,
    onTaskResized: PropTypes.func.isRequired,
    onItemMoved: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapActionsToProps)(GanttChart);
