import React from 'react'

const styles = {
  button:{
    width:'100px'
  },
  delete:{
    backgroundColor:'#e74c3c'
  },
  settle:{
    backgroundColor:'#2ecc71'
  }
}

export function RenderRow({expense,onSettle,onDelete}){

  function calcTR(settled){
    if(settled){
      return 'success'
    }else{
      return ''
    }
  }

  function calcSettleWord(settled){
    if(settled){
      return 'Unsettle'
    }else{
      return 'Settle Up'
    }
  }

  return (
    <tr className={calcTR(expense.settled)}>
      <td>{expense.lender.username}</td>
      <td>{expense.lendee.username}</td>
      <td>{expense.amount}</td>
      <td style={styles.button}>
        <button className='small-ghost-button' style={styles.settle} onClick={onSettle}>
          {calcSettleWord(expense.settled)}
        </button>
      </td>
      <td style={styles.button}>
        <button className='small-ghost-button' style={styles.delete} onClick={onDelete}>
          Delete
        </button>
      </td>
    </tr>
  )
}