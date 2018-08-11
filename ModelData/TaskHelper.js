/**
 * Created by Robins
 * 11th Aug 2018.
 */



/**
 * Will normalize task list data in id format..
 */
export const nomalizeTaskData = (taskList) => {
    const taskObj = {};
    const taskIds = [];
    let allTaskSectionId, activeTaskSectionId;
    if (taskList && taskList.length) {
        taskList.forEach(task => {
            taskObj[task.id] = task;
            taskIds.push(task.id);
            if(task.isProtected && task.type === "all_tasks"){
                allTaskSectionId = task.id;
            }

            if(task.isProtected && task.type === "active_tasks"){
                activeTaskSectionId = task.id;
            }

        });
    }
    return {
        taskObj,
        taskIds,
        allTaskSectionId,
        activeTaskSectionId,
    }
}