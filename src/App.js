import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMapReact from 'google-map-react';
import MapContainer from './map.js';
import escapeRegExp from 'escape-string-regexp'

class App extends Component {
  constructor(props){
        super(props);

        this.onMapClicked = this.onMapClicked.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);

        this.state = {
            venues: [],
            query: '',
            showingInfoWindow: false,
            showingInfoWindow2: true,
            activeMarker: {},
            selectedPlace: {},
            clickedMarker: []
          };
   };

  

onMarkerClick = (props, marker, e) => {
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });
console.log(marker)
}

onMapClicked = (props) => {
  if(this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }
};

nameClicked = (name, index) => {
  
  let markers = [...document.querySelectorAll('.gmnoprint')]
  
 
  if (document.querySelector('.Map-container')) {
      markers[0].click()
    }

  }

 updateQuery = (query) => {
      this.setState({query: query.trim()})
    }

//getting a list of venues from Foursquare API
  componentDidMount() {
  let setVenueState = this.setState.bind(this);
    const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';

    const params = {
      client_id: 'EYFRYSQHWJFPEUXT0PX234ZFD4L104ANCD0X5XN3IUZRTCWO', //Client ID obtained by getting developer access
      client_secret: 'KSN4AMJDTXS0BQBBWFKE1BR0PMJEIB1BJDZVXXGUAW3OTWMC', //Client Secret obtained by getting developer access
      limit: 10, //The max number of venues to load
      query: 'Pubs', //The type of venues we want to query
      v: '20130619', //The version of the API.
      ll: '53.1305,23.1592' //The latitude and longitude of Bialystok
    };

    fetch(venuesEndpoint + new URLSearchParams(params), {
      method: 'GET'
    }).then(response => response.json()).then(response => {
      setVenueState({venues: response.response.groups[0].items});

    console.log(this.state.venues);
    });
}


  render() {
    const { query } = this.state
    const { onMarkerClicked } = this.props
    

    let showingVenues
    if (query){
      const match = new RegExp(escapeRegExp(query), "i")
      showingVenues = this.state.venues.filter((venue) => match.test(venue.venue.name))
    } else {
      showingVenues = this.state.venues
    }

    return (
      <div className="main">
        <div className="sidebar">
            <h1>Bialystok Pubs</h1>
            <input className="filter" 
              type="text"
              placeholder="Filter pubs"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}/>
            
            <ul className="venueList">
              {showingVenues.map((venue, index) => (
                <li key={venue.venue.name} onClick={(event) => this.nameClicked(venue.venue.name, index)}>
                  {venue.venue.name}
                </li>
                ))
              }
            </ul>

        </div>
        <div className="navMap">
          <nav className="navbar"></nav>

          <MapContainer venues={showingVenues}
            onMapClicked={this.onMapClicked}
            onMarkerClick={this.onMarkerClick}
            activeMarker={this.state.activeMarker}
            showingInfoWindow={this.state.showingInfoWindow}
            showingInfoWindow2={this.state.showingInfoWindow2}
            selectedPlace={this.state.selectedPlace}
            clickedMarker={this.state.clickedMarker}
            nameClicked={this.nameClicked}
           />

        </div>
      </div>
    );


  }
}

export default App;
