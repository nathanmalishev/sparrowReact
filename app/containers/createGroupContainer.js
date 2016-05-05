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
        message: 'Please enter a group name...'
      })
      return;
    }
    this.props.onSubmitGroup(groupName)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Enter group name"
              autofocus className="sparrow-form-control"
              value={this.state.groupName}
              onChange={this.handleGroupChange}
            />
            <br/>
            <button className="ghost-button" type="submit" transform="uppercase">
            CREATE
            </button>
          </form>
          {this.state.message}
      </div>
    );
  }
}
