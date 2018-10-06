import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//import actions
import { findStatusById } from '../../baseComponents/GridView/components/ModelData/Status/action'

class TaskStatus extends PureComponent {

    static propTypes = {
        //props
        taskId: PropTypes.string.isRequired,
        //actions
        findStatusById: PropTypes.func,
        //redux
        statusId: PropTypes.string
    }

    static defaultProps = {

    }

    constructor(props) {
        super(props)
    }

    render() {
        const { findStatusById, statusId } = this.props
        let status 
        if(statusId){
            status = findStatusById(statusId)
        }

        return (
            <div className="task-list-item-status" >
                {status &&
                    <div style={{ color: status.colorCode }}>{status.title}</div>
                }
            </div>
        )
    }
}

function mapStateToProps(store, props) {
    const allTaskObj = store.ModelDataReducer.task
    const task = allTaskObj.byId[props.taskId]
    const statusId = task.statusId
    return {
        statusId
    }
}

const mapActionsToProps = {
    findStatusById
}

export default connect(mapStateToProps, mapActionsToProps)(TaskStatus)