import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { List, WindowScroller } from 'react-virtualized';
import {Input} from 'semantic-ui-react';
import {
    sortableContainer,
    sortableElement,
    arrayMove,
    DragLayer
  } from 'snaphy-react-sortable-dnd'
  

//Custom Import
import './TaskList.css';
import TaskListHeading from './TaskListHeading';
import TaskItem from './TaskItem'
import { setCursorValueAction } from './TaskListActions';


const dragLayer = new DragLayer()

/**
 * Will return section if section is to be displayed..
 * @param {*} taskIndex 
 */
const displaySection = (taskId, allData) => {
    const task = allData.task.byId[taskId];
    const sectionId = task.sectionId;
    const sectionTasks = allData.section.byId[sectionId].tasks;
    const firstTask = sectionTasks[0];
    
    if(firstTask.id === task.id) {
        return allData.section.byId[sectionId];
    }else{
        return false;
    }
}

const renderRow = (allData) => {
    const tasks = allData.task.allIds;
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
        
        const section = displaySection(taskId, allData);
        return (
            // <div style={style} index={index} key={key}>
            // { 
            //     section &&
            //     <div key={section.id} style={{ background: "#fff",  margin: "0 auto"}}>
            //         <TaskListHeading sectionId={section.id} id={section.id} heading={section.title} protected={section.isProtected} type="fixed"/> 
            //     </div>
            // }
                <TaskItem  style={style} index={index} key={key} task={task} isActiveTaskSection  memberObj={allData.user.byId} statusObj={allData.status.byId} labelObj ={allData.label.byId}/>
            // </div>
          
        )
    }

    return rowRenderer;
}

const SortableList = SortableContainer((props=>{
    const {
        allData,
        height,
        isScrolling,
        scrollTop,
    } = props;
    const taskRowRenderer = renderRow(allData);
    return (
        <List
            rowHeight={({index})=> {
                const tasks = allData.task.allIds;
                const taskId  = tasks[index];
                const section = displaySection(taskId, allData);
                if(section){
                    return 105;
                }else{
                    return 41;
                }
            }}
            rowRenderer={taskRowRenderer}
            rowCount={allData.task.allIds.length}
            width={800}
            autoHeight
            height={height}
            isScrolling={isScrolling}
            scrollTop={scrollTop}
        />
    );
}))
        


const SortableComponent = (props) => {
    const {
        allData,
    } = props;

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
        <WindowScroller>
            {({ height, isScrolling, registerChild, scrollTop }) => (
                <div >
                    <SortableList 
                        allData={allData}
                        onSortEnd={onSortEnd}
                        height={height}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                        useDragHandle
                        useWindowAsScrollContainer
                        helperClass="on-task-selected"
                    />
                </div>  
            )}
        </WindowScroller>
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

