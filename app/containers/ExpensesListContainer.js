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
      return <li>
               {user.username.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '}
               paid 40 bucks for dinner
               Edit
               delete
             </li>
    })

  	return(
  		<div style={styles.container}>
  	      <Link to={'group/'+this.props.routeParams.id+'/expenses'}><button className='ghost-button'>Back to Expenses</button></Link>

  		  This is the list of expenses ya drongo


  		</div>
  		)
  }

}
