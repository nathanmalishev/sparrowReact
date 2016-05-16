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
    background: 'rgb(0,0,0)',
    padding: '2px 6px',
    cursor: 'default',
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
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
      backgroundColor   : 'rgba(0, 0, 0, 0.5)',

    },
    content : {
      position                   : 'absolute',
      alignItems                 : 'center',
      textAlign                  : 'center',
      top                        : '40%',
      left                       : '10%',
      right                      : '10%',
      bottom                     : '40%',
      border                     : '1px solid #ccc',
      background                 : '#fff',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '2px',
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

        <row>

        <Autocomplete
          ref="autocomplete"
          height="44px"
          className='sparrow-form-control'
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
            >
              {item.username}
            </div>
          )}
        />

        <div className="divider" />

        <input
          type="submit"
          className='ghost-button'
          value="ADD"
          onClick={this.addUser.bind(this)}
        />

        </row>

        {
          this.state.message
        }

        <h2>Leave group</h2>
        <button className='ghost-button' style={styles.danger}
          onClick={this.openModal.bind(this)}>
          LEAVE GROUP
        </button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={styles.modal}>
          <p>After you leave a group, you won't be able to rejoin unless invited again.</p>
          <button className='ghost-button' onClick={this.closeModal.bind(this)}>Close</button>
          <button className='ghost-button' style={styles.danger} onClick={this.onLeaveGroup.bind(this)}>
            Leave
            </button>
        </Modal>
      </div>
    );
  }
}
