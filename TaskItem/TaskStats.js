import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Icon} from 'semantic-ui-react';

class TaskStats extends PureComponent {

    static propTypes = {
        //props
        taskId: PropTypes.string.isRequired,
        //action

        //redux
        completedSubTasks: PropTypes.number,
        totalSubTasks: PropTypes.number,
        totalAttachments: PropTypes.number
    }

    static defaultProps = {
        completedSubTasks: 0,
    }

    constructor(props) {
        super(props)
    }

    render() {

        const {totalSubTasks, totalAttachments, completedSubTasks} = this.props

        return (
            <div className="task-list-item-sub-task-attachment-container">
                <div style={{ display: "inline-block", width: "60%" }}>
                    {
                        totalSubTasks &&
                        <div>
                            <Icon name="unordered list" style={{ display: "inline", margin: '0' }}></Icon>
                            <div className="task-list-item-sub-task-stats">{completedSubTasks}/{totalSubTasks}</div>
                        </div>
                    }

                </div>


                <div style={{ display: "inline-block", width: "40%", textAlign: 'left' }}>
                    {
                        totalAttachments &&
                        <div>
                            <Icon name="attach" style={{ display: "inline" }}></Icon>
                            <div className="task-list-item-attachment-stats">{totalAttachments}</div>
                        </div>
                    }

                </div>


            </div>
        )

    }
}



function mapStateToProps(store, props) {
    const allTaskObj = store.ModelDataReducer.task
    const task = allTaskObj.byId[props.taskId]
    const completedSubTasks = task.completedSubTasks
    const totalSubTasks = task.totalSubTasks
    const totalAttachments = task.totalAttachments
    return {
        completedSubTasks : completedSubTasks ? completedSubTasks : 0,
        totalSubTasks,
        totalAttachments
    }
}


const mapActionsToProps = {

}


export default connect(mapStateToProps, mapActionsToProps)(TaskStats)