import React, { Component } from 'react'
import {
  sortableContainer,
  sortableElement,
  arrayMove,
  DragLayer
} from './react-sortable-multiple-hoc'

//Custom Import
import TaskItem from './TaskItem'
import taskData from '../../data/taskListData';

import './TaskList.css';
import TaskListHeading from './TaskListHeading';
const dragLayer = new DragLayer()

const SortableItem = sortableElement(props => {
  const taskId = props.item;
  const task = taskData.getData().task.byId[taskId];
  return (
  
      <TaskItem id={taskId}  item={taskId} task={task} isActiveTaskSection  memberObj={taskData.getData().user.byId} statusObj={taskData.getData().status.byId} labelObj ={taskData.getData().label.byId}/>
  
  )
})

const SortableListItems = sortableContainer(({ items, allData }) => {
    console.log(allData);
    return(
        <div>
            {items.map((taskId, index) => (
            <SortableItem key={index} index={index} item={taskId} allData={allData} />
            ))}
        </div>
    )
})

/**  This is the Chapter Part/Section Title, it drags as a group of items  */
const SortablePart = sortableElement(props => {
  // console.log('SortablePart - props', props)
  const sectionId = props.item;
  const allData = props.allData;
  const section = props.allData.section.byId[sectionId];
  return (
    <div style={{ background: "#fff",  margin: "0 auto", width: "800px"}}>
        <TaskListHeading sectionId={sectionId} id={sectionId} heading={section.title} protected={section.isProtected} type="fixed"/> 
        <SortableListItems
            {...props}
            items={section.tasks}
            dragLayer={dragLayer}
            distance={3}
            helperClass={'selected'}
            allData={allData}
            isMultiple={true}
            helperCollision={{ top: 0, bottom: 0 }}
        />
    </div>
  )
})

/** Main Container on page */
const SortableListParts = sortableContainer(({ items, onSortItemsEnd, allData }) => (
  <div>
    {/* <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: '#e0e0e0',
      color: '#000',
      padding: '2em',
      // height: '800px',
      // overflow: 'auto',
    }}> */}
    {items.map((sectionId, index) => (
      <SortablePart
        key={index}
        index={index}
        item={sectionId}
        id={index}
        allData={allData}
        onMultipleSortEnd={onSortItemsEnd}
      />
    ))}
  </div>
))


export default  (props) => {
  
  const onSortEnd = ({ oldIndex, newIndex }) => {
      console.log("On Sort End", oldIndex, newIndex);
    // this.setState({
    //     allData: arrayMove(this.state.allData.section.allIds, oldIndex, newIndex)
    // })
  }
  const onSortItemsEnd = ({ newListIndex, newIndex, items }) => {
    console.log("On Sort Items End", newListIndex, newIndex, items);
    //const sections = this.state.allData.section.allIds.slice()
    const itemsValue = []

    // items.forEach(item => {
    //   itemsValue.push(sections[item.listId].items[item.id])
    // })
    // for (let i = items.length - 1; i >= 0; i--) {
    //   const item = items[i]

    //   sections[item.listId].items.splice(item.id, 1)
    // }
    // sections[newListIndex].items.splice(newIndex, 0, ...itemsValue)
    // this.setState({
    //   allData: {
    //       ...this.setState.allData,
    //       section: {
    //         ...this.setState.allData.section,    
    //         allIds: [...sections],
    //     }
    //   }
    // })
  }

    return (
      <div>
        <SortableListParts
          items={props.allData.section.allIds}
          onSortEnd={onSortEnd}
          onSortItemsEnd={onSortItemsEnd}
          helperClass={'selected'}
          allData={props.allData}
        />
      </div>
    )

}
