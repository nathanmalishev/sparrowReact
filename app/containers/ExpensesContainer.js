import React, { Component } from 'react';
import {Link} from 'react-router'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    color: 'black',
  },
};

export default class ExpensesContainer extends Component {
  constructor() {
    super();
    this.state = {
	  loading: true,
	};
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
  }

  render() {

    const userList = this.props.users.map((user)=>{
    return <option value={user._id}>{user.username.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '}</option>
    })
    const userOwing = this.props.users.map((user)=>{
      return <tr>
               <td>{user.username.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '}</td>
               <td>Owes Nathan 40 bucks</td>
               <td><button className='small-ghost-button'>Settle up</button></td>
             </tr>
    })
  	return(
  		<div style={styles.container}>
        <Link to={'group/'+this.props.routeParams.id+'/newexpense'}><button className='ghost-button'>Create New Expense</button></Link>
        <br/>
        <br/>
        <h4>Current Owings</h4>
        <table>
          {userOwing}
        </table>
        <br/>
        <br/>
        <Link to={'group/'+this.props.routeParams.id+'/expenseshistory'}><button className='ghost-button'>Expenses History</button></Link>
  		</div>
  		)
  }

}
