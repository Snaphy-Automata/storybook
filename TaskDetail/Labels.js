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
  static defaultProps = {
    labelIds: []
  }

  static propTypes = {
    labelIds: PropTypes.array,
    projectId: PropTypes.string.isRequired,
  }

  constructor(props){
    super(props)
    this.onLabelAdded          = this._onLabelAdded.bind(this)
    this.onLabelRemoveBtnClick = this._onLabelRemoveBtnClick.bind(this)
  }


  _onLabelRemoveBtnClick(event, labelId){
    console.log("On Label Remove btn click", labelId)
  }

  _onLabelAdded(event, labelId){
    console.log("On Label Btn Add click", labelId);
  }


  render(){
    const {labelIds, projectId} = this.props
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
              projectId={projectId}
              onLabelAdded={onLabelAdded}
              onLabelRemoveBtnClick={onLabelRemoveBtnClick}
            />
          }
        </div>
      </div>
    )
  }
}



export default Labels

