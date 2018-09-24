/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React, {PureComponent} from 'react'
import PropTypes              from 'prop-types'

//Custom Import..
import CircularIconBox        from '../CircularIconBox'
import TaskLabel              from '../TaskLabels'

class Labels extends PureComponent{
  constructor(props){
    super(props)
  }

  static defaultProps = {
    labelIds: []
  }

  static propTypes = {
    labelIds: PropTypes.array,
  }

  render(){
    const {labelIds} = this.props
    console.log("Labels Ids", labelIds)
    const hasLabels = !!labelIds.length
    console.log("has Labels", hasLabels)
    return (
      <div className="task-detail-labels-container">
        <div className="task-detail-labels-sidebar-icon">
          <CircularIconBox isNew={!hasLabels} className="task-detail-labels-checkbox" icon="tag" />
        </div>
        <div className="task-detail-assign-sidebar-body">
          { !hasLabels && <span>Assign Labels</span> }
          {
            hasLabels &&
            <TaskLabel
              labelIds={labelIds}
            />
          }
        </div>
      </div>
    )
  }
}



export default Labels

