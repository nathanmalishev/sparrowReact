import React, { Component, PropTypes } from 'react';
import {getGroup} from '../helpers/api'
import Group from '../components/Group'




class GroupContainer extends Component {

  constructor(){
    super();
    this.state = {
      loading:true,
      groupData: {}
    }
  }

  componentDidMount(){
    getGroup(this.props.routeParams.id)
      .then((res)=>{
        if(res.statusText === 'OK'){
          this.setState({
            loading:false,
            groupData: res.data
          })
          console.log(this.state.groupData)
        }
      })
  }

  render() {
    console.log(this.props.routeParams.id)
    return (
      <div>
      {
        this.state.loading === true
          ? <p>Loading</p>
          : <div><Group
              groupName={this.state.groupData.name}
              users={this.state.groupData.users}
              destinations={this.state.groupData.destinations}
              routeParams={this.props.routeParams}
            />
            {this.props.children}
            </div>
      }
      </div>
    );
  }
}


export default GroupContainer;