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
      const {
        tasks,
        onTaskInitAction,
      } = this.props;
      onTaskInitAction(tasks);
    }

    componentDidMount(){

    }

    onSectionStateChanged(sectionId, index, isCollapsed){
      console.log("on Section changed.", sectionId, index, isCollapsed);
      const {onToggleBtnClick} = this.props;
      onToggleBtnClick(!isCollapsed);
    }

    render(){
        const {
            isTaskLoaded,
            onTaskResized,
            onItemMoved,
            sectionId,
            isGanttCollapsed,
        } = this.props;
        if(isTaskLoaded){
          return (
            <CustomScroller id="gantt-chart-custom-scrollbar">
                <TaskListHeading protectedName="active_tasks" sectionId={sectionId} onSectionStateChanged={this.onSectionStateChanged.bind(this)} iconClassName="gantt-chart-top-heading-arrow" className="gantt-chart-top-header-container" headingClassName="gantt-chart-top-heading-title" heading="Project Plan" isOpened={true} type="fixed" subHeadingComponent={<GanttChartSubHeading />} ></TaskListHeading>
                { !isGanttCollapsed &&
                  <GanttTimeline  sectionId={sectionId} scrollRef={getElement("gantt-chart-custom-scrollbar")} onTaskResized={onTaskResized} onItemMoved={onItemMoved}></GanttTimeline>
                }
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
    onToggleBtnClick: PropTypes.func,
    sectionId: PropTypes.string.isRequired,
};


export default connect(mapStateToProps, mapActionsToProps)(GanttChart);
