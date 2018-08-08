import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { List, WindowScroller } from 'react-virtualized';
import {Input} from 'semantic-ui-react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

//Custom Import
import './TaskList.css';
import TaskListHeading from './TaskListHeading';
import TaskItem from './TaskItem'
import { setCursorValueAction } from './TaskListActions';

const renderRow = (sectionId, sectionObj, userObj, statusObj, labelObj) => {
    const tasks = sectionObj.byId[sectionId].tasks;
    const rowRenderer = ({
        index,       // Index of row
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        key,         // Unique key within array of rendered rows
        parent,      // Reference to the parent List (instance)
        style        // Style object to be applied to row (to position it);
        // This must be passed through to the rendered row element.
    }) => {

        const task = tasks[index];
        return (

            <TaskItem style={style} key={index} index={index} task={task} isActiveTaskSection memberObj={userObj.byId} statusObj={userObj.byId} labelObj={labelObj.byId} taskLength={tasks.length}/>
        )
    }

    return rowRenderer;
}

class VirtualList extends Component {
    render() {
        const {
            sectionObj,
            userObj,
            statusObj,
            labelObj,
            sectionId,
            height,
            isScrolling,
            scrollTop,
        } = this.props;
        const taskRowRenderer = renderRow(sectionId, sectionObj, userObj, statusObj, labelObj);
       
        return (
                <List
                    ref={(instance) => {
                        this.List = instance;
                    }}
                    rowHeight={41}
                    rowRenderer={taskRowRenderer}
                    rowCount={sectionObj.byId[sectionId].tasks.length}
                    width={1170}
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                />

        );
    }
}

/*
 * Important note:
 * To access the ref of a component that has been wrapped with the SortableContainer HOC,
 * you *must* pass in {withRef: true} as the second param. Refs are opt-in.
 */
const SortableList = SortableContainer(VirtualList, { withRef: true });



class SortableComponent extends Component {

    render() {
        const {
            sectionObj,
            userObj,
            labelObj,
            statusObj,
            cursor
        } = this.props;
        const that = this;
        return (
            <div>
                {
                    map(sectionObj.allIds, sectionId => {
                        const section = sectionObj.byId[sectionId];
                        //On End of Sort
                        const onSortEnd = ({ oldIndex, newIndex }) => {
                            //console.log("On Sort End",oldIndex, newIndex);
                            if (oldIndex !== newIndex) {
                                this.setState({
                                    items: arrayMove(section.tasks, oldIndex, newIndex),
                                });

                                // We need to inform React Virtualized that the items have changed heights
                                const instance = that.SortableList.getWrappedInstance();

                                instance.List.recomputeRowHeights();
                                instance.forceUpdate();
                            }
                        };
                        return (
                            <div key={section.id} style={{ background: "#fff" }}>
                                <TaskListHeading id={section.id} heading={section.title} protected={section.isProtected} type="fixed" />
                                {
                                    section.tasks &&
                                    section.tasks.length !== 0 &&
                                    <WindowScroller>
                                        {({ height, isScrolling, registerChild, scrollTop }) => (
                                            <div ref={registerChild}>
                                                <SortableList
                                                    ref={(instance) => {
                                                        this.SortableList = instance;
                                                    }}
                                                    sectionObj={sectionObj}
                                                    userObj={userObj}
                                                    labelObj={labelObj}
                                                    statusObj={statusObj}
                                                    sectionId={sectionId}
                                                    onSortEnd={onSortEnd}
                                                    height={height}
                                                    isScrolling={isScrolling}
                                                    scrollTop={scrollTop}
                                                    useDragHandle
                                                    useWindowAsScrollContainer
                                                />
                                            </div>
                                        )}
                                    </WindowScroller>
                                }
                            </div>
                        )
                    })
                }

            </div>
        );
    }
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

