import React from 'react'
import { connect } from 'react-redux';
import map from 'lodash/map';
import TaskList from '../TaskList';

// import DragDropContext from 'react-beautiful-dnd';
// import Droppable from 'react-beautiful-dnd';
// import Draggable from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//Custom Import


const TaskSections = (props) => {

    const {
        sectionList, 
        populateSectionTaskList 
    } = props;

    /**
 * Move item from list to another list
 * @param {*} source 
 * @param {*} destination 
 * @param {*} droppableSource 
 * @param {*} droppableDestination 
 */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };


    // function to reorder the list after draging the item to particular position..
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };


    /**
     * Drag for list
     * @param {*} result 
     */
    const onDragEnd = (result) => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        //Drag and drop within the list
        if (source.droppableId === destination.droppableId) {

            //Drag and drop of sections..
            if(result.type === "ROW"){
                const sectionItems = reorder(
                    sectionList,
                    source.index,
                    destination.index
                )
                populateSectionTaskList(sectionItems);

            } else{
                const items = reorder(
                    getList(source.droppableId, sectionList),
                    source.index,
                    destination.index
                )
    
                let sectionDataList = [...sectionList];

                //TODO: Optimize the logic ..avoid loop
                for (var i = 0; i < sectionDataList.length; i++) {
                    if (sectionDataList[i].sectionId === source.droppableId.toString()) {
                        sectionDataList[i].items = items;
                        break;
                    }
                }
    
                //Call Redux to update the list with new position..
                populateSectionTaskList(sectionDataList);
            }

           
        } else {
            //Drag and drop between two list..
            const result = move(
                getList(source.droppableId, sectionList),
                getList(destination.droppableId, sectionList),
                source,
                destination

            )
            let sectionDataList = [...sectionList];

            //TODO: Optimize the logic ...avoid loop
            for (var i = 0; i < sectionDataList.length; i++) {
                if (sectionDataList[i].sectionId === source.droppableId) {
                    sectionDataList[i].items = result[source.droppableId];
                }
                if (sectionDataList[i].sectionId === destination.droppableId) {
                    sectionDataList[i].items = result[destination.droppableId];
                }
            }
            
             //Call Redux to update both list with new position..
            populateSectionTaskList(sectionDataList)

        }

    }

    return (
        <div style={{ height: 300, background: "#f6f8f9" }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="board" type="ROW">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}>
                            {
                                map(sectionList, function (section, index) {
                                    return (
                                        <Draggable key={section.sectionId} draggableId={section.sectionId} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}>
                                                    <div key={index} style={{ marginBottom: 10, background: "#ffffff" }}>
                                                        <TaskList heading={section.title} items={section.items} type="custom" sectionId={section.sectionId.toString()} provided = {provided} onArchiveClicked={() => { console.log("Archive has been clicked") }} onNewTaskClicked={props.onAddNewTask} {...props}></TaskList>
                                                    </div>

                                                </div>
                                            )}

                                        </Draggable>
                                    )
                                })
                            }

                        </div>
                    )}

                </Droppable>
            </DragDropContext>


        </div>
    )


}


/**
 * Get the list accroding to section Id..
 * @param {*} droppableId 
 * @param {*} sectionList 
 */
export function getList(droppableId, sectionList) {
    let taskList = [];
    if (sectionList) {
        for (var i = 0; i < sectionList.length; i++) {
            if (sectionList[i].sectionId === droppableId) {
                taskList = sectionList[i].items;
                break;
            }
        }
    }
    return taskList;

}



export default TaskSections;