import React, { PropTypes } from 'react'
export default function ExpensesHistory ({expenseHistory}) {

  const tableData = expenseHistory.map(({lender, lendee, amount, note})=>{
    return(
      <tr>
        <td >
          {lender.username}
        </td>
        <td >
          {lendee.username}
        </td>
        <td >
          {amount}
        </td>
        <td >
          {note}
        </td>
      </tr>
    )
  })
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Lender</th>
          <th>Lendee</th>
          <th>Amount</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {tableData}
      </tbody>
    </table>
  )
}