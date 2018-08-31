/**
 * Created by Robins
 * 2nd Aug 2018 
 */
import moment from 'moment';


 class TaskHelper {
    constructor(task, isCompletedColorCode, isActiveTaskSection){
        this.task                   = task;
        this.isCompletedColorCode   = isCompletedColorCode;
        this.isActiveTaskSection    = isActiveTaskSection;
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

    isSelectedTaskDelayed(selectedTask){
        let isDelayed = false;
        if(selectedTask && selectedTask.endDate){
            const startOfDay = moment.utc().startOf('day').valueOf();
            const dueDate = moment.utc(selectedTask.endDate).valueOf();
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
    getLabels(findLabelById){
        const labelList = [];
        let tooltip = "";
        if(this.task && this.task.labels && this.task.labels.length){
            this.task.labels.forEach((labelId, index) => {
                let isLast = false;
                if(index + 1 === this.task.labels.length){
                    isLast = true;
                }
                const label = findLabelById(labelId);
                if(label && label.id){
                    labelList.push(label);
                    if(index >0){
                        tooltip = `${tooltip} ${label.title}`
                    }
                    if(!isLast && index >0){
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


    getSelectedTaskLabels(selectedTask, findLabelById){
        const labelList = [];
        let tooltip = "";
        if(selectedTask && selectedTask.labels && selectedTask.labels.length){
            selectedTask.labels.forEach((labelId, index) => {
                let isLast = false;
                if(index + 1 === selectedTask.labels.length){
                    isLast = true;
                }
                const label = findLabelById(labelId);
                if(label){
                    labelList.push(label);
                    if(index >0){
                        tooltip = `${tooltip} ${label.title}`
                    }
                    if(!isLast && index >0){
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
               // console.log("Task End date", this.task);
                type = "today";
                date = "today"
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
        return getDueDateObj(date, type, this.task, this.isCompletedColorCode, this.isActiveTaskSection);
    }

    getSelectedTaskFormattedDate(selectedTask){
        let type, date;
        if(selectedTask && selectedTask.endDate){
           
            const dueDate = selectedTask.endDate;
            if (moment().format("DD MMMM YYYY") === moment(dueDate).format("DD MMMM YYYY")) {
               // console.log("Task End date", selectedTask);
                type = "today";
                date = "today"
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
                type = this.isSelectedTaskDelayed(selectedTask)? "delayed":"coming";
            }
        }
        return getDueDateObj(date, type, selectedTask, this.isCompletedColorCode, this.isActiveTaskSection);
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

    getSelectedIcon(selectedTask, findMemberById){
        const iconObj = {};
        //assignedTo
        if( selectedTask && selectedTask.assignedTo && findMemberById){
            if(selectedTask.assignedTo.length > 1){
                iconObj.icon = "users";
                let tooltip = "";
                selectedTask.assignedTo.forEach((assignedId, index)=>{
                    let isLast = false;
                    if(index+1 === selectedTask.assignedTo.length){
                        isLast = true;
                    }
                    const member = findMemberById(assignedId);
                    console.log("assigned to member", member)
                    if(member && member.firstName){
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
                const assignedId = selectedTask.assignedTo[0];
                const member = findMemberById(assignedId);
                //console.log("Members", selectedTask.assignedTo, assignedId, member);
                if(member && member.firstName){
                    iconObj.title = member.firstName;
                    iconObj.tooltip = `${member.firstName}`;
                    if(member.lastName){
                        iconObj.tooltip = `${iconObj.tooltip} ${member.lastName}`;
                    }   
                }else{
                    iconObj.icon = "user";
                    iconObj.tooltip="Assign this task";
                }
                //FIXME: 2nd Aug change property name according to url..
                if(member && member.url){
                    iconObj.thumbnailUrl = member.url;
                }
            }
        }else{
            iconObj.icon = "user";
            iconObj.tooltip = "Assign this task";
        }   
        return iconObj;
    }

    getTargetTaskIcon(taskMemberList, findMemberById){
        const iconObj = {};
        if(taskMemberList && findMemberById){
            if(taskMemberList.length > 1){
                //Multiple Member Present..
                iconObj.icon = "users";
                let tooltip = "";
                taskMemberList.forEach((assignedId, index)=>{
                    const member = findMemberById(assignedId);
                    console.log("assigned to member", member)
                    if(member && member.firstName){
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

            } else if(taskMemberList.length === 1){
                const memberId = taskMemberList[0];
                const member = findMemberById(memberId);
                if(member && member.firstName){
                    iconObj.title = member.firstName;
                    iconObj.tooltip = `${member.firstName}`;
                    if(member.lastName){
                        iconObj.tooltip = `${iconObj.tooltip} ${member.lastName}`;
                    }   
                }else{
                    iconObj.icon = "user";
                    iconObj.tooltip="Assign this task";
                }
            } else{
                iconObj.icon = "user";
                iconObj.tooltip="Assign this task";
            }
        } else{
            iconObj.icon = "user";
            iconObj.tooltip="Assign this task";
        }
        return iconObj;
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
    getIcon(findMemberById){
        const iconObj = {};
        //assignedTo
        if( this.task && this.task.assignedTo && findMemberById){
            if(this.task.assignedTo.length > 1){
                iconObj.icon = "users";
                let tooltip = "";
                this.task.assignedTo.forEach((assignedId, index)=>{
                    let isLast = false;
                    if(index+1 === this.task.assignedTo.length){
                        isLast = true;
                    }
                    const member = findMemberById(assignedId);
                    console.log("assigned to member", member)
                    if(member && member.firstName){
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
                const member = findMemberById(assignedId);
                //console.log("Members", this.task.assignedTo, assignedId, member);
                if(member && member.firstName){
                    iconObj.title = member.firstName;
                    iconObj.tooltip = `${member.firstName}`;
                    if(member.lastName){
                        iconObj.tooltip = `${iconObj.tooltip} ${member.lastName}`;
                    }   
                }else{
                    iconObj.icon = "user";
                    iconObj.tooltip="Assign this task";
                }
                //FIXME: 2nd Aug change property name according to url..
                if(member && member.url){
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

    getMemberName(memberObj, memberId){
        let memberName;
        if(memberObj && memberId){
            memberName = memberObj[memberId].firstName;
            let lastName = memberObj[memberId].lastName;
            memberName = `${memberName} ${lastName}`
        }
        return memberName;

    }
    
 }


 const dueDateColorCode = {
     default: "#9e9e9e",
     today: "#1ed0c1",
     yesterday: "#ff1744",
     tomorrow: "#1ed0c1",
     coming: "#9e9e9e",
     delayed: "#ff1744"
}


 const getDueDateObj = (date, type, task, isCompletedColorCode, isActiveTaskSection) => {
    let colorCode; 
    //console.log("Get Due date Obj", task);
    if( task && task.isCompleted){
        colorCode = isCompletedColorCode;
    }else{
        colorCode = dueDateColorCode[type];
    }
    
    if(!isActiveTaskSection){
        colorCode = dueDateColorCode.default;
    }
    return {
        date,
        colorCode,
    }
 }





 export default TaskHelper