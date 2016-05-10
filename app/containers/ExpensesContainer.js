import React, { Component } from 'react';

export default class ExpensesContainer extends Component {
  constructor() {
    super();
    this.state = {
      fee: '',
      paidby: {},
      loading: true,
      involved: [],
    };
    this.handleFeeChange = this.handleFeeChange.bind(this);
    this.handlePaidByChange = this.handlePaidByChange.bind(this);
    this.handleInvolved = this.handleInvolved.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFeeChange(e) {
    this.setState({ fee: e.target.value });
  }

  handlePaidByChange(e) {
    this.setState({
      paidby: JSON.parse(e.target.value),
    });
  }

  handleInvolved(e) {
    var input = e.target;
    if (input.checked) {
      this.setState({
          involved: this.state.involved.concat(JSON.parse(input.value)),
        });
    }else {

      console.log(this.state.involved.slice());
      var newInv = this.state.involved.slice();
      newInv.splice(input.value, 1);
      console.log(newInv);
      this.setState({ involved: newInv });
    }

    ;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.fee || !this.state.paidby.username ||
        !this.state.involved[0]) {
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
    const splitBill = this.state.fee / this.state.involved.length;
    const transaction = this.state.involved.map((user)=> {
      return {
        lender: this.state.paidby._id,
        lendee: user._id,
        amount: splitBill,
      };
    });
    console.log('transaction',transaction);

  }

  render() {

    const userList = this.props.users.map((user)=> {
      return <option value={JSON.stringify(user)} key={user._id}>
              {user.username.replace(/\w\S*/g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '}
            </option>;
    });
    const userCheck = this.props.users.map((user)=> {
      if (JSON.stringify(user) === JSON.stringify(this.state.paidby)) {
        return;
      }

      return (
         <div key={user._id}>
          <p key={user._id}>
          <input
             key={user._id}
             type="checkbox"
             value={JSON.stringify(user)}
             onChange={this.handleInvolved}
           />
          {user.username}
          </p>
        </div>
       );
    });
    return (
      <div>
        <p>Gday</p>
               <form onSubmit={this.handleSubmit}>
                   Who paid?
                   <select
                      onChange={this.handlePaidByChange}>
                     <option value='0' key='0'>
                      Select a user
                      </option>
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

            {JSON.stringify(this.props.expenses)}

      </div>);
  }
}
