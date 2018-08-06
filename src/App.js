import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMapReact from 'google-map-react';
import Map from './map.js';
import escapeRegExp from 'escape-string-regexp'

class App extends Component {

  state = {
    venues: [],
    query: ''
  };

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
              {showingVenues.map(venue => (
                <li key={venue.venue.name}>
                  {venue.venue.name}
                </li>
                ))
              }
            </ul>

        </div>
        <div className="navMap">
          <nav className="navbar"></nav>

          <Map venues={showingVenues} />

        </div>
      </div>
    );


  }
}

export default App;
