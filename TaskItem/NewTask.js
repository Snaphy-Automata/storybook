import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react'
import { compose, graphql } from 'react-apollo'

//import actions..
import { onTitleChangeAction, onTaskSaveOnBlurAction } from '../../baseComponents/GridView/components/ModelData/Task/action'

//import components
import InputField from '../ReduxForm/InputField'

//import graphqls
import { createOrEditTaskMutation } from '../../baseComponents/GridView/components/graphql/task/mutation'

class NewTask extends PureComponent {

    static propTypes = {
        //props
        taskId: PropTypes.string.isRequired,
        isAutoFocus: PropTypes.bool,
        onTaskSelected: PropTypes.func,
        sectionId: PropTypes.string,
        index: PropTypes.number,
        //action
        onTitleChangeAction: PropTypes.func,
        onTaskSaveOnBlurAction: PropTypes.func,
        //redux
        title: PropTypes.string
    }

    static defaultProps = {
        title: "",
        isEditable: false
    }

    constructor(props) {
        super(props)
        this.state = {
            isEditable: false
        }

        this.onTitleUpdate = this._onTitleUpdate.bind(this)
        this.onWriteTask = this._onWriteTask.bind(this)
        this.onTitleBlur = this._onTitleBlur.bind(this)
        this.onTitleFocus = this._onTitleFocus.bind(this)
        this.onEnterData = this._onEnterData.bind(this)

    }

    _onTitleUpdate(title) {
        const {
            taskId,
            onTitleChangeAction,
        } = this.props
        onTitleChangeAction(taskId, title)
    }

    _onWriteTask(e) {
        const { taskId, onTaskSelected } = this.props
        this.setState({
            isEditable: true
        })
        onTaskSelected(taskId)
        e.preventDefault()
    }


    _onTitleBlur = (value) => {
        const { onTaskSaveOnBlurAction, sectionId, taskId, createOrEditTaskMutation, index, previousItemId } = this.props
        //console.log(" On Title Blur getting called")
        if (!value || value === "") {
            this.setState({
                isEditable: false
            })
        } else {
            onTaskSaveOnBlurAction(taskId, index, sectionId, previousItemId, createOrEditTaskMutation)
        }


    }

    _onTitleFocus = () => {
        // const { onTaskItemFocusEvent, task } = this.props;
        // onTaskItemFocusEvent(task);

    }

    _onEnterData = (key, value) => {
        const { task, onTaskItemBlurEvent, onEnterNextNewTask, index } = this.props;
        if (key === "Enter") {
            if (value && value !== "") {

            }
        }
    }



    render() {
        const { isEditable } = this.state
        const { title } = this.props
        return (
            <div>
                <div className="task-list-item-add-new-task-container" style={{ backgroundColor: "#fcfcfc" }} onMouseDown={this.onWriteTask}>
                    <div className="task-list-item-container" >
                        <div className="task-item-delayed-block"></div>
                        <div className="task-list-item-side-bar-container">
                            <div className={'task-list-item-side-line'}>
                            </div>
                            <div className={'task-list-add-item-icon'}>
                                {!isEditable && <Icon size="small" name="add"></Icon>}
                            </div>
                        </div>
                        {!isEditable &&
                            <div className="task-list-item-new-task-title" style={{ color: "#9e9e9e", paddingLeft: "2px" }}>
                                Add New Task
                                </div>
                        }
                        {isEditable &&
                            <div className="task-list-item-new-task-title">
                                <div className="task-list-item-new-task-container">
                                    <InputField onChange={this.onTitleUpdate} value={title} placeholder="Write Task" transparent autoFocus fluid className="task-list-item-new-task" onBlurEvent={this.onTitleBlur} onFocusEvent={this.onTitleFocus} onKeyPressEvent={this.onEnterData} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(store, props) {
    const allTaskObj = store.ModelDataReducer.task
    const task = allTaskObj.byId[props.taskId]
    let title
    if (task) {
        title = task.title
    }
    return {
        title
    }
}

const mapActionsToProps = {
    onTitleChangeAction,
    onTaskSaveOnBlurAction
}

const NewTaskMutation = compose(
    graphql(createOrEditTaskMutation, { name: "createOrEditTaskMutation" })
)(NewTask)

export default connect(mapStateToProps, mapActionsToProps)(NewTaskMutation)