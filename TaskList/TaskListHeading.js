import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react'
import { SortableHandle } from 'react-sortable-hoc';

import './TaskList.css';


/**
 * Drag handle
 */
const DragHandle = SortableHandle(() => (
    <div className="task-list-heading-drag-icon-container">
        <Icon className="task-list-heading-drag-icon" name="ellipsis vertical"></Icon>
        <Icon className="task-list-heading-drag-icon" name="ellipsis vertical"></Icon>
    </div>
)); // This can be any component you want


class TaskListHeading extends PureComponent{
  static defaultProps = {
    type: "fixed",
  }

  static propTypes = {
    heading: PropTypes.string.isRequired,
    protectedName: PropTypes.string.isRequired,
    type: PropTypes.string, //custom || fixed
    sectionId: PropTypes.string.isRequired,
    onArchiveClicked: PropTypes.func,
    subHeadingComponent: PropTypes.element,
    headingClassName: PropTypes.string,
    isCollapsed: PropTypes.bool,
    isEmptySection: PropTypes.bool,
    isAddNewTaskVisible: PropTypes.bool,
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    onNewTaskAdded: PropTypes.func,
    onSectionStateChanged: PropTypes.func,
    onAddNewtaskClicked: PropTypes.func,
  }

  constructor(props){
    super(props)
    this.onStateChanged      = this.onStateChangedRaw.bind(this)
    this.onAddNewTaskClicked = this.onAddNewTaskClickedRaw.bind(this)
    this.onWriteTask         = this.onWriteTaskRaw.bind(this)
  }


  onStateChangedRaw(){
    const {onSectionStateChanged, sectionId, isCollapsed, index, isEmptySection} = this.props
    let emptySectionId = null;
    if(isEmptySection){
        emptySectionId = sectionId;
    }
    onSectionStateChanged(sectionId, index, isCollapsed, emptySectionId);
  }

  onAddNewTaskClickedRaw(){
    const {sectionId, index, onNewTaskAdded} = this.props
    onNewTaskAdded(sectionId, index);
  }

  getDragContainerClassName(){
    const {protectedName} = this.props
    let className = "task-list-heading-drag-container";
    if (protectedName !== "active_tasks") {
        className = `${className} task-list-heading-drag-cursor`;
    }
    return className;
  }

  onWriteTaskRaw(){
    const {onAddNewtaskClicked, index, sectionId} = this.props
    onAddNewtaskClicked(index, sectionId);
  }


  render(){
    const {
      heading,
      onArchiveClicked,
      type,
      subHeadingComponent,
      headingClassName,
      protectedName,
      isCollapsed,
      isEmptySection,
      isAddNewTaskVisible,
      className,
      iconClassName,
    } = this.props;


    let containerClassName = `task-list-heading-parent-wrapper`;
    if(className){
      containerClassName = `${containerClassName} ${className}`;
    }

    let iconClassNameStr = `task-list-heading-drag-angle-icon`;
    if(iconClassName){
      iconClassNameStr = `${iconClassNameStr} ${iconClassName}`;
    }

    const getIcon = function () {
        if (!isCollapsed) {
            return `angle down`
        } else {
            return `angle right`
        }
    }
    let headingClassName_ = headingClassName || "";
    headingClassName_ = `task-list-heading-container ${headingClassName_}`


    return (
      <div>
        <div className={containerClassName}>
            <div className={iconClassNameStr}>
                <div className={this.getDragContainerClassName()}>
                    {protectedName !== "active_tasks" && <DragHandle />}
                </div>
                <div onClick={this.onStateChanged}>
                    <div className="task-list-heading-icon"> <Icon style={{ margin: 0 }} name={getIcon()} ></Icon></div>
                </div>
            </div>

            <div className={headingClassName_}>
                <div className={"task-list-heading-wrapper"}>

                    <div className="task-list-heading-title">
                        {(!type || type === "fixed") && <div>{heading}</div>}
                        {/* {type === "custom" && <Input transparent placeholder="Write Section Name" defaultValue="My Bugs" />} */}
                    </div>
                </div>
                {
                    !subHeadingComponent &&
                    <div className="task-list-sub-heading-wrapper">
                        <div className="task-list-heading-archive-container on-subheading-hover" >
                            <div>
                                <Icon style={{ display: "inline" }} name="archive" onClick={onArchiveClicked}></Icon>
                                <div style={{ display: "inline", marginLeft: "5px" }} onClick={onArchiveClicked}>Archive</div>
                            </div>

                        </div>
                        <div className="task-list-heading-add-new-container on-subheading-hover" >
                            <div onClick={this.onAddNewTaskClicked}>
                                <Icon style={{ display: "inline" }} name="clipboard outline"></Icon>
                                <div style={{ display: "inline", marginLeft: "5px" }} >Add New Task</div>
                            </div>
                        </div>
                    </div>
                }
                {
                    subHeadingComponent && subHeadingComponent
                }
            </div>
        </div>
        {
            isEmptySection && !isCollapsed && isAddNewTaskVisible &&
            <div className="task-list-item-delayed-wrapper" style={{backgroundColor:"#fcfcfc"}} onClick={this.onWriteTask}>
                <div className="task-list-item-container" >
                <div className="task-item-delayed-block"></div>
                    <div className="task-list-item-side-bar-container">
                        <div className={'task-list-item-side-line'}>
                        </div>
                        <div className={'task-list-add-item-icon'}>
                        <Icon size="small" name="add"></Icon>
                        </div>
                    </div>

                    <div className="task-list-item-new-task-title" style={{color:"#9e9e9e", paddingLeft:"2px"}}>
                            Add New task
                    </div>
                </div>
            </div>
        }
      </div>
    )

  } //end render func


} // end TaskListHeading class



// Retrieve data from store as props
function mapStateToProps(store, props) {
    const modelDataReducer = store.ModelDataReducer;
   // const sectionState = modelDataReducer.sectionState[props.sectionId];
    const section      = modelDataReducer.task.byId[props.sectionId];
    let isCollapsed = false;
    if(section && section.isCollapsed){
        isCollapsed = true;
    }
    // if (sectionState && sectionState.isCollapsed) {
    //     isCollapsed = true;
    // }

    const heading = props.heading? props.heading:section.title
    const protectedName = props.protectedName? props.protectedName: section.protectedName

    return {
      isCollapsed,
      heading,
      protectedName,
      isAddNewTaskVisible : store.ModelDataReducer.isAddNewTaskVisible
    };
}

//Map Redux Actions to Props..
const mapActionsToProps = {
    //map action here

};



export default connect(mapStateToProps, mapActionsToProps)(TaskListHeading);
