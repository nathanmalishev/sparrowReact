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

  handleSubmit(e){
  }

  render() {

  	// const userOwing = this.props.users.map((user)=>{
   //    return <tr>
   //             <td>Laundry</td>
   //             <td>{user.username.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '}</td>
   //             <td>40 bucks</td>
   //             <td>The gang</td>
   //             <td><button className='small-ghost-button'>Delete</button></td>
   //           </tr>
   //  })
  const userOwingRow = this.props.expenses.map((expense)=>{
      return (
              <tr>
                <td>{expense.lender.username}</td>
                <td>{expense.lendee.username}</td>
                <td>{expense.amount}</td>
                <td>{expense.settled === true ? 'settled' : 'owing'}</td>
                <td>
                <button className='small-ghost-button' onClick={this.settleUp.bind(this,expense)}>
                  Settle up
                  </button>
                </td>
              </tr>
              )
    })

  	return(
  		<div>
  		<Link to={'group/'+this.props.params.id+'/expenses'}><button className='ghost-button'>Back to Expenses</button></Link>

  		<div style={styles.container}>


  		  <h4>Expense History</h4>

  		  <table className="table">
        <thead>
          <tr>
            <th>Owed</th>
            <th>From</th>
            <th>Amount</th>
            <th>Settled</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

        </tbody>
        </table>

  		</div>
  		</div>
  		)
  }

}