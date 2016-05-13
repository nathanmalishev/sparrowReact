import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router'
import Destination from './Destination'
import { logout } from '../helpers/auth';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    // color: 'black',
    width:'80%',
    // backgroundColor:'grey'
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
        return <li onClick={this.props.onDestinationClick.bind(this,elem)} key={elem._id}>{elem.name}</li>
      }
    })
    console.log(this.props.routeParams, 'props')
    return (
      <div>
        <h1 className="text-nowrap text-center">{this.props.groupName}</h1>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand navbar-link" href="#">
                Sparrow
              </a>
            </div>

            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="nav navbar-nav navbar-right">
                <li role="presentation"><Link to={'group/'+this.props.routeParams.id+'/flights'}>Flights</Link></li>
                <li role="presentation"><Link to={'group/'+this.props.routeParams.id+'/hotels'}>Hotels</Link></li>
                <li role="presentation"><Link to={'group/'+this.props.routeParams.id+'/itin'}>Itinerary</Link></li>
                <li role="presentation"><Link to={'group/'+this.props.routeParams.id+'/chat'}>Chat</Link></li>
                <li role="presentation"><Link to={'group/'+this.props.routeParams.id+'/expenses'}>Expenses</Link></li>
                <li role="presentation"><a onClick={logout}>Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}


export default Group

// TO-DO: Make navbar repsonosive for all screensizes - collapsable
// TO-DO: Make onClick have hover for usability - logout button

// <div style={styles.container}>
//           <div style={styles.destinations}>
//             {listDestinations}
//           </div>
//           <div style={styles.header}>
//             <Link to={'group/'+this.props.routeParams.id+'/flights'}>
//               Flights
//             </Link>
//             <p>Hotels</p>
//             <p>Itinerary</p>
//             <p>Chat</p>
//             <p>Expenses</p>
//           </div>
//       </div>