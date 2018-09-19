/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React, {PureComponent} from 'react'
import PropTypes              from 'prop-types'

//Custom Import..
import CircularIconBox        from '../CircularIconBox'


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
    return (
      <div className="task-detail-labels-container">
        <div className="task-detail-labels-sidebar-icon">
          <CircularIconBox className="task-detail-labels-checkbox" icon="user" />
        </div>
        <div className="task-detail-label-sidebar-body">

        </div>
      </div>
    )
  }
}



export default Labels

