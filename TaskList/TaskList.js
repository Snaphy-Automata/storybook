import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { Droppable, Draggable } from 'react-beautiful-dnd';



import './TaskList.css';

import TaskListHeading from './TaskListHeading';
import TaskItem from './TaskItem'

//Import Actions..
// import {
//     getTaskitemAction,
//     getStatusDataAction,
//     onMarkCompleteClickedAction,
//     taskTitleDataAction,
//     addLabelElementAction,
//     onClearTaskItemPreviousDataAction,
//     addUserElementAction,
//     setDueDateAction,
//     setStartDateAction,
//     populateSectionTaskList
// } from '../AllTaskActions';


const TaskList = (props) => {

    const {
        sectionId,
        sectionList
    } = props;

    const taskHeadingConfig = props.taskListReducer[props.sectionId];
    const isSectionOpened = taskHeadingConfig && taskHeadingConfig.isOpened ? true : false;


    return (
        <div style={{ backgroundColor: "#fff" }}>
            <TaskListHeading heading={props.heading} onArchiveClicked={props.onArchiveClicked} onNewTaskClicked={props.onNewTaskClicked} onStateChanged={props.onStateChanged} defaultText={props.defaultText} type={props.type} items={props.items} sectionId={props.sectionId} provided={props.provided} {...props}></TaskListHeading>
            {!isSectionOpened && props.items && props.items.length &&
                <Droppable droppableId={props.sectionId}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}>
                            {
                                map(props.items, function (item, index) {

                                    const onItemClicked = () => {
                                        if (item && item.title) {
                                            props.getTaskitemAction(item);
                                            props.taskTitleDataAction(item.title);

                                            //Get status of task Item..
                                            props.getStatusDataAction(item.status.title);

                                            //Checking for completed status..
                                            if (item.status.title === "Completed") {
                                                props.onMarkCompleteClickedAction(true);
                                            } else {
                                                props.onMarkCompleteClickedAction(false);
                                            }

                                            //Clear all previous label and user data
                                            props.onClearTaskItemPreviousDataAction();

                                            //Getting all the labels
                                            if (item.labels) {
                                                if (item.labels.length) {
                                                    for (var i = 0; i < item.labels.length; i++) {
                                                        let labelObj = item.labels[i];
                                                        let taskObj = { name: labelObj.name, isSelected: true, color: labelObj.color };
                                                        props.addLabelElementAction(taskObj);

                                                    }
                                                }

                                            }

                                            //Getting all the users..
                                            if (item.icon) {
                                                if (item.icon.title) {
                                                    let userObj = { name: item.icon.title, isSelected: true }
                                                    props.addUserElementAction(userObj);
                                                } else if (item.icon.icon) {
                                                    if (item.icon.userList) {
                                                        if (item.icon.userList.length) {
                                                            for (var i = 0; i < item.icon.userList.length; i++) {
                                                                let userData = item.icon.userList[i];
                                                                let userObj = { name: userData, isSelected: true }
                                                                props.addUserElementAction(userObj);
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            //Get Due Date Data..
                                            if (item.dueDate) {
                                                if (item.dueDate.date) {
                                                    props.setDueDateAction(item.dueDate.date);
                                                }
                                            }

                                            //Get Start Date Data...
                                            if (item.startDate) {
                                                if (item.startDate.date) {
                                                    props.setStartDateAction(item.startDate.date);
                                                }
                                            }
                                        }



                                    }

                                    const onKeyPressAction = function (e) {
                                        if (e.key === 'Enter') {
                                            if (e.target.value) {
                                                console.log("Task Item Target value", e.target.value);
                                                let sectionDataList = sectionList;
                                                for (var i = 0; i < sectionDataList.length; i++) {
                                                    if (sectionDataList[i].sectionId === sectionId) {
                                                        if (sectionDataList[i].items.length) {
                                                            
                                                            let lastTaskItemObj = sectionDataList[i].items[sectionDataList[i].items.length - 1];
                                                            if (lastTaskItemObj.isNew) {
                                                                lastTaskItemObj.isNew = false;
                                                                lastTaskItemObj.title = e.target.value;
                                                                sectionDataList[i].items[sectionDataList[i].items.length - 1] = lastTaskItemObj;

                                                            }
                                                            console.log("Section Item List Length", sectionDataList[i].items);

                                                            let newTaskObj = { icon: 'users', isNew: true, id: `${sectionDataList[i].title}${sectionDataList[i].items.length + 1}` }
                                                            sectionDataList[i].items.push(newTaskObj);
                                                        }

                                                        break;
                                                    }
                                                }

                                                props.populateSectionTaskList(sectionDataList);
                                            }


                                            //inputFocusChagedAction(false, label);
                                            //call autosave function..
                                        }
                                    }

                                    return (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}>
                                                    <TaskItem key={index} id={item.id} title={item.title} icon={item.icon} status={item.status} subTask={item.subTask} attachment={item.attachment} dueDate={item.dueDate} provided={provided} isNew={item.isNew} getTaskItemData={onItemClicked} taskItem={props.taskItemData} taskTitleData={props.taskTitleData} onKeyPress={onKeyPressAction}></TaskItem>

                                                </div>
                                            )}

                                        </Draggable>
                                    )

                                })
                            }
                            {provided.placeholder}

                        </div>
                    )}

                </Droppable>

            }
        </div>
    )

}

// Retrieve data from store as props
function mapStateToProps(store) {
    const taskListReducer = store.AllTaskReducer;
    return {
        // taskItemData: store.AllTaskReducer.taskItemData,
        // statusData: store.AllTaskReducer.statusData,
        // taskTitleData: store.AllTaskReducer.taskTitleData,
        // totalLabelItemList: store.AllTaskReducer.totalLabelItemList,
        // selectedLabelItemList: store.AllTaskReducer.selectedLabelItemList,
        // sectionList: store.AllTaskReducer.sectionList,
         taskListReducer

    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    // getTaskitemAction,
    // getStatusDataAction,
    // taskTitleDataAction,
    // onMarkCompleteClickedAction,
    // addLabelElementAction,
    // addUserElementAction,
    // onClearTaskItemPreviousDataAction,
    // setDueDateAction,
    // setStartDateAction,
};




export default connect(mapStateToProps, mapActionsToProps)(TaskList);

// import React from 'react';
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
// import map from 'lodash/map';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


// import './TaskList.css';

// import TaskListHeading from './TaskListHeading';
// import TaskItem       from './TaskItem'
// import {getList}      from '../TaskSections/TaskSections'

// import {populateSectionTaskList} from './TaskListActions';

// const TaskList = (props) => {


//     const taskHeadingConfig = props.taskListReducer[props.sectionId];
//     const isSectionOpened = taskHeadingConfig && taskHeadingConfig.isOpened ? true : false;
  

//     return (
//         <div>
//             <TaskListHeading heading={props.heading} onArchiveClicked={props.onArchiveClicked} onNewTaskClicked={props.onNewTaskClicked} type={props.type} sectionId={props.sectionId} provided = {props.provided}></TaskListHeading>
//             {isSectionOpened && props.items && props.items.length &&
//                 <Droppable droppableId={props.sectionId}>
//                     {(provided, snapshot) => (
//                         <div
//                         ref={provided.innerRef}>
//                         {
//                             map(props.items, function(item, index){
//                                 return (
//                                     <Draggable key={item.id} draggableId={item.id} index={index}>
//                                         {(provided, snapshot) => (
//                                             <div
//                                             ref={provided.innerRef}
//                                             {...provided.draggableProps}>
//                                                 <TaskItem key={index} title={item.title} icon={item.icon} status={item.status} subTask={item.subTask} attachment={item.attachment} dueDate={item.dueDate} provided = {provided} ></TaskItem>
                                            
//                                             </div>
//                                         )}

//                                     </Draggable>
//                                 )
                                
//                             })
//                         }
//                          {provided.placeholder}

//                         </div>
//                     )}
                    
//                 </Droppable>

//            }
//         </div>
//     )

// }



//   // Retrieve data from store as props
//   function mapStateToProps(store) {
//       const taskListReducer = store.TaskListReducer
//     return {
//         sectionList : store.TaskListReducer.sectionList,
//         taskListReducer
//     };
// }


// //Map Redux Actions to Props..
// const mapActionsToProps = {
//   //map action 
//   populateSectionTaskList,
//   getList
// };




// export default connect(mapStateToProps, mapActionsToProps)(TaskList);