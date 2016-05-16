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

//Expenses container handles fetching expenses and decieding what to render
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
    this.setState({
      displaySettled: !this.state.displaySettled
    })
  }

  componentDidMount(){
    getExpenses(this.props.params.id)
      .then((res)=>{
        this.setState({
          expenses: res.data,
          isLoading:false
        })
      })
  }

  handleSettle(expense){
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
            <th>Lender</th>
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
          ? <td>Loading</td>
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
