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

export default class ExpensesListContainer extends Component {
  constructor() {
    super();
    this.state = {
	  loading: true,
	  expenses: [],
	};
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
  }

  render() {

  	const userOwing = this.props.users.map((user)=>{
      return <tr>
               <td>Laundry</td>
               <td>{user.username.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '}</td>
               <td>40 bucks</td>
               <td>The gang</td>
               <td><Link to={'group/'+this.props.routeParams.id+'/editexpense'}><button className='small-ghost-button'>Edit</button></Link></td>
               <td><button className='small-ghost-button'>Delete</button></td>
             </tr>
    })

  	return(
  		<div>
  		<Link to={'group/'+this.props.routeParams.id+'/expenses'}><button className='ghost-button'>Back to Expenses</button></Link>

  		<div style={styles.container}>
  	      

  		  <h4>Expense History</h4>

  		  <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Paid By</th>
            <th>Amount</th>
            <th>For</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
          {userOwing}
        </table>

  		</div>
  		</div>
  		)
  }

}