import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMapReact from 'google-map-react';
import Venues from './venues.js';
import Popup from './popup.js'

class Map extends Component {
state = {
}

static defaultProps = {
    center: {
      lat: 53.1305,
      lng: 23.1592
    },
    zoom: 15,
  };


 render() {
 	let markers, popups;
 	if(this.props.venues !== null && this.props.venues !== undefined){
 		markers = this.props.venues.map(function(venue){
 			return(
 				<Venues
 					key={venue.venue.id}
 					lat={venue.venue.location.lat}
 					lng={venue.venue.location.lng}
 					name={venue.venue.name}
 					address={venue.venue.location.address}
 				>
 				</Venues>
 			)
 		})
 	}
	

    return (
       <div id="map" style={{ height: '95vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDjGO3zDO8nNZ7mITWIbesvVM7GSkTQfZs'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
		{markers}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
