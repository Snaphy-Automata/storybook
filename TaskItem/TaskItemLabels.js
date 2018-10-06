import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


//import actions
import { findLabelById } from '../../baseComponents/GridView/components/ModelData/Label/action'

//import components
import Label from '../Label'

class TaskItemLabels extends PureComponent {

    static propTypes = {
        //props
        taskId: PropTypes.string.isRequired,
        isScrolling: PropTypes.bool.isRequired,

        //actions
        findLabelById: PropTypes.func,
        //redux
        labelList: PropTypes.array
    }

    static defaultProps = {
        labelList: []
    }

    constructor(props) {
        super(props)
    }

    render() {
        const {isScrolling, labelList, findLabelById } = this.props

        let tooltip = ""
        let firstLabelTitle
        let firstLabelColorCode
        if(labelList.length>0){
            const label = findLabelById(labelList[0])
            firstLabelTitle = label.title
            firstLabelColorCode = label.colorCode
        }
        if (!isScrolling) {
            labelList.forEach((labelId, index) => {
                let isLast = false;
                if (index + 1 === labelList.length) {
                    isLast = true;
                }
                const label = findLabelById(labelId);
                if (label && label.id) {
                    if (index > 0) {
                        tooltip = `${tooltip} ${label.title}`
                    }
                    if (!isLast && index > 0) {
                        tooltip = `${tooltip}, `
                    }
                }
            })
        }




        return (
            <div className="task-list-item-tags-container">
                {
                    labelList &&
                    labelList.length > 0 &&
                    <div className="task-list-item-tag-item">
                        <Label title={firstLabelTitle} color={firstLabelColorCode} tooltip={firstLabelTitle} style={{ float: 'left' }} />
                        <Label title="..." style={{ float: 'right' }} tooltip={tooltip} />
                    </div>

                }
            </div>
        )
    }
}


function mapStateToProps(store, props) {
    const allTaskObj = store.ModelDataReducer.task
    const task = allTaskObj.byId[props.taskId]
    const labelList = task.labels
    return {
        labelList
    }
}

const mapActionsToProps = {
    findLabelById

}

export default connect(mapStateToProps, mapActionsToProps)(TaskItemLabels)