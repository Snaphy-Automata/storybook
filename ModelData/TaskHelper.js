/**
 * Created by Robins
 * 11th Aug 2018.
 */



/**
 * Will normalize task list data in id format..
 */
export const nomalizeTaskData = (taskList) => {
    const taskObj = {};
    if (taskList && taskList.length) {
        taskList.forEach(task => {
            taskObj[task.id] = task;
        });
    }
    return taskObj;
}