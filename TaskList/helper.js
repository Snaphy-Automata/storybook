/**
 * Created by Robins
 * 2nd Aug 2018 
 */
import moment from 'moment';





 class TaskHelper {
    constructor(task){
        this.task = task;
    }

    /**
     * Will check if delayed or not
     */
    isDelayed(){
        let isDelayed = false;
        if(this.task && this.task.endDate){
            const startOfDay = moment.utc().startOf('day').valueOf();
            const dueDate = moment.utc(this.task.endDate).valueOf();
            if( dueDate < startOfDay ){
                isDelayed = true;
            }
        }
        return isDelayed;
    }

    getStatus(statusObj){
        let statusData;
        if(this.task){
            statusData = this.task.statusId && statusObj[this.task.statusId]? statusObj[this.task.statusId]: undefined;
        }
        return statusData; 
    }

    /**
     * Will return labels with tooltip if more than one label
     * @param {*} labelObj 
     * {
     *  label: {},
     *  tooltip: ""
     * }
     */
    getLabels(labelObj){
        const labelList = [];
        let tooltip = "";
        if(this.task && this.task.labels && this.task.labels.length){
            this.task.labels.forEach((labelId, index) => {
                let isLast = false;
                if(index + 1 === this.task.labels.length){
                    isLast = true;
                }
                const label = labelObj[labelId];
                if(label){
                    labelList.push(label);
                    if(index >0){
                        tooltip = `${tooltip} ${label.title}`
                    }
                    if(!isLast && index >1){
                        tooltip = `${tooltip}, `
                    }
                }  
            });
        }
        return {
            labelList : labelList,
            tooltip : tooltip
        }
       

    }

    /**
     * Will return date with color code..
     * {
     *  date: DATE,
     *  colorCode: HEX STRING
     * }
     */
    getFormattedDueDate(){
        let type, date;
        if(this.task && this.task.endDate){
            const dueDate = this.task.endDate;
            if (moment().format("DD MMMM YYYY") === moment(dueDate).format("DD MMMM YYYY")) {
                type = "today";
                date: "today"
            } else if (moment().subtract(1, 'days').format("DD MMMM YYYY") === moment(dueDate).format("DD MMMM YYYY")) {
                type = "yesterday"
                date = "yesterday";
            } else if (moment().add(1, 'days').format("DD MMMM YYYY") === moment(dueDate).format("DD MMMM YYYY")) {
                type = "tommorow"
                date = "tomorrow";
            } else {
                let dueDateArray;
                if(moment.utc().year() === moment.utc(dueDate).year()){
                    dueDateArray = moment.utc(dueDate).format("DD MMM");
                }else{
                    dueDateArray = moment.utc(dueDate).format("DD MMM, YYYY");
                }
                   
                date = dueDateArray;
                type = this.isDelayed()? "delayed":"coming";
            }
        }
        return getDueDateObj(date, type);
    }


    getSubtaskStats(){
        if(this.task && this.task.stats && this.task.stats.subtask){
            return this.task.stats.subtask;
        }
    }


    getAttachmentStats(){
        if(this.task && this.task.stats && this.task.stats.attachment){
            return this.task.stats.attachment;
        }
    }


    getCommentsStats(){
        if(this.task && this.task.stats && this.task.stats.comment){
            return this.task.stats.comment;
        }
    }


    getTitle(){
        let titleData;
        if(this.task){
            titleData = this.task.title;
        }
        return titleData;
    }

    /**
     * Will return icon obj.
     * {
     *      icon: "user",
     *      tooltip: "Robins, Nikita",
     *      title: "Robins",
     *      thumnailUrl: "/robins_profile.png"
     * }
     * @param {*} membersObj 
     */
    getIcon(membersObj){
        const iconObj = {};
        //assignedTo
        if( this.task && this.task.assignedTo && membersObj && this.task.assignedTo.length ){
            if(this.task.assignedTo.length > 1){
                iconObj.icon = "users";
                let tooltip = "";
                this.task.assignedTo.forEach((assignedId, index)=>{
                    let isLast = false;
                    if(index+1 === this.task.assignedTo.length){
                        isLast = true;
                    }
                    const member = membersObj[assignedId];
                    if(member.firstName){
                        if(index === 0){
                            tooltip = `${member.firstName}`;
                        }else{
                            tooltip = `${tooltip}, ${member.firstName}`;
                        }
                        
                        if(member.lastName){
                            tooltip = `${tooltip} ${member.lastName}`;
                        }   

                    }
                });
                iconObj.tooltip = tooltip;
            }else{
                const assignedId = this.task.assignedTo[0];
                const member = membersObj[assignedId];
                if(member.firstName){
                    iconObj.title = member.firstName;
                    iconObj.tooltip = `${member.firstName}`;
                    if(member.lastName){
                        iconObj.tooltip = `${iconObj.tooltip} ${member.lastName}`;
                    }   
                }else{
                    iconObj.icon = "user";
                }
                //FIXME: 2nd Aug change property name according to url..
                if(member.url){
                    iconObj.thumbnailUrl = member.url;
                }
            }
        }else{
            iconObj.icon = "user";
            iconObj.tooltip = "Assign this task";
        }   
        return iconObj;
    }


    getDurationInText(){
        let durationInTextData;
        if(this.task){
            durationInTextData = this.task.durationInText;
        }
        return durationInTextData;
    }
    
 }


 const dueDateColorCode = {
     today: "#1ed0c1",
     yesterday: "#ff1744",
     tomorrow: "#1ed0c1",
     coming: "#9e9e9e",
     delayed: "#ff1744"
 }


 const getDueDateObj = (date, type) => {
    const colorCode = dueDateColorCode[type];
    return {
        date,
        colorCode
    }
 }

 const getSideLineClass = function () {
    let className = `task-list-item-side-line`
    if (id && taskItem) {
        if (taskItem.id === id) {
            className = `task-list-item-side-line-edit`
        }
    }
    return className;
}

const getIconClass = function () {
    let className = `task-list-item-icon`
    if (id && taskItem) {
        if (taskItem.id === id) {
            className = `task-list-item-icon-edit`
        }
    } else if (isNew) {
        className = `task-list-item-icon-edit`
    }
    return className;
}

const getOtherDataClass = function () {
    let className = `task-list-item-other-container`
    if (id && taskItem) {
        if (taskItem.id === id) {
            className = `task-list-item-other-container-edit`
        }
    }
    return className;
}



 export default TaskHelper