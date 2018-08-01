// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { Icon, Input } from 'semantic-ui-react'

// import './TaskList.css';

// const TaskListHeading = (props) => {

//     const {
//         heading, 
//         onArchiveClicked, 
//         defaultText, 
//         type, 
//         items,
//         taskListReducer,
//         sectionId, 
//         sectionExpandedAction, 
//         provided, 
//         populateSectionTaskList, 
//         sectionList
//     } = props;
//     const taskHeadingConfig = taskListReducer[sectionId];
//     const isSectionOpened = taskHeadingConfig && taskHeadingConfig.isOpened ? true : false;
//     const getIcon = function () {
//         if (!isSectionOpened) {
//             return `angle down`
//         } else {
//             return `angle right`
//         }
//     }

//     const onStateChanged = () => {
//         sectionExpandedAction(sectionId, !isSectionOpened);
//     }

//     const onNewTaskAdded = () => {
           
//             let sectionDataList = sectionList;
//             for(var i=0;i<sectionDataList.length;i++){
//                 if(sectionDataList[i].sectionId === sectionId){
//                     if(sectionDataList[i].items.length){
//                         if(!sectionDataList[i].items[sectionDataList[i].items.length-1].isNew){
//                             let newTaskObj = { icon:'users', isNew: true, id: `${sectionDataList[i].title}${sectionDataList[i].items.length + 1}`}
//                             sectionDataList[i].items.push(newTaskObj);
//                         }
//                     }
                   
//                     break;
//                 }
//             }

//             populateSectionTaskList(sectionDataList);

//     }

//     return (
//         <div>
//             <div className="task-list-heading-container"> 
//                 <div className="task-list-heading-drag-container">
//                     <div className="task-list-heading-drag-icon"  {...provided.dragHandleProps}><Icon name="compress"></Icon></div>
//                 </div>
               
//                 <div className="task-list-heading-icon"> <Icon name={getIcon()} onClick={onStateChanged}></Icon></div>
//                 <div className="task-list-heading-title">
//                     {type === "fixed" && <div>{heading}</div>}
//                     {type === "custom" && <Input transparent placeholder="Write Section Name" defaultValue={heading} />}
//                 </div>
//                 <div className="task-list-heading-archive-container" >
//                     <div>
//                         <Icon style={{ display: "inline" }} name="archive" onClick={onArchiveClicked}></Icon>
//                         <div style={{ display: "inline", marginLeft: "5px" }} onClick={onArchiveClicked}>Archive</div>
//                     </div>

//                 </div>
//                 <div className="task-list-heading-add-new-container" >
//                     <div onClick={onNewTaskAdded}> 
//                         <Icon style={{ display: "inline" }} name="clipboard outline"></Icon>
//                         <div style={{ display: "inline", marginLeft: "5px" }}>Add New Task</div>
//                     </div>

//                 </div>

//             </div>
//             {!isSectionOpened && !items && <div style={{ padding: "10px 15px 10px 15px", fontWeight: 500, color: "#9e9e9e", fontSize: 16 }}>
//                 {defaultText}
//             </div>}
//             {!isSectionOpened && items && items.length === 0 && <div style={{ padding: "10px 15px 10px 15px", fontWeight: 500, color: "#9e9e9e", fontSize: 16 }}>
//                 {defaultText}
//             </div>}

//         </div>

//     )


// }

// // Retrieve data from store as props
// function mapStateToProps(store) {
//     const taskHeadingReducer = store.AllTaskReducer;
//     return {
//         // sectionList : store.AllTaskReducer.sectionList,
//         // taskHeadingReducer
//     };
// }

// //Map Redux Actions to Props..
// const mapActionsToProps = {
//     //map action here
//     // sectionExpandedAction,
//     // populateSectionTaskList
// };

// TaskListHeading.propTypes = {
//     heading: PropTypes.string.isRequired,
//     type : PropTypes.string.isRequired, //custom || fixed
//     sectionId : PropTypes.string.isRequired
// }


// export default connect(mapStateToProps, mapActionsToProps)(TaskListHeading);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react'

import './TaskList.css';
import { sectionExpandedAction } from './TaskListActions';


const TaskListHeading = (props) => {
    const {
        heading, 
        onArchiveClicked, 
        defaultText, 
        type, 
        items,
        taskListReducer,
        sectionId, 
        sectionExpandedAction, 
        provided, 
        populateSectionTaskList, 
        sectionList,
        subHeadingComponent, 
        headingClassName
    } = props;

    const taskHeadingConfig = taskListReducer[sectionId];
    const isSectionOpened = taskHeadingConfig && taskHeadingConfig.isOpened ? true : false;
    const getIcon = function () {
        if (!isSectionOpened) {
            return `angle down`
        } else {
            return `angle right`
        }
    }
    let headingClassName_ = headingClassName || "";
    headingClassName_ = `task-list-heading-container ${headingClassName_}`

    const onStateChanged = () => {
        const isTabOpen = !isSectionOpened;
        //This method will get called from the parent..
       // onTabButtonClick? onTabButtonClick(isTabOpen): null;
        sectionExpandedAction(sectionId, isTabOpen);
    }

    const onNewTaskAdded = () => {
           
        let sectionDataList = sectionList;
        for(var i=0;i<sectionDataList.length;i++){
            if(sectionDataList[i].sectionId === sectionId){
                if(sectionDataList[i].items.length){
                    if(!sectionDataList[i].items[sectionDataList[i].items.length-1].isNew){
                        let newTaskObj = { icon:'users', isNew: true, id: `${sectionDataList[i].title}${sectionDataList[i].items.length + 1}`}
                        sectionDataList[i].items.push(newTaskObj);
                    }
                }
               
                break;
            }
        }

        populateSectionTaskList(sectionDataList);

}

    return (
        <div>
             {/* 
                FIXME: 28th July Robins
                Drag and Drop code commented.
                <div className="task-list-heading-drag-container">
                    <div className="task-list-heading-drag-icon" {...provided.dragHandleProps}><Icon name="compress"></Icon></div>
                </div> */}
               
            <div className={headingClassName_}>
                <div onClick={onStateChanged} className={"task-list-heading-wrapper task-not-selectable"}>
                    <div className="task-list-heading-icon"> <Icon name={getIcon()} ></Icon></div>
                    <div className="task-list-heading-title">
                        {type === "fixed" && <div>{heading}</div>}
                        {type === "custom" && <Input transparent placeholder="Write Section Name" defaultValue="My Bugs"/>}
                    </div>
                </div>
                {
                    !subHeadingComponent && 
                    <div className="task-list-sub-heading-wrapper">
                        <div className="task-list-heading-archive-container on-subheading-hover" >
                            <div>
                                <Icon style={{display:"inline"}} name="archive" onClick={onArchiveClicked}></Icon>
                                <div style={{display: "inline", marginLeft: "5px"}} onClick={onArchiveClicked}>Archive</div>
                            </div>
                            
                        </div>
                        <div className="task-list-heading-add-new-container on-subheading-hover" >
                            <div onClick={onNewTaskAdded}>
                                <Icon style={{display: "inline"}} name="clipboard outline"></Icon>
                                <div style={{display: "inline", marginLeft: "5px"}} >Add New Task</div>
                            </div>    
                        </div>
                    </div>
                }
                {
                    subHeadingComponent && subHeadingComponent
                }
                {
                    !isSectionOpened && !items && !subHeadingComponent &&
                    <div style={{ padding: "10px 15px 10px 15px", fontWeight: 500, color: "#9e9e9e", fontSize: 16 }}>
                        {defaultText}
                    </div>
                }
                {
                    !isSectionOpened && items && items.length === 0 &&  !subHeadingComponent &&
                    <div style={{ padding: "10px 15px 10px 15px", fontWeight: 500, color: "#9e9e9e", fontSize: 16 }}>
                        {defaultText}
                    </div>
                }
            </div>
        </div>
    )


}

// Retrieve data from store as props
function mapStateToProps(store) {
    const taskHeadingReducer = store.TaskListReducer;
    return {
        taskHeadingReducer
    };
}

//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    sectionExpandedAction
};

TaskListHeading.propTypes = {
    heading: PropTypes.string.isRequired,
    type : PropTypes.string.isRequired, //custom || fixed
    sectionId : PropTypes.string.isRequired,
    onTabButtonClick: PropTypes.func, //Func will listen to tab button click.
}


export default connect(mapStateToProps, mapActionsToProps)(TaskListHeading);
