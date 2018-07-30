/**
 * Created by Robins Gupta
 * 24th July 2018
 */
import moment from 'moment'
import uniqueId from 'lodash/uniqueId';



const STATUS = ["completed", "in_progress", "pending"];

const STATUS_OBJ = {
    completed: "completed",
    in_progress: "in_progress",
    pending: "pending",
    unassigned: "unassigned",
    delayed: "delayed",
}


/**
 * WIll find the position for an group item.
 * Which needs to be selected.
 * https://github.com/namespace-ee/react-calendar-timeline/issues/177#issuecomment-344236188
 * @param {*} obj 
 */
export function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}


/**
 * Will enhance taskObj data.
 * @param {*} taskObj 
 */
export const enhanceTask = (task) => {
    const startDate = task.startDate;
    const endDate   = task.endDate;
    const status    = task.status; 
    let className = (moment(startDate).day() === 6 || moment(startDate).day() === 0) ? 'item-weekend gantt-chart-group-item' : 'gantt-chart-group-item';
    const statusClass = getStatusClass(task);
    task.className = `${className} ${statusClass}`;
    if(task.isCompletedType){
        task.className = `${className} gantt-chart-group-item-completed-type`;
    }else{
        task.className = `${className} gantt-chart-group-item-type`;
    }

    task.itemProps =  {
        'data-tip': task.title,
        id: `item-${task.id}` 
    }
    return task;
};
  


/**
 * Will convert a task to task list format
 */
 export const convertTask = (taskList, assigneeList) => {
     const newTaskList = [], groups=[];
    taskList = taskList || [];
    for(let i=0; i< taskList.length; i++){
        let task = getDates(taskList[i]);
        let newData = {...task};
        newData.id = uniqueId(`${newData.id}_`);
        newData.isCompletedType  = true;
        newData.endDate = moment().endOf('day');
        const group = {...task};
        groups.push(task);
        task.groupId = group.id;
        newData.groupId = group.id;
        task = enhanceTask(task);
        newData = enhanceTask(newData);
        newTaskList.push(task);
        newTaskList.push(newData);
    }
    return {items: newTaskList, groups: groups};
};




/**
 * Return the status class for the object..
 * @param {*} taskObj 
 */
 export const getStatusClass = (taskObj) => {
    taskObj.isDelayed = false;
    if(taskObj.isCompleted){
        return STATUS_OBJ.completed;
    }else if(taskObj.isUnassigned){
        return STATUS_OBJ.unassigned;
    }else{
        const todayDate = moment().endOf('day').valueOf();
        //Check for delayed...
        if(taskObj.endDate < todayDate ){
            taskObj.isDelayed = true;
            return STATUS_OBJ.delayed;
        }else if( taskObj.status ===  STATUS_OBJ.pending){
            return STATUS_OBJ.pending;
        }else{
            return STATUS_OBJ.in_progress;
        }
    }
 }




 /**
  * Will add start and end date.. to the task..
  **/
 const getDates = (taskObj) => {
    const task =  { ...taskObj };
    let isUnassigned = false;
    if(task.startDate && task.endDate){
        //Both present..
        task.startDate = moment(task.startDate).startOf('day').valueOf();
        task.endDate   = moment(task.endDate).endOf('day').valueOf();
    }else if(!task.startDate && task.endDate){
        //Has end date but not start date...
        task.endDate   = moment(task.endDate).endOf('day').valueOf();
        //Start date will be start of day of end date..
        task.startDate = moment(task.endDate).startOf('day').valueOf();
    }else if(task.startDate && !task.endDate){
        //Has start date but not end date..
        task.startDate = moment(task.startDate).startOf('day').valueOf();
        //End date will be end of start date..
        task.endDate   = moment(task.startDate).endOf('day').valueOf();
    }else{
        isUnassigned = true;
        //No start date and no end date..
        //Has start date but not end date..
        task.startDate = moment().startOf('day').valueOf();
        //End date will be end of start date..
        task.endDate   = moment().endOf('day').valueOf();
    }

    task.isUnassigned = isUnassigned;

    return task;
 }