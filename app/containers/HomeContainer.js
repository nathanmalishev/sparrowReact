import React, { Component } from 'react';
import { getGroups, createGroup } from '../helpers/api';
import { logout } from '../helpers/auth';
import GroupTab from '../components/GroupTab';
import CreateGroupContainer from './createGroupContainer';
import _ from 'lodash'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    color: 'black',
  },
};

//Is what is displayed on the root directory renders the each possible group
class HomeConatiner extends Component {

  constructor() {
    super();
    this.state = {
      groups: [],
      loading: true,
      createNewGroup: false,
    };

    this.handleGroupClick = this.handleGroupClick.bind(this);
    this.handleSubmitGroup = this.handleSubmitGroup.bind(this);
  }

  componentWillMount() {
    // check if user is logged in
    // then set state

    getGroups()
    .then((res)=> {
      if (res.statusText === 'OK') {
        this.setState({
          groups: res.data.groups,
          authUser: res.data.user,
          loading: false,
        });
      }
    });

  }

  handleGroupClick() {
    this.setState({
      createNewGroup: true,
    });
  }

  handleSubmitGroup(groupname) {
    this.setState({
      createNewGroup: false,
    });
    createGroup(groupname)
      .then((res)=> {
        this.setState({
          groups: _.concat(this.state.groups, res.data.group)
        });
      });

  }

  render() {
    const groups = this.state.groups.map((group)=> {
      return <GroupTab key={group._id} _id={String(group._id)} groupname={group.name} users={group.users} destinations={group.destinations} />;
    });
    return (
      <div style={styles.container}>
      {
        this.state.loading === true
        ? <p>Loding..</p>
        : (groups)
      }

      {
        this.state.createNewGroup === true
        ? <CreateGroupContainer onSubmitGroup={this.handleSubmitGroup}/>
        : <button className='ghost-button' onClick={this.handleGroupClick}>CREATE NEW GROUP</button>
      }
      <br/>
      <button className='ghost-button' onClick={logout}>LOGOUT</button>
      <br/>
      <br/>
      <br/>
      </div>
      // Whats the easiest way to add whitepsace lol
    );
  }
}

export default HomeConatiner;
