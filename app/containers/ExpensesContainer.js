import React, { Component } from 'react';
import {Link} from 'react-router'
import {getExpenses,putExpenses,deleteExpense} from '../helpers/api'
import {RenderRow} from '../components/expenseComponents'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    color: 'black',
  },
  buttons:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  active: {
    backgroundColor: '#2ecc71',
    border: '2px solid black',
    color: 'ghostwhite',
  }
};




export default class ExpensesContainer extends Component {
  constructor() {
    super();
    this.state = {
  	  isLoading: true,
      expenses:[],
      displaySettled:false
  	};
  }

  handleDisplaySettled(){
    console.log('handle settled')
    this.setState({
      displaySettled: !this.state.displaySettled
    })
  }

  componentDidMount(){
    console.log(this.props)
    getExpenses(this.props.params.id)
      .then((res)=>{
        this.setState({
          expenses: res.data,
          isLoading:false
        })
      })
  }

  handleSettle(expense){
    console.log('clicked on settle!')
    const newExpenses = this.state.expenses.map((oldExpense)=>{
      if(JSON.stringify(oldExpense) === JSON.stringify(expense)){
        return  _.merge(oldExpense, {settled:!oldExpense.settled})
      }else{
        return oldExpense
      }
    })


    putExpenses(this.props.params.id, newExpenses)
      .then((res)=>{
        this.setState({
          expenses: res.data.expenses
        })
      })
  }

  handleDelete(expense){
    console.log('being deleted', expense)
    deleteExpense(this.props.params.id, expense)
      .then((res)=>{
        this.setState({
          expenses: res.data.expenses
        })
      })
  }


  render() {


    let userOwingRow = this.state.expenses.map((expense)=>{
      if(expense.settled === true && !this.state.displaySettled){
        return false
      }
      return <RenderRow expense={expense} onSettle={this.handleSettle.bind(this,expense)} onDelete={this.handleDelete.bind(this,expense)}/>
    })
    userOwingRow = _.compact(userOwingRow)
    // const userOwing = this.props.users.map((user)=>{
    //   return <tr>
    //            <td>{user.username.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '}</td>
    //            <td>Nathan 40 bucks</td>
    //            <td><button className='small-ghost-button'>Settle up</button></td>
    //          </tr>
    // })
  	return(
  		<div style={styles.container}>
        <div style={styles.buttons}>
        <Link to={'group/'+this.props.params.id+'/newexpense'}><button className='ghost-button'>Create New Expense</button></Link>

        {
          this.state.displaySettled === true
          ? <button className='ghost-button' style={styles.active} onClick={this.handleDisplaySettled.bind(this)}>Expenses History</button>
          : <button className='ghost-button' onClick={this.handleDisplaySettled.bind(this)}>Expenses History</button>
        }
        </div>
        <br/>
        <br/>
        <h4>Current Owings</h4>
        <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Owes</th>
            <th>Amount</th>
            <th colSpan="2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.isLoading === true
          ? <th>Loading</th>
          : userOwingRow
        }
        </tbody>
        </table>
        <br/>
        <br/>
  		</div>
  		)
  }

}
// =======
//       fee: '',
//       paidby: {},
//       loading: true,
//       involved: [],
//       expenses: [],
//       note: ''
//     };
//     this.handleFeeChange = this.handleFeeChange.bind(this);
//     this.handlePaidByChange = this.handlePaidByChange.bind(this);
//     this.handleInvolved = this.handleInvolved.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleFeeChange(e) {
//     this.setState({ fee: e.target.value });
//   }

//   handlePaidByChange(e) {
//     this.setState({
//       paidby: JSON.parse(e.target.value),
//     });
//   }

//   handleInvolved(e) {
//     var input = e.target;
//     if (input.checked) {
//       this.setState({
//           involved: this.state.involved.concat(JSON.parse(input.value)),
//         });
//     }else {

//       var newInv = this.state.involved.slice();
//       newInv.splice(input.value, 1);
//       this.setState({ involved: newInv });
//     }

//     ;
//   }

//   componentDidMount(){
//     getExpenses(this.props.params.id)
//       .then((res)=>{
//         this.setState({
//           expenses: res.data
//         })
//       })
//   }

//   handleNoteChange(e) {
//     this.setState({ note: e.target.value });
//   }

//   handleSubmit(e) {
//     e.preventDefault();

//     if (!this.state.fee || !this.state.paidby.username ||
//         !this.state.involved[0]) {
//       return;
//     }

//     if (isNaN(this.state.fee)) {
//       return;
//     }
//     // we have an array of people involved
//     // going to split up so its
//     // x owes y , x owes z, x owes a
//     // rather than x owes y,z,a
//     // we assume equal split
//     const splitBill = Math.round(this.state.fee / this.state.involved.length);
//     const transaction = this.state.involved.map((user)=> {
//       return {
//         lender: this.state.paidby,
//         lendee: user,
//         amount: splitBill,
//         note: this.state.note
//       };
//     });
//     postExpenses(this.props.params.id, transaction)
//       .then((res)=> {
//         this.setState({
//           expenses: res.data.expenses,
//         });
//       })
//       .catch((err)=> {
//         console.log(err);
//       });

//   }

//   render() {

//     const userList = this.props.users.map((user)=> {
//       return <option value={JSON.stringify(user)} key={user._id}>
//               {user.username.replace(/\w\S*/g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '}
//             </option>;
//     });
//     const userCheck = this.props.users.map((user)=> {
//       if (JSON.stringify(user) === JSON.stringify(this.state.paidby)) {
//         return;
//       }

//       return (
//          <div key={user._id}>
//           <p key={user._id}>
//           <input
//              key={user._id}
//              type="checkbox"
//              value={JSON.stringify(user)}
//              onChange={this.handleInvolved}
//            />
//           {user.username}
//           </p>
//         </div>
//        );
//     });
//     return (
//       <div>
//         <p>Gday</p>
//                <form onSubmit={this.handleSubmit}>
//                    Who paid?
//                    <select
//                       onChange={this.handlePaidByChange}>
//                      <option value='0' key='0'>
//                       Select a user
//                       </option>
//                      {userList}
//                    </select>
//                    How much?
//                    <input
//                       type="text"
//                       value={this.state.fee}
//                       onChange={this.handleFeeChange}/>
//                   note
//                   <input
//                     type="text"
//                     onChange={this.handleNoteChange.bind(this)}
//                     value={this.state.note}
//                   />
//                    <div>
//                      Who was involved?
//                      {userCheck}
//                    </div>

//                    <input type="submit" value="Post" />
//                </form>


//             <ExpensesHistory expenseHistory={this.state.expenses}/>

//       </div>);
//   }
// }

// >>>>>>> master
