import React, { Component } from 'react';

export default class ExpensesContainer extends Component {
  constructor() {
    super();
    this.state = {
      fee: '',
	  paidby: '',
	  loading: true,
	  involved: [],
	};
	this.handleFeeChange = this.handleFeeChange.bind(this)
	this.handlePaidByChange = this.handlePaidByChange.bind(this)
	this.handleInvolved = this.handleInvolved.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
  	  <div>
        <p>Gday</p>
               <form onSubmit={this.handleSubmit}>
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
                   <div>
                     Who was involved?
                     {userCheck}
                   </div>
                   <input type="submit" value="Post" />
               </form>

  	  </div>)
  }
}