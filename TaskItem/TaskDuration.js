import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TaskDuration extends PureComponent {

    static propTypes = {
        //props
        taskId         : PropTypes.string.isRequired,
        
        //action

        //redux
        durationInText : PropTypes.string

    }

    static defaultProps = {

    }

    constructor(props) {
        super(props)
    }

    render() {

        const { durationInText } = this.props
        return (
            <div className="task-list-item-status">
                {durationInText && durationInText !== "" &&
                    <div>
                        <Icon name="clock outline" style={{ display: "inline", margin: '0' }}></Icon>
                        <span className="task-list-item-status-duration">{durationInText}</span>
                    </div>

                }

            </div>
        )
    }

}

function mapStateToProps(store, props) {
    const allTaskObj = store.ModelDataReducer.task
    const task = allTaskObj.byId[props.taskId]
    const durationInText = task.durationInText
    return {
        durationInText
    }
}

const mapActionsToProps = {

}


export default connect(mapStateToProps, mapActionsToProps)(TaskDuration)


