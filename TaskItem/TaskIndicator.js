import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//import functions..
import {compareDate} from '../../baseComponents/GridView/components/formatDate'


class TaskIndicator extends PureComponent{

    static propTypes = {
        //props
        taskId : PropTypes.string.isRequired,
        isScrolling : PropTypes.bool.isRequired,
        isActiveTaskSection : PropTypes.bool,
        //actions

        //redux
        endDateMs : PropTypes.number,
        isCompleted : PropTypes.bool
    }

    static defaultProps = {

    }

    constructor(props){
        super(props)
    }

    render(){
        const {endDateMs, isCompleted, isScrolling, isActiveTaskSection} = this.props

        const getDelayedClassName = () => {
            let delayedClassName = null
            let isDelayed = false
            if(!isScrolling){
                const delayedObj = compareDate(new Date(), new Date(endDateMs))
                if(delayedObj.colorCode === "#ff1744"){
                  isDelayed = true
                }
                if (isActiveTaskSection) {
                    if (isCompleted) {
                        delayedClassName = `task-item-delayed-block completed`;
                    } else {
                        delayedClassName = isDelayed ? `task-item-delayed-block delayed` : `task-item-delayed-block`;
                    }
                } else {
                    delayedClassName = `task-item-delayed-block`;
                }
            } else{
                delayedClassName = `task-item-delayed-block`;
            }
           

            return delayedClassName
        }
        return (
            <div className={getDelayedClassName()}></div>
        )
    }
}

function mapStateToProps(store, props){
    const allTaskObj = store.ModelDataReducer.task
    const task = allTaskObj.byId[props.taskId]
    const endDateMs = task.endDateMs
    const isCompleted = task.isCompleted
    return {
        endDateMs,
        isCompleted
    }
}


const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps)(TaskIndicator)

