import React, { Component } from 'react'
import moment from 'moment'
import {connect} from 'react-redux';
import Timeline from 'react-calendar-timeline/lib'
import 'react-calendar-timeline/lib/Timeline.css'
import PropTypes from 'prop-types';


//Custom Import
import {
  onItemResizeAction,
  onItemMoveAction,
  onHorizontalScrollAction,
  onItemSelectAction,
  onTaskFocusAction,
} from "./GanttChartActions";
import GroupRenderer from "./GroupRenderer";
import ItemRenderer from "./ItemRenderer";

//Custom style
import "./GanttChart.css";


var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  //itemTitleKey: 'title',
  //itemDivTitleKey: 'title',
  itemGroupKey: 'groupId',
  itemTimeStartKey: 'startDate',
  itemTimeEndKey: 'endDate'
}

const defaultHeaderLabelFormats = {
    yearShort: 'YY',
    yearLong: 'YYYY',
    monthShort: 'MM/YY',
    monthMedium: 'MM/YYYY',
    monthMediumLong: 'MMM YYYY',
    monthLong: 'MMMM YYYY',
    dayShort: 'L',
    dayLong: 'dddd, LL',
    hourShort: 'HH',
    hourMedium: 'HH:00',
    hourMediumLong: 'L, HH:00',
    hourLong: 'dddd, LL, HH:00',
    time: 'LLL'
  }

const defaultTimeStart = moment()
  .startOf('day')
  .toDate()
const defaultTimeEnd = moment()
  .endOf('day')
  .add(12, 'day')
  .toDate()

const state = {
  defaultTimeStart,
  defaultTimeEnd
}

const GanttChart = (props) => {
  const { defaultTimeStart, defaultTimeEnd } = state
  const {
    groups,
    items,
    onItemResizeAction,
    onItemMoveAction,
    onHorizontalScrollAction,
    sidebarHeadingTitle,
    selectedItemId,
    onItemSelectAction,
    onTaskFocusAction,
    //Method called from outside from gantt-chart
    onItemMoved,
    onTaskResized,
    scrollRef,
  } = props;

  /**
   * On Task Resize Task is saved and moved to new position..
   */
  const onItemResize = (itemId, time, edge) => {
    onItemResizeAction(itemId, time, edge);
    onTaskResized? onTaskResized(itemId, time, edge): null;
  }

  /**
   * Will get called when a item is moved inside gantt.
   * @param {*} itemId
   * @param {*} dragTime
   * @param {*} newGroupOrder
   */
  const onItemMoveFunc = (itemId, dragTime, newGroupOrder) => {
    onItemMoveAction(itemId, dragTime, newGroupOrder);
    onItemMoved? onItemMoved(itemId, dragTime, newGroupOrder): null;
  }

  setTimeout(()=>{
    const task = groups[groups.length -1];
    //console.log("Focusing Task");
    onTaskFocusAction(task.id);
  }, 5000);


  return (

          <Timeline
          groups={groups}
          items={items}
          keys={keys}
          itemsSorted
          itemTouchSendsClick={false}
          stackItems={false}
          showCursorLine
          canMove={true}
          canMoveGroup={false}
          canResize={"both"}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          lineHeight={25}
          selected={selectedItemId}
          sidebarWidth={170}
          sidebarContent={<div>{sidebarHeadingTitle}</div>}
          dragSnap={60*60*1000*24} //dragging unit set to be 24 hours 1 day
          headerLabelGroupHeight={0} //remvoe top header
          headerLabelHeight={23}
          itemHeightRatio={1}
          minZoom={60*60*1000*24} //Smallest time that can be zoomed. 1 day
          maxZoom={365.24 * 86400 * 1000} //longest time that can be zoomed 1 year.
          timeSteps={{
            day: 1,
            month: 1,
            year: 1
          }}
          canChangeGroup={false} //items cannot be moved outside a group.
          itemRenderer={ItemRenderer}
          useResizeHandle={true}
          onItemResize={onItemResize}
          onItemMove={onItemMoveFunc}
          groupRenderer={GroupRenderer}
          onTimeChange={onHorizontalScrollAction}
          onItemSelect={onItemSelectAction}
          showCursorLine={false}
          // horizontalLineClassNamesForGroup={(group) => {
          //   console.log(group);
          //   return group.root ? ["row-root"] : []
          // }}
        />
  )
};



// Retrieve data from store as props
function mapStateToProps(store, props) {

  return {
    sidebarHeadingTitle: store.GanttChartReducer.sidebarHeadingTitle,
    selectedItemId: store.GanttChartReducer.selectedItemId,
    items: store.GanttChartReducer.data.items,
    groups: store.GanttChartReducer.data.groups,

  };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
  //map action here
  onItemResizeAction,
  onItemMoveAction,
  onHorizontalScrollAction,
  onItemSelectAction,
  onTaskFocusAction,
};



GanttChart.propTypes = {
  onTaskResized: PropTypes.func.isRequired,
  onItemMoved: PropTypes.func.isRequired,
};



export default connect(mapStateToProps, mapActionsToProps)(GanttChart);
