import React, { Component } from 'react';
import {Link} from 'react-router'
import {postExpenses, getGroup} from '../helpers/api'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    color: 'black',
  },
};

export default class ExpensesCreateContainer extends Component {
  constructor() {
    super();
    this.state = {
      desc: '',
      fee: '',
  	  paidby: '',
  	  involved: [],
      createSuccess:false,
      users: []
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

  handlePaidByChange(e) {
    this.setState({
      paidby: JSON.parse(e.target.value),
    });
  }

  handleInvolved(e){
  	var input = e.target;
    if (input.checked) {
      this.setState({
          involved: this.state.involved.concat(JSON.parse(input.value)),
        });
    }else {

      var newInv = this.state.involved.slice();
      newInv.splice(input.value, 1);
      this.setState({ involved: newInv });
    }
  }

  componentDidMount(){
    this.setState({
      users: this.props.users
    })
    getGroup(this.props.params.id)
      .then((res)=>{
        console.log(res)
        this.setState({
          users: res.data.group.users
        })
      })
  }

  handleSubmit(e){
    e.preventDefault();

    if (!this.state.fee || !this.state.paidby.username || !this.state.involved[0]) {
      return;
    }

    if (isNaN(this.state.fee)) {
      return;
    }
    // we have an array of people involved
    // going to split up so its
    // x owes y , x owes z, x owes a
    // rather than x owes y,z,a
    // we assume equal split
    const splitBill = Math.round(this.state.fee / this.state.involved.length);
    let transaction = this.state.involved.map((user)=> {
      if(JSON.stringify(user) === JSON.stringify(this.state.paidby)){
        return false;
      }
      return {
        lender: this.state.paidby,
        lendee: user,
        amount: splitBill,
        desc: this.state.desc,
        settled:false
      };
    });

    //if the transaction only involves themself do not save
    transaction = _.compact(transaction);
    if(transaction.length === 0){return}
    postExpenses(this.props.params.id, transaction)
      .then((res)=> {
        this.setState({
          createSuccess:true,
        });
        setTimeout(()=>{
          this.props.history.pushState(null, `group/${this.props.params.id}/expenses`)}
          , 300)
      })
      .catch((err)=> {
        console.log(err);
      });

  }



  render() {
  	const userList = this.state.users.map((user)=>{
      return (
        <option key={user._id} value={JSON.stringify(user)}>
          {user.username.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '}
        </option>
        )
    })
  	const userCheck = this.state.users.map((user)=>{
  	return (
        <div key={user._id}>
         <p key={user._id}>
          <input
             key={user._id}
  	         type="checkbox"
  	         value={JSON.stringify(user)}
  	         onChange={this.handleInvolved}/>
  	         {user.username.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '}
         </p>
        </div>
         )
  })
  	return (
  	  <div>
  	  <Link to={'group/'+this.props.params.id+'/expenses'}><button className='ghost-button'>Back to Expenses</button></Link>
  	  <div style={styles.container}>
  	    <form onSubmit={this.handleSubmit}>
  	      <fieldset>
  	        <legend>Create a new expense</legend>
  	    	Description:
  	    	<input
              type="text"
              autofocus className="sparrow-form-control"
              value={this.state.desc}
              onChange={this.handleDescChange}/>
  	        Who paid?
  	        <select
  	          autofocus className="sparrow-form-control"
  	          onChange={this.handlePaidByChange}>
  	          <option value='0'>Please select user</option>
  	          {userList}
  	        </select>
  	        How much?
  	        <input
              type="number"
              min="0.01"
              step="0.01"
              value={this.state.fee}
              autofocus className="sparrow-form-control"
              onChange={this.handleFeeChange}/>
              Who was involved?
            <div>

              {userCheck}
            </div>
            <input type="submit" className='ghost-button' value="Submit Expense" />
          </fieldset>
  	    </form>

        {
          this.state.createSuccess === true
          ? <p>Successfully created!</p>
          : <p></p>
        }

  	  </div>
  	  </div>)
  }
}
