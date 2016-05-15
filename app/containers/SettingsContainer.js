import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import { getUsernames, postUser,deleteUser } from '../helpers/api';
import _ from 'lodash';
var Modal = require('react-modal');

export let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default',
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default',
  },

  menu: {
    border: 'solid 1px #ccc',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
  },
  danger: {
    backgroundColor: '#e74c3c',
  },
  modal:{
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(255, 255, 255, 0.75)',

    },
    content : {
      position                   : 'absolute',
      top                        : '120px',
      left                       : '120px',
      right                      : '120px',
      bottom                     : '120px',
      border                     : '1px solid #ccc',
      background                 : '#fff',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '4px',
      outline                    : 'none',
      padding                    : '20px',
      fontSize                   : '20px'
  }
  }
};

export default class SettingsContainer extends Component {

  constructor() {
    super();
    this.state = {
      usernames: [],
      value: '',
      loading: false,
      message: '',
      modalIsOpen:false
    };
  }

  componentDidMount() {
    let newUsers = [];
    getUsernames()
      .then((res)=> {

        res.data.map((Nuser)=> {
          newUsers.push(Nuser);
        });

        this.props.users.map((user)=> {
          newUsers.map((Nuser)=> {
            if (user._id === Nuser._id) {
              _.pull(newUsers, Nuser);
            }
          });
        });
        this.setState({
          usernames: newUsers,
        });
      });

  }

  addUser(e) {
    e.preventDefault();
    const selectedUser = this.state.value;
    let fullUser = {};
    if (!selectedUser) {
      return;
    }

    this.state.usernames.map((user)=> {
      if (user.username === selectedUser) {
        fullUser = user;
      }
    });

    postUser(this.props.params.id, fullUser)
      .then((res)=> {
        console.log(res);

        //lets remove user from state
        const newUsers = this.state.usernames.map((user)=> {
            if (user.username !== fullUser.username) {
              return user;
            }
          });

        //make api call to add to group
        this.setState({
          message: 'Successfully added to the group',
          usernames: _.compact(newUsers),
          value: '',
        });
      })
      .catch((res)=> {
        this.setState({
          message: 'There was an error, user not added to group',
        });
      });

  }

  leave(e){
    e.preventDefault();
    alert('Leaving a group is ireversible')
    console.log('a')
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  onLeaveGroup(){
    deleteUser(this.props.params.id)
      .then((res)=>{
        this.closeModal();
        this.props.history.pushState(null, '/');
      })
  }


  render() {
    console.log(this.state.value);
    return (
      <div style={styles.container}>
      <h2>Add users to group</h2>
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


        <h2>Leave group</h2>
        <button className='ghost-button' style={styles.danger}
          onClick={this.openModal.bind(this)}>
          Leave Group
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={styles.modal}>
        <p>After you leave a group someone needs to invite you back</p>
        <button className='ghost-button' onClick={this.closeModal.bind(this)}>Close</button>
        <button className='ghost-button' style={styles.danger} onClick={this.onLeaveGroup.bind(this)}>
          Leave
        </button>
        </Modal>

      </div>
    );
  }
}
