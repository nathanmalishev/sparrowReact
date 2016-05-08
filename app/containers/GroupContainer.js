import React, { Component, PropTypes } from 'react';
import {getGroup} from '../helpers/api'
import Group from '../components/Group'




class GroupContainer extends Component {

  constructor(){
    super();
    this.state = {
      loading:true,
      groupData: {},
      currentDestination: {}
    }
    this.handleDestinationClick = this.handleDestinationClick.bind(this)
  }

  componentDidMount(){
    //split id as there is two
    getGroup(this.props.routeParams.id)
      .then((res)=>{
        if(res.statusText === 'OK'){
          this.setState({
            loading:false,
            groupData: res.data,
            currentDestination: res.data.destinations[0]
          })
          console.log(res)
        }

      })
  }

  handleDestinationClick(destination){
    console.log(destination)
    this.setState({
      currentDestination: destination
    })

  }

  render() {
    // console.log(this.props.routeParams.id)
    return (
      <div>
      {
        this.state.loading === true
          ? <p>Loading</p>
          : <div>
            <Group
                groupName={this.state.groupData.name}
                users={this.state.groupData.users}
                destinations={this.state.groupData.destinations}
                currentDestination={this.state.currentDestination}
                onDestinationClick={this.handleDestinationClick}
                routeParams={this.props.routeParams}
              />
           {React.cloneElement(this.props.children, { destination:this.state.currentDestination, users:this.state.groupData.users, routeParams:this.props.routeParams })}
            </div>
      }
      </div>
    );
  }
}

GroupContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default GroupContainer;