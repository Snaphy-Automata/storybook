import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { List, WindowScroller } from 'react-virtualized';
import {Input} from 'semantic-ui-react';
import {
    sortableContainer,
    sortableElement,
    DragLayer,
    arrayMove,
  } from './react-sortable-multiple-hoc'
  

//Custom Import
import './TaskList.css';
import TaskListHeading from './TaskListHeading';
import TaskItem from './TaskItem'
import { setCursorValueAction } from './TaskListActions';


const dragLayer = new DragLayer()


const renderRow = (sectionId, allData) => {
    const tasks = allData.section.byId[sectionId].tasks;
    const rowRenderer =  ({
        index,       // Index of row
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        key,         // Unique key within array of rendered rows
        parent,      // Reference to the parent List (instance)
        style        // Style object to be applied to row (to position it);
                     // This must be passed through to the rendered row element.
      })  => {
        
        const taskId  = tasks[index];
        const task    = allData.task.byId[taskId];
        //const section = displaySection(taskId, allData);
        return (
            // <div style={style} index={index} key={key}>
            // { 
            //     section &&
            //     <div key={section.id} style={{ background: "#fff",  margin: "0 auto"}}>
            //         <TaskListHeading sectionId={section.id} id={section.id} heading={section.title} protected={section.isProtected} type="fixed"/> 
            //     </div>
            // }
                <TaskItem item={task}  style={style} index={index} key={key} task={task} isActiveTaskSection  memberObj={allData.user.byId} statusObj={allData.status.byId} labelObj ={allData.label.byId}/>
            // </div>
          
        )
    }

    return rowRenderer;
}


const SortableTask = sortableElement(props => {
    const taskId = props.item;
    console.log(props);
    const allData = props.allData;
    const task = props.allData.task.byId[taskId];
    return (
        <div onClick={props.onSelect} className={props.className}>
            <TaskItem id={taskId}  item={taskId} task={task} isActiveTaskSection  memberObj={allData.user.byId} statusObj={allData.status.byId} labelObj ={allData.label.byId}/>
        </div>
    )
  })

/**
 * Sortable Container
 */
const SortableTaskList = sortableContainer((props=>{
    const {
        sectionId,
        allData,
    } = props;
    //const taskRowRenderer = renderRow(sectionId, allData);
    const section         = allData.section.byId[sectionId];
    const tasks           = section.tasks;
    return (
        <div>
            {
                map(tasks,((taskId, index) => {
                    const task = allData.task.byId[taskId];
                    return (
                        <SortableTask key={index} index={index} item={taskId} allData={allData} />
                    )
                }))
            }
        </div>
    );
}));


/**
 * Will store the  section with list of tasks.. ..
 */
const SortableSectionElement = sortableElement((props => {
    const {
        allData,
        sectionId
    } = props;
    
    const section = allData.section.byId[sectionId];
    const tasks   = section.tasks;
    return (
        <div style={{ background: "#fff",  margin: "0 auto"}}>
            <TaskListHeading sectionId={sectionId} id={sectionId} heading={section.title} protected={section.isProtected} type="fixed"/> 
                <SortableTaskList
                    {...props}
                    sectionId={sectionId}
                    items={tasks}
                    distance={3}
                    dragLayer={dragLayer}
                    helperClass={'selected'}
                    isMultiple={true}
                    allData={allData}
                    useWindowAsScrollContainer
                />
        </div>
    )
}));
        


/** Main Container on page */
const SortableSectionList = sortableContainer(( props => {
    const {
        allData,
        onSortItemsEnd
    } = props;

    console.log("Sort Items End", onSortItemsEnd);

    //Return the SortableSectionElement
    return (
        <div>
            {
                allData && allData.section && allData.section.allIds &&
                map(allData.section.allIds, (sectionId, index) => {
                    const section = allData.section.byId[sectionId];
                    return (
                        <SortableSectionElement
                            key={section.id}
                            index={index}
                            item={sectionId}
                            id={index}
                            sectionId={sectionId}
                            allData={allData}
                            onMultipleSortEnd={onSortItemsEnd}
                            useWindowAsScrollContainer
                        />
                    )
                })
            }
            
        </div>
    )
}));

const SortableComponent = (props) => {
    const {
        allData,
    } = props;


    const onSortItemsEnd = ({ newListIndex, newIndex, items }) => {
        console.log("Sort Items End ", newListIndex, newIndex, items);
    }
      
    const onSortEnd = ({oldIndex, newIndex}) => {
        console.log("On Sort End",oldIndex, newIndex);
        // if (oldIndex !== newIndex) {
           
        //     // We need to inform React Virtualized that the items have changed heights
        //     const instance = that.SortableList.getWrappedInstance();
        //     instance.List.recomputeRowHeights();
        //     instance.forceUpdate();
        // }
    };
    return ( 
        <SortableSectionList 
            items={allData.section.allIds}
            allData={allData}
            onSortEnd={onSortEnd}
            onSortItemsEnd={onSortItemsEnd}
            helperClass={'selected'}
        />
    );

}


// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        sectionObj: store.ModelDataReducer.section,
        userObj: store.ModelDataReducer.users,
        labelObj: store.ModelDataReducer.labels,
        statusObj: store.ModelDataReducer.statusObj,
        cursor: store.ModelDataReducer.cursor

    };
}


//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here
    setCursorValueAction
};




export default connect(mapStateToProps, mapActionsToProps)(SortableComponent);

