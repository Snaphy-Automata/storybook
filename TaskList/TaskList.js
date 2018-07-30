import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import map from 'lodash/map';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


import './TaskList.css';

import TaskListHeading from './TaskListHeading';
import TaskItem       from './TaskItem'
import {getList}      from '../TaskSections/TaskSections'

import {populateSectionTaskList} from './TaskListActions';

const TaskList = (props) => {


    const taskHeadingConfig = props.taskListReducer[props.sectionId];
    const isSectionOpened = taskHeadingConfig && taskHeadingConfig.isOpened ? true : false;
  

    return (
        <div>
            <TaskListHeading heading={props.heading} onArchiveClicked={props.onArchiveClicked} onNewTaskClicked={props.onNewTaskClicked} type={props.type} sectionId={props.sectionId} provided = {props.provided}></TaskListHeading>
            {isSectionOpened && props.items && props.items.length &&
                <Droppable droppableId={props.sectionId}>
                    {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}>
                        {
                            map(props.items, function(item, index){
                                return (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}>
                                                <TaskItem key={index} title={item.title} icon={item.icon} status={item.status} subTask={item.subTask} attachment={item.attachment} dueDate={item.dueDate} provided = {provided} ></TaskItem>
                                            
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
      const taskListReducer = store.TaskListReducer
    return {
        sectionList : store.TaskListReducer.sectionList,
        taskListReducer
    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
  //map action 
  populateSectionTaskList,
  getList
};




export default connect(mapStateToProps, mapActionsToProps)(TaskList);