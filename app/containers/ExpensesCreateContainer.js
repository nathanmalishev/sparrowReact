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
      desc: '',
      fee: '',
	  paidby: '',
	  loading: true,
	  involved: [],
	};
	this.handleDescChange = this.handleDescChange.bind(this)
	this.handleFeeChange = this.handleFeeChange.bind(this)
	this.handlePaidByChange = this.handlePaidByChange.bind(this)
	this.handleInvolved = this.handleInvolved.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleDescChange(e){
    this.setState({ desc: e.target.value });
  }

  handleFeeChange(e){
    this.setState({ fee: e.target.value });
  }

  handlePaidByChange(e){
    this.setState({ paidby: e.target.value });
  }

  handleInvolved(e){
  	var input = e.target;
  	if (input.checked) {
  		this.setState({ involved: this.state.involved.concat([{id: input.value}])})
  		
  	} else {
  		var newInv = this.state.involved.slice();
  		newInv.splice(input.value, 1);
  		this.setState({involved: newInv});
  	}
  	;
  }

  handleSubmit(e){
  	console.log(this.state.paidby, "Paiddddd")
  	console.log(this.state.fee, "feeeeeeee")
  	console.log(this.state.involved, "payusup")
  	console.log(this.state.desc, "This expense is")
  }

 

  render() {
  	console.log(this.props.users, "users")
  	
  	const userList = this.props.users.map((user)=>{
    return <option value={user._id}>{user.username.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '}</option>
  })
  	const userCheck = this.props.users.map((user)=>{
  	return <input 
  	         type="checkbox" 
  	         value={user._id} 
  	         onChange={this.handleInvolved}>
  	         {user.username.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '}
  	         </input>
  })
  	return (
  	  <div style={styles.container}>
  	    <Link to={'group/'+this.props.routeParams.id+'/expenses'}><button className='ghost-button'>Back to Expenses</button></Link>
  	    <h4>Create a new expense</h4>
  	    <form onSubmit={this.handleSubmit}>
  	    	Description:
  	    	<input
              type="text"
              value={this.state.desc}
              onChange={this.handleDescChange}/>
  	        Who paid?
  	        <select
  	          onChange={this.handlePaidByChange}>
  	          <option value='0'>Please select user</option>
  	          {userList}
  	        </select>
  	        How much?
  	        <input
              type="text"
              value={this.state.fee}
              onChange={this.handleFeeChange}/>
            <div style={styles.container}>
              Who was involved?
              {userCheck}
            </div>
            <input type="submit" className='ghost-button' value="Submit Expense" />
  	    </form>

  	  </div>)
  }
}
