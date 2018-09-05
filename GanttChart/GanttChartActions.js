/**
 * Created by Robins
 * 11th July 2018
 */
//Exports Constants..
export const ON_GANTT_ITEM_RESIZE                = "ON_ITEM_RESIZE";
export const ON_GANTT_ITEM_MOVED                 = "ON_ITEM_MOVED";
export const ON_HORIZONTAL_SCROLL                = "ON_HORIZONTAL_SCROLL";
export const ON_ITEM_MOUSE_ENTER_ACTION          = "ON_ITEM_ENTER_ACTION";
export const ON_ITEM_MOUSE_LEAVE_ACTION          = "ON_ITEM_LEAVE_ACTION";
export const ON_ITEM_SELECTED                    = "ON_ITEM_SELECTED_ACTION";
export const ON_TASK_LOAD_ACTION                 = "ON_TASK_LOAD_ACTION";
export const INITIALIZE_GANTT_WITH_DATA          = "INITIALIZE_GANTT_WITH_DATA";
export const ON_GANTT_NEW_TASK_ADDED             = "ON_GANTT_NEW_TASK_ADDED";
export const ON_GANTT_CHART_TASK_FOCUSED         = "ON_GANTT_CHART_TASK_FOCUSED";
export const ON_GANTT_CHART_TASK_UPDATED         = "ON_GANTT_CHART_TASK_UPDATED";
export const ON_TASK_FOCUSED                     = "ON_TASK_FOCUSED";

import {convertTask} from "./convertTask";

//Will trigger when canvas is horizontally scrolled for date change
//Also change the group item
export function onHorizontalScrollAction(visibleTimeStart, visibleTimeEnd, updateScrollCanvas){
  //https://github.com/namespace-ee/react-calendar-timeline#ontimechangevisibletimestart-visibletimeend-updatescrollcanvas
  return (dispatch) => {
    dispatch({
      type: ON_HORIZONTAL_SCROLL,
      payload: {
        visibleTimeStart,
        visibleTimeEnd,
        updateScrollCanvas,
      }
    })
  };
}


//Action for Updating the filter data..
export function onItemResizeAction(itemId, time, edge) {
  return (dispatch) => {
    dispatch({
      type: ON_GANTT_ITEM_RESIZE,
      payload: {
        itemId,
        time,
        edge
      }
    });
  };
}


export function onItemMoveAction(itemId, dragTime, newGroupOrder){
  return (dispatch)=>{
    dispatch({
      type: ON_GANTT_ITEM_MOVED,
      payload: {
        itemId,
        dragTime,
        newGroupOrder
      }
    });
  }
}


export function onItemMouseEnterAction(itemId){
  return (dispatch) => {
    dispatch({
      type: ON_ITEM_MOUSE_ENTER_ACTION,
      payload:{
        itemId,
      }
    });
  }
}


export function onItemMouseLeaveAction(itemId){
  return (dispatch) => {
    dispatch({
      type: ON_ITEM_MOUSE_LEAVE_ACTION,
      payload:{
        itemId,
      }
    });
  }
}


export function onItemSelectAction(itemId){
  return (dispatch) => {
    dispatch({
      type: ON_ITEM_SELECTED,
      payload: {
        itemId,
      }
    });
  }
}


/**
 * WIll initialize task with new list..
 * Needs to be supplied from outside when a complete list changes..
 * @param {*} taskList
 */
export function onTaskInitAction(taskList){
  return (dispatch) => {
    const {groups, items} = convertTask(taskList);
    setTimeout(()=>{
      dispatch({
        type: INITIALIZE_GANTT_WITH_DATA,
        payload:{
          groups,
          items,
        }
      });
    });
  }
}



/**
 * On New Task Added.
 * Will get called when a new task will get added.
 * This method needs to be called from outside the ganttchart.
 */
export function onNewTaskAdded(task, oldPosition, newPosition, highlight = true){
  return (dispatch) => {
    dispatch({
      type: ON_GANTT_NEW_TASK_ADDED,
      payload:{
        task,
        oldPosition,
        newPosition,
        highlight,
      }
    });
  }
}


/**
 * Will get called when a new task is focused.
 * Will scroll to the group and will horizontal scroll  task timeline
 * @param {*} taskId
 */
export function onTaskFocused(taskId){
  return (dispatch) => {
    dispatch({
      type: ON_GANTT_CHART_TASK_FOCUSED,
      payload:{
        taskId,
      }
    });
  }
}



/**
 * Will get called when a new task get updated.
 */
export function onTaskUpdated(task, highlight = true){
  return (dispatch)=>{
    dispatch({
      type: ON_GANTT_CHART_TASK_UPDATED,
      payload:{
        task,
      }
    });
  }
}


export function onTaskFocusAction(taskId){
  return (dispatch) => {
    dispatch({
      type: ON_TASK_FOCUSED,
      payload:{
        taskId,
        window,
      }
    })
  }
}
