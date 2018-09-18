/**
 * Created by Robins Gupta
 * 17th Sept 2018
 */
import React , {PureComponent}  from 'react'
import PropTypes                from 'prop-types'
import map                      from 'lodash/map'
import { connect }              from 'react-redux';
//Custom Import.
import TeamCircleIcon   from '../TeamCircleIcon'


class AssignedTeams extends PureComponent {

  static defaultProps = {
    memberIds: [],
    assignedTeams: []
  }


  static propTypes = {
    memberIds: PropTypes.array
  }

  constructor(props){
    super(props)
  }


  getTeams(){
    const assignedTeams = this.props.assignedTeams
    const getTooltip    = this.getTooltip
    if(assignedTeams && assignedTeams.length){
      return map(assignedTeams, (user)=>{
        const title = getTooltip(user)
        const props = {
          icon: 'user',
          title,
          tooltip: title,
          className:"task-detail-assigned-team-box"
          //FIXME: Add src for images..
          //18th Sept 2018
        }
        return (
          <TeamCircleIcon size="tiny" key={user.id} {...props}/>
        )
      })
    }

  }


  getTooltip(user){
    let tooltip = ""
    if(user && user.firstName){
      tooltip = `${user.firstName}`;
      if(user.lastName){
          tooltip = `${tooltip} ${user.lastName}`;
      }
    }
    return tooltip
  }

  render(){
    const {assignedTeams} = this.props
    console.log("Assigned Teams", assignedTeams)
    const hasTeams = !!assignedTeams.length
    const assignTeamProp = {
      icon: 'plus',
      tooltip: "Assign Team",
      className: "task-detail-assigned-team-box task-detail-assigned-team-class"
    }
    return (
      <div className="task-detal-assigned-teams-container">
        {hasTeams && this.getTeams()}
        <TeamCircleIcon size="tiny" key={"assign-teams"} {...assignTeamProp}/>
      </div>
    )
  }
}





function mapStateToProps(store, props) {
  const modelDataReducer = store.ModelDataReducer
  const memberIds        = props.memberIds
  const assignedTeams    = []
  if (memberIds && memberIds.length) {
    memberIds.forEach(userId=>{
      const user = modelDataReducer.user.byId[userId]
      if(user){
        console.log(user)
        console.log(modelDataReducer.user)
        assignedTeams.push(user)
      }
    })
  }

  return {
      assignedTeams,
  }
}


//Map Redux Actions to Props..
const mapActionsToProps = {
  //map action here

};

export default connect(mapStateToProps, mapActionsToProps)(AssignedTeams);

