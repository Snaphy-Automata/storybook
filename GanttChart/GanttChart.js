/**
 * Created By Robins Gupta
 * 25th July 2018
 */
import React, { Component } from 'react';
import {connect}            from 'react-redux';
import PropTypes            from 'prop-types';
import { AutoSizer }              from 'react-virtualized';

//Custom Import
// import {
//   onTaskInitAction,
// }                           from "./GanttChartActions";
import GanttChartSubHeading from './GanttChartSubHeading';
import GanttTimeline        from './GanttTimeline';
import TaskListHeading      from '../TaskList/TaskListHeading';
import CustomScroller       from '../CustomScrollbar';


let ListRef    = null;
let RowListRef = null;

class GanttChart extends Component {

    constructor(props){
      super(props);
      // const {
      //   tasks,
      //   onTaskInitAction,
      // } = this.props;
      // onTaskInitAction(tasks);
    }

    componentDidMount(){

    }

    onSectionStateChanged(sectionId, index, isCollapsed){
      console.log("on Section changed.", sectionId, index, isCollapsed);
      const {onToggleBtnClick} = this.props;
      onToggleBtnClick(!isCollapsed);
    }


    handleScroll({ target }) {
      const { scrollTop, scrollLeft } = target;
      if (ListRef) {
        const { Grid: grid } = ListRef;
        grid.handleScrollEvent({ scrollTop, scrollLeft });
      }

      if (RowListRef) {
        const { Grid: grid } = RowListRef;
        grid.handleScrollEvent({ scrollTop, scrollLeft });
      }

    }

    setRowListRef(ref){
      RowListRef = ref;
    }

    setListReference(ref){
      ListRef = ref;
    }


    render(){
        const {
            //isTaskLoaded,
            projectId,
            onTaskResized,
            onItemMoved,
            sectionId,
            items,
            isGanttCollapsed,
        } = this.props;
        if(items && items.length){
          return (
            <CustomScroller onScroll={this.handleScroll} id="gantt-chart-custom-scrollbar">
              {/* <AutoSizer  style={{ width: "inherit", height: "inherit" }}>
                {({ height, width }) => (
                  <div style={{ width: width, height }}> */}
                    <TaskListHeading protectedName="active_tasks" sectionId={sectionId} onSectionStateChanged={this.onSectionStateChanged.bind(this)} iconClassName="gantt-chart-top-heading-arrow" className="gantt-chart-top-header-container" headingClassName="gantt-chart-top-heading-title" heading="Project Plan" isOpened={true} type="fixed" subHeadingComponent={<GanttChartSubHeading />} ></TaskListHeading>
                    { !isGanttCollapsed &&
                      <GanttTimeline projectId={projectId} setRowListRef={this.setRowListRef} items={items} setListReference={this.setListReference}  onTaskResized={onTaskResized} onItemMoved={onItemMoved}></GanttTimeline>
                    }
                  {/* </div>
              )}
              </AutoSizer> */}
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
        //isTaskLoaded: store.GanttChartReducer.isTaskLoaded,
    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    //onTaskInitAction,
};



GanttChart.propTypes = {
    items: PropTypes.array.isRequired,
    onTaskResized: PropTypes.func.isRequired,
    onItemMoved: PropTypes.func.isRequired,
    onToggleBtnClick: PropTypes.func,
    sectionId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
};


export default connect(mapStateToProps, mapActionsToProps)(GanttChart);
