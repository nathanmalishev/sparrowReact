import React, { PropTypes, Component } from 'react'

const styles = {
  chatinp:{
    float:'left',
    width:'calc(100% - 100px)',
    borderRadius: '5px',
  }
}

//renders just the chat input
export default class ChatInput extends Component {

  constructor(){
    super();
    this.state = {
      message: ''
    }
  }

  handleChange(e){
    this.setState({
      message: e.target.value
    })
  }

  onClickSubmit(e){
    e.preventDefault();
    this.props.onSubmit(this.state.message)
    this.setState({
      message: ''
    })
  }


  render(){
    return (
      <div>
      <form>
        <input
          type="text" autofocus
          className="sparrow-form-control"
          style={styles.chatinp}
          value={this.state.message}
          onChange={this.handleChange.bind(this)}
        />
        <input
          type="submit"
          className='send-ghost-button'
          value='Send'
          onClick={this.onClickSubmit.bind(this)}
        />
      </form>
      </div>
    )
  }

}