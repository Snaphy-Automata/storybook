import React from 'react';
import map from 'lodash/map';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


//Custom Import..
import TaskHeading from './TaskListHeading';
import TaskItem from './TaskItem';


const TaskListDnd = (props) => {

    console.log("task List DNd", props);

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    return (
        <div style={{ marginLeft: "50px", marginRight: "50px" }}>
            <div>
                {
                    map(props.taskList.section.allIds, function (sectionId, index) {
                        const section = props.taskList.section.byId[sectionId]

                        const onDragEnd = function () {
                            console.log("Drag end getting called");
                        }
                        return (
                            <div key={index} >
                                <TaskHeading id={section.id} heading={section.title} protected={section.isProtected} type="fixed"></TaskHeading>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef}>
                                                {section.tasks.map((task, index) => (

                                                    <Draggable key={task.id} draggableId={task.id} index={index} >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
                                                                <TaskItem task={task} isActiveTaskSection memberObj={props.taskList.user.byId} statusObj={props.taskList.status.byId} labelObj={props.taskList.label.byId}></TaskItem>
                                                            </div>
                                                        )}
                                                    </Draggable>


                                                ))}
                                                {provided.placeholder}

                                            </div>
                                        )

                                        }


                                    </Droppable>

                                </DragDropContext>
                            </div>

                        )
                    })
                }
            </div>

        </div>
    )
}



export default TaskListDnd;