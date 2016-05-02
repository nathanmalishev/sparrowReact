import React, { Component } from 'react';
import {getGroups} from '../helpers/api'
import GroupTab from '../components/GroupTab'
import CreateGroupContainer from './CreateGroupContainer'

const styles = {
  container: {
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    padding: 5,
    color: 'black',
  },
};


class HomeConatiner extends Component {

    constructor() {
    super();
    this.state = {
      groups: [],
      loading: true,
      createNewGroup: false,
    };

    this.handleGroupClick = this.handleGroupClick.bind(this)
    this.handleSubmitGroup = this.handleSubmitGroup.bind(this)
  }

    componentWillMount() {
    // check if user is logged in
    // then set state

    //FIXME:have to get the token on my own and then pass it in
    //auth file seems to be too slow in getting it??
    getGroups()
    .then((res)=>{
      console.log(res)
      if(res.statusText === 'OK'){
        this.setState({
          groups: res.data,
          loading: false
        })
      }
    })

  }


  handleGroupClick(){
    this.setState({
      createNewGroup: true
    })
  }

  handleSubmitGroup(groupname){
    this.setState({
      createNewGroup: false
    })
    console.log(groupname)
  }


  render() {
    const groups = this.state.groups.map((group)=>{
      console.log(group._id)
      return <GroupTab key={group._id} _id={String(group._id)} groupname={group.name} users={group.users} destinations={group.destinations} />
    })
    return (
      <div style={styles.container}>
      {
        this.state.loading === true
        ? <p>Loding..</p>
        : groups
      }

      {
        this.state.createNewGroup === true
        ? <CreateGroupContainer onSubmitGroup={this.handleSubmitGroup}/>
        : <p onClick={this.handleGroupClick}>Create new group button <button>go!</button></p>
      }
      </div>
    );
  }
}


export default HomeConatiner;