import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete'
import {getUsernames, postUser} from '../helpers/api'
import _ from 'lodash'

export let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  },
  container:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    margin:'auto'
  }
}




export default class SettingsContainer extends Component {

  constructor(){
    super();
    this.state= {
      usernames: [],
      value: '',
      loading: false,
      message: ''
    }
  }

  componentDidMount(){
    let newUsers = []
    getUsernames()
      .then((res)=>{

        res.data.map((Nuser)=>{
          newUsers.push(Nuser)
        })

        this.props.users.map((user)=>{
          newUsers.map((Nuser)=>{
            if(user._id === Nuser._id){
              _.pull(newUsers, Nuser)
            }
          })
        })
        this.setState({
          usernames: newUsers
        })
      })

  }

  addUser(e){
    e.preventDefault();
    const selectedUser = this.state.value;
    let fullUser = {};
    if(!selectedUser){
      return
    }
    this.state.usernames.map((user)=>{
      if (user.username === selectedUser) {
        fullUser = user
      }
    })


    postUser(this.props.params.id, fullUser)
      .then((res)=>{
        console.log(res)

        //lets remove user from state
        const newUsers = this.state.usernames.map((user)=>{
            if(user.username !== fullUser.username){
              return user
            }
        })

        //make api call to add to group
        this.setState({
          message:'Successfully added to the group',
          usernames: _.compact(newUsers),
          value: ''
        })
      })
      .catch((res)=>{
        this.setState({
          message:'There was an error, user not added to group'
        })
      })


  }

  render() {
    console.log(this.state.value)
    return (
      <div style={styles.container}>

      <label htmlFor="">Select User</label>
      <Autocomplete
          ref="autocomplete"
          value={this.state.value}
          items={this.state.usernames}
          getItemValue={(item) => item.username}
          onChange={(event, value) => this.setState({ value })}
          onSelect={value => this.setState({ value })}
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.abbr}
              id={item.abbr}
            >{item.username}</div>
          )}
        />

            <input
              type="submit"
              className='ghost-button'
              value="Add"
              onClick={this.addUser.bind(this)}
            />

        {
          this.state.message
        }

      </div>
    );
  }
}
