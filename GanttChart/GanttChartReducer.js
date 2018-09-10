/**
 * Created by Robins
 * 11th July 2018
 */

import moment from 'moment'

//Custom Import
import month from './month.json';
import {enhanceTask, findPos} from "./convertTask";
import {
  ON_GANTT_ITEM_MOVED,
  ON_GANTT_ITEM_RESIZE,
  ON_HORIZONTAL_SCROLL,
  ON_ITEM_MOUSE_ENTER_ACTION,
  ON_ITEM_MOUSE_LEAVE_ACTION,
  ON_ITEM_SELECTED,
  INITIALIZE_GANTT_WITH_DATA,
  ON_GANTT_NEW_TASK_ADDED,
  ON_GANTT_CHART_TASK_FOCUSED,
  ON_GANTT_CHART_TASK_UPDATED,
  ON_TASK_FOCUSED,
} from './GanttChartActions';



//Will reuturn current month..
const sidebarTitle = () => {
  const monthInt = moment().month(); //0-11
  const sidebarHeadingTitle = month[monthInt];
  return sidebarHeadingTitle;
}


//Set initial state for gridview reducer..
const initialState = {
  sidebarHeadingTitle: sidebarTitle(),
  selectedItemId: undefined,
  assignedTo:[],
  data: {
    taskList:[],
  },
  isTaskLoaded: false,
};

const GanttChartReducer = (state = initialState, action) => {
  switch (action.type){
    case ON_GANTT_ITEM_MOVED:{
      const {
        itemId,
        dragTime,
        newGroupOrder
      } = action.payload;
      const oldTaskList = state.data.items;
      const newItem = [];
      let {targetItem, index} = fetchTargetItem(oldTaskList, newItem, itemId);
      const oldTimeDiff =  targetItem.endDate - targetItem.startDate;
      targetItem.startDate = dragTime;
      targetItem.endDate = dragTime + oldTimeDiff;
      const task = enhanceTask(targetItem);
      newItem[index] = task;
      state = {
        ...state,
        data: {
          ...state.data,
          items: newItem
        }
      }
      break;
    }
    //ON Task Date Resize
    case ON_GANTT_ITEM_RESIZE:{
      const {itemId, time, edge} = action.payload;
      const oldTaskList = state.data.items;
      const newItem = [];
      let {targetItem, index} = fetchTargetItem(oldTaskList, newItem, itemId);
      //First find the item..
      if(targetItem && index !== -1){
        if(edge === "left"){
          //Start date modified
          targetItem.startDate = time;
        }else{
          targetItem.endDate = time;
        }
        const task = enhanceTask(targetItem);
        newItem[index] = targetItem;
      }
      state = {
        ...state,
        data: {
          ...state.data,
          items: newItem,
        }
      }
      break;
    } //end case..
    case ON_HORIZONTAL_SCROLL:{
      const {
        visibleTimeStart,
        visibleTimeEnd,
        updateScrollCanvas
      } = action.payload;
      const currentYear = moment().year();
      //FInd the value of month from unix miliseconds..
      const monthInt = moment(visibleTimeStart).month(); //0-11
      const visibleYear = moment(visibleTimeStart).year();
      let sidebarHeadingTitle;
      if(visibleYear !== currentYear){
        sidebarHeadingTitle = `${month[monthInt]} ${visibleYear}`;
      }else{
        sidebarHeadingTitle = `${month[monthInt]}`;
      }
      state = {
        ...state,
        sidebarHeadingTitle,
      }
      //Now update Scroll Canvas..
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
      break;
    }
    case ON_ITEM_MOUSE_ENTER_ACTION:{
      //When mouse is entered inside item area.
      //Select the item. To start the scrolling without selecting it first.
      //https://github.com/namespace-ee/react-calendar-timeline/issues/290#issuecomment-391254489
      const {itemId} = action.payload;

      if(!state.selectedItemId || state.selectedItemId[0] !== itemId){
        state = {
          ...state,
          selectedItemId: [itemId],
        }
      }
      break;
    }
    case ON_ITEM_MOUSE_LEAVE_ACTION:{
      //When mouse is leaved inside item area.
      //Select the item. To start the scrolling without selecting it first.
      //https://github.com/namespace-ee/react-calendar-timeline/issues/290#issuecomment-391254489
      const {itemId} = action.payload;
      // state = {
      //   ...state,
      //   //selectedItemId: [],
      // }
      //Do nothing..
      break;
    }
    case ON_ITEM_SELECTED:{
      const {itemId} = action.payload;
      state = {
        ...state,
        selectedItemIds: [itemId],
      }

      break;
    }
    case INITIALIZE_GANTT_WITH_DATA:{
      console.log("Getting Initialized Gantt Chart");
      state = {
        ...state,
        isTaskLoaded: true,
        data:{
          groups: action.payload.groups,
          items: action.payload.items,
          byId: action.payload.byId
        }
      }
      break;
    }
    case ON_GANTT_NEW_TASK_ADDED:{
      //WIll get called when a new task has been added
      //With old position index and new position index.
      /**
        *
        payload:{
          task,
          oldPosition,
          newPosition,
          highlight,
        }
      **/
      //TODO: 28th July 2018
      //Add items to list

      break;
    }
    case ON_GANTT_CHART_TASK_FOCUSED:{
      ///Will get called when a new gantt chart task is focused.
      //Will scroll the group to a specific position and task date will also get in visible calendar area.

      break;
    }
    case ON_GANTT_CHART_TASK_UPDATED:{
      //WIll get called when a task gets updated..


      break;
    }

    case ON_TASK_FOCUSED:{
      //WIll highlight the task going to be edited and will scroll it to the required position..
      //https://github.com/namespace-ee/react-calendar-timeline/issues/177
      const {taskId, window} = action.payload;
      if(window !== undefined){
        //Display it to the bottom of the canvas..
        const canvasHeight = 162;
        //window.scroll(0,findPos(document.getElementById(taskId)) - canvasHeight);
      }

      break;
    }
  }

  return state;
};


/**
 * Will fetch the Target Item from List..
 * @param {*} oldItemList
 * @param {*} newItemArr
 */
const fetchTargetItem = (oldItemList, newItemArr, itemId)=>{
  let targetItem, index = -1;
  for(let i=0; i<oldItemList.length;i++){
    const item = oldItemList[i];
    if(item.id === itemId){
      targetItem = item;
      index = i;
    }
    newItemArr.push(item);
  }

  return {
    targetItem,
    index
  }
};


export default GanttChartReducer;
