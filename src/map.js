import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
/*import GoogleMapReact from 'google-map-react';*/
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Venues from './venues.js';
import Popup from './popup.js'

export class MapContainer extends Component {


/*static defaultProps = {
    center: {
      lat: 53.1305,
      lng: 23.1592
    },
    zoom: 15,
  };
*/
render() {
	const { nameClicked, onMapClicked,  onMarkerClick, activeMarker, showingInfoWindow, showingInfoWindow2, clickedMarker, selectedPlace } = this.props
	return (
		<div style={{width:'100%', position:'relative', height:'100%'}}>
			<Map 
				onClick={onMapClicked}
				google={this.props.google}
				zoom={15}
				style={{width: '100%', height: '94vh', position: 'relative'}}
				initialCenter={{
					lat: 53.1305,
					lng: 23.1592
				}}
				>

			{this.props.venues.map((venue) =>{
				return(
					<Marker
						onClick={onMarkerClick}
						className="markers"
						title={venue.venue.name}
						key={venue.venue.id}
						id={venue.venue.id}
						name={venue.venue.name}
						icon={{
		                    path: this.props.google.maps.SymbolPath.PIN,
		                    scale: 8
                  		}}
                  		 position={{
			                  lat: venue.venue.location.lat,
			                  lng: venue.venue.location.lng }}
			                  address={venue.venue.location.address}
			        />
					)
				})}
			
			<InfoWindow
				marker={activeMarker}
				visible={showingInfoWindow}>
				<div>
					<p><strong>{selectedPlace.name}</strong></p>
				</div>
			</InfoWindow>

			
			</Map>
			}
		</div>
	)
	}
}



export default GoogleApiWrapper({
	apiKey: "AIzaSyDjGO3zDO8nNZ7mITWIbesvVM7GSkTQfZs"
}) (MapContainer)
