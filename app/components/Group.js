import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router'

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    // color: 'black',
    width:'80%',
    backgroundColor:'grey'
  },
  destinations: {
    display:'flex',
    flexDirection:'column',
    margin:'20px 20px',
    backgroundColor:'lightgrey'
  },
  container:{
    height: '100%',
    width: '100%',
    display:'flex',
    flexDirection:'row'

  }
};


class Group extends Component{


  render(){
    const listDestinations = this.props.destinations.map((elem)=>{
      if(elem._id === this.props.currentDestination._id){
        return <li key={elem._id} style={{color:'red'}}>{elem.name}</li>
      }else{
        return <li key={elem._id}>{elem.name}</li>
      }
    })
    console.log(this.props.routeParams, 'props')
    return (
      <div>
      <h1>{this.props.groupName}</h1>
      <div style={styles.container}>
          <div style={styles.destinations}>
            {listDestinations}
          </div>
          <div style={styles.header}>
            <Link to={'group/'+this.props.routeParams.id+'/flights'}>
              Flights
            </Link>
            <p>Hotels</p>
            <p>Itinerary</p>
            <p>Chat</p>
            <p>Expenses</p>
          </div>
      </div>
      </div>
    )
  }
}


export default Group