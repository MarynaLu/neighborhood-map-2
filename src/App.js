import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './map.js';
import escapeRegExp from 'escape-string-regexp'

class App extends Component {
  constructor(props){
        super(props);

        this.onMapClicked = this.onMapClicked.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.infoWindowClosed = this.infoWindowClosed.bind(this);

        this.state = {
            venues: [],
            query: '',
            venueName: '',
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            animation: 0
            
          };
   };

  allMarkers = [];
  addMarker = marker => {
    if (marker) {
      this.allMarkers.push(marker);
      //add tab index
      this.allMarkers.map(marker => marker.tabIndex = "-1");
      this.allMarkers.map(marker => marker.role = "button");
      this.allMarkers.map(marker => marker.ariaLabel = marker.props.name);
      console.log(this.allMarkers);
      console.log(marker);
    }
  };


onMarkerClick = (props, marker, e) => {
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
    animation: 1
  });
}

onMapClicked = (props) => {
  if(this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      animation: 0
      /*activeMarker: null*/
    })
  }
};

nameClicked = (event) => {
  const clicked = this.allMarkers.filter(
      el => el.marker.name === event.target.textContent
    );

  this.setState({
    /*activeMarker: this.allMarkers[index].marker,*/
      activeMarker: clicked[0].marker,
      showingInfoWindow: true,
      animation: 1
    })
  }

infoWindowClosed = () => {
  console.log("closed");
  this.setState({
    animation: 0,
    showingInfoWindow: false
  });
};

  showNav = (event) => {
    
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var navMap = document.getElementsByClassName('navMap')[0];
    sidebar.classList.toggle("open");
  }
  

 updateQuery = (query) => {
      this.setState(
        {query: query.trim(),

        })
    }

//getting a list of venues from Foursquare API
  componentDidMount() {
  let setVenueState = this.setState.bind(this);
    const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';

    const params = {
      client_id: 'EYFRYSQHWJFPEUXT0PX234ZFD4L104ANCD0X5XN3IUZRTCWO', //Client ID obtained by getting developer access
      client_secret: 'KSN4AMJDTXS0BQBBWFKE1BR0PMJEIB1BJDZVXXGUAW3OTWMC', //Client Secret obtained by getting developer access
      limit: 10, //The max number of venues to load
      query: 'Restaurants', //The type of venues we want to query
      v: '20130619', //The version of the API.
      ll: '53.1305,23.1592' //The latitude and longitude of Bialystok
    };

    fetch(venuesEndpoint + new URLSearchParams(params), {
      method: 'GET'
    }).then(response => response.json()).then(response => {
      setVenueState({venues: response.response.groups[0].items});
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
            <h1>Bialystok Restaurants</h1>
            <p id="foursquare">Data from <a href="https://foursquare.com">Foursquare</a></p>
            <input className="filter" 
              type="text"
              placeholder="Filter restaurants"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}/>
            
            <ul className="venueList">
              {showingVenues.map((venue, index) => (
                <li key={venue.venue.name}
                aria-label={venue.venue.name}
                role="button"
                tabIndex="0"
                onClick={(event) => this.nameClicked(event)}>
                  {venue.venue.name}
                </li>
                ))
              }
            </ul>
        </div>

        <div className="navMap">
          <nav className="navbar">
            <i onClick={(event) => this.showNav(event)} id="bars" className="fas fa-bars fa-2x"></i>
          </nav>

          <MapContainer venues={showingVenues}
            onMapClicked={this.onMapClicked}
            onMarkerClick={this.onMarkerClick}
            activeMarker={this.state.activeMarker}
            activeMarker2={this.state.activeMarker2}
            showingInfoWindow={this.state.showingInfoWindow}
            showingInfoWindow2={this.state.showingInfoWindow2}
            selectedPlace={this.state.selectedPlace}
            clickedMarker={this.state.clickedMarker}
            nameClicked={this.nameClicked}
            addMarker={this.addMarker}
            venueName={this.state.venueName}
            appState={this.state}
            infoWindowClosed={this.infoWindowClosed}
           />
        </div>
      </div>
    );


  }
}

export default App;
