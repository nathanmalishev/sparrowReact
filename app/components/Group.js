import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router'

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    color: '#fff',
    backgroundColor: '#3CBBE6',
  },
};

class Group extends Component{


  render(){
    const listDestinations = this.props.destinations.map(function(elem){
      return <li key={elem._id}>{elem.name}</li>
    })
    console.log(this.props.routeParams, 'props')
    return (
      <div>
      <h1>{this.props.groupName}</h1>
        <div style={styles.header}>
          {listDestinations}
          <Link to={'group/'+this.props.routeParams.id+'/flights'}>
            Flights
          </Link>
          <p>Hotels</p>
          <p>Itinerary</p>
          <p>Chat</p>
          <p>Expenses</p>
        </div>
      </div>
    )
  }
}


export default Group