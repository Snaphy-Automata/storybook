import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TaskItemTitle extends PureComponent {

    static propTypes = {
        //props
        taskId : PropTypes.string.isRequired,
        //action

        //redux
        title : PropTypes.string
    }

    static defaultProps = {
        title: ""
    }

    constructor(props) {
        super(props)
    }

    render() {
        //console.log("Task Title getting rendered")
        const {title} = this.props
        return (
            <div className="task-list-item-title-item">{title}</div>
        )
    }
}


function mapStateToProps(store, props) {
    const allTaskObj = store.ModelDataReducer.task
    const task = allTaskObj.byId[props.taskId]
    let title
    const lastGeneratedTaskId = store.ModelDataReducer.lastGeneratedTaskId
    if(props.taskId !== lastGeneratedTaskId){
        title = task.title
    }
    return {
        title
    }
}


const mapActionsToProps = {
}



export default connect(mapStateToProps, mapActionsToProps)(TaskItemTitle)