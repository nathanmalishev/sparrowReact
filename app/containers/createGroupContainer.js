import React, { Component } from 'react';

export default class createGroupContainer extends Component {

  constructor(){
    super();
    this.state = {
      groupName: '',
      message: ''
    }
    this.handleGroupChange = this.handleGroupChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleGroupChange(e){
    this.setState({
      groupName: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    var groupName = this.state.groupName.trim();
    if( !groupName){
      this.setState({
        message: 'please enter a group name!'
      })
      return;
    }
    this.props.onSubmitGroup(groupName)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            Enter group name
            <input
              type="text"
              value={this.state.groupName}
              onChange={this.handleGroupChange}
            />
            <input type="submit" value="Post" />
          </form>
          {this.state.message}
      </div>
    );
  }
}
