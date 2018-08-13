import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
/*import GoogleMapReact from 'google-map-react';*/
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


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
	const {nameClicked, onMapClicked,  infoWindowClosed, onMarkerClick, addMarker, activeMarker, venueName, showingInfoWindow, clickedMarker, selectedPlace } = this.props
	return (
		<div aria-hidden="true" style={{width:'100%', position:'relative', height:'100%'}}>
			<Map 
				onClick={onMapClicked}
				google={this.props.google}
				zoom={15}
				style={{width: '100%', height: '100vh', position: 'relative'}}
				initialCenter={{
					lat: 53.1305,
					lng: 23.1592
				}}
				>

			{this.props.venues.map((venue) =>{
				return(
					<Marker
						onClick={onMarkerClick}
						aria-hidden="true"
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
			            	ref={addMarker}
			    			animation={
			             		venue.venue.name === this.props.appState.activeMarker.name
			             		? this.props.appState.animation
			             		: null
			             	}
			        />
					)
				})}
			
			<InfoWindow
				aria-hidden="true"
				marker={activeMarker}
				visible={showingInfoWindow}
				onClose={infoWindowClosed}
				>
				<div>
					<p><strong>{this.props.appState.activeMarker.name}</strong></p>
					<p>{this.props.appState.activeMarker.address? this.props.appState.activeMarker.address : "no adress available"}</p>
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
