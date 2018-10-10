/**
 * Created By Robins Gupta
 * 25th July 2018
 */
import React, { Component } from 'react';
import PropTypes            from 'prop-types';


import GanttChartSubHeading from './GanttChartSubHeading';
import GanttTimeline        from './GanttTimeline';
import TaskListHeading      from '../TaskList/TaskListHeading';
import CustomScroller       from '../CustomScrollbar';


let ListRef    = null;
let RowListRef = null;

class GanttChart extends Component {

    constructor(props){
      super(props)
      this.setListReference      = this.setListReference_.bind(this)
      this.onSectionStateChanged = this.onSectionStateChanged.bind(this)
    }

    componentDidMount(){

    }

    onSectionStateChanged(sectionId, index, isCollapsed){
      const {onToggleBtnClick} = this.props;
      onToggleBtnClick(!isCollapsed);
    }


    handleScroll({ target }) {
      const { scrollTop, scrollLeft, isGanttCollapsed } = target;
      if(!isGanttCollapsed){
        //Scroll Gantt Sidebar
        if (ListRef) {
          const { Grid: grid } = ListRef;
          grid.handleScrollEvent({ scrollTop, scrollLeft });
        }
        //Scroll Gantt Canvas..
        if (RowListRef) {
          const { Grid: grid } = RowListRef;
          grid.handleScrollEvent({ scrollTop, scrollLeft });
        }
      }
    }

    setRowListRef(ref){
      RowListRef = ref;
    }

    setListReference_(ref){
      ListRef = ref
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
            onResize,
            onMove,
            setScrollRef,
        } = this.props;
        if(items && items.length){
          return (
            <CustomScroller setScrollRef={setScrollRef} onScroll={this.handleScroll} id="gantt-chart-custom-scrollbar">
              <TaskListHeading projectId={projectId} protectedName="active_tasks" sectionId={sectionId} onSectionStateChanged={this.onSectionStateChanged} iconClassName="gantt-chart-top-heading-arrow" className="gantt-chart-top-header-container" headingClassName="gantt-chart-top-heading-title" heading="Project Plan" isOpened={true} type="fixed" subHeadingComponent={<GanttChartSubHeading />} ></TaskListHeading>
              { !isGanttCollapsed &&
                <GanttTimeline onMove={onMove} onResize={onResize} projectId={projectId} setRowListRef={this.setRowListRef} items={items} setListReference={this.setListReference}  onTaskResized={onTaskResized} onItemMoved={onItemMoved}></GanttTimeline>
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





GanttChart.propTypes = {
    items: PropTypes.array,
    onTaskResized: PropTypes.func.isRequired,
    onItemMoved: PropTypes.func.isRequired,
    onToggleBtnClick: PropTypes.func,
    sectionId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    onResize: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
};


export default GanttChart;
