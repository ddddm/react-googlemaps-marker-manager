import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import Marker from './Marker';

class MarkerManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [
        {
          lat: 59.938043,
          lng: 30.337157
        }
      ]
    }

    this.createMarker = this.createMarker.bind(this);

  }

  createMarker({ x, y, lat, lng, event }) {
    this.setState( state => {
      state.markers.push( { lat, lng } )
    })
  }

  render() {
    const markers = this.state.markers;

    return (
      <GoogleMap
        onClick={this.createMarker}
        center={{lat: 59.938043, lng: 30.337157}}
        zoom={9} >
        { markers.map( (marker, index) => {
          return ( <Marker key={index} lat={marker.lat} lng={marker.lng} />  )
        } ) }
      </GoogleMap>
    );
  }
}

export default MarkerManager;
