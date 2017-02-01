import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import uuid from 'uuid/v4'
import Marker from './Marker';
import MarkerForm from './MarkerForm';

const apiKey = "AIzaSyDLQ6IpazZO3YsGz1QNKvej5Cjh_IkQziM";


class MarkerManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 14,
      center: {
        lat: 56.834102980558356,
        lng: 60.603461016113215
      },
      hoverDistance: 25,
      mapInstance: null,
      markers: {
        [uuid()]: {
          name: 'Fastdev',
          description: 'company',
          lat: 56.836887893776634,
          lng: 60.58270876496499
        },
        [uuid()]: {
          name: 'Pepperoni',
          description: 'Nice pizza',
          lat: 56.8334617462304,
          lng: 60.5962539204902
        }
      },
      // isFormOpened: true,
      isFormOpened: false,
      form: {
        lat: 59.938043,
        lng: 30.337157
      }
    }

    this.createMarker = this.createMarker.bind(this);
    this.editMarker = this.editMarker.bind(this);
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.onMarkerSubmit = this.onMarkerSubmit.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
  }

  createMarker({ lat, lng, name, description }) {
    this.setState( state => {
      const key = uuid()
      state.markers[key] = {
        key,
        lat,
        lng,
        name,
        description
       }

      return state;
    })
  }

  removeMarker( markerKey ) {
    this.setState( state => {
      let newMarkers = state.markers;
      delete newMarkers[markerKey];

      console.log(newMarkers);

      return {
        ...state,
        markers: newMarkers
      };
    })

    this.closeForm( markerKey );

  }

  editMarker( markerKey, position ) {
    this.openForm( { lat: position.lat, lng: position.lng, markerKey } )
  }

  onMarkerSubmit( { name, description }, markerKey ) {
    if( !markerKey ) {
      const { lat, lng } = this.state.form;
      const marker = {
        name,
        description,
        lat,
        lng
      }

      this.createMarker( marker )
    } else {

      // update marker

      this.setState( previousState => {
        const markers = previousState.markers;
        const marker = this.state.markers[markerKey];
        const newMarker = {
            ...marker,
            name,
           description
        };

        return {
          ...previousState,
          markers: {
            ...markers,
            [markerKey]: newMarker
          }
        }
      })
    }

    this.closeForm( markerKey )

  }

  openForm({ x, y, lat, lng, event, markerKey }) {
    if(this.state.isFormOpened) return;

    this.state.mapInstance.set('scrollwheel', false)
    this.state.mapInstance.set('draggable', false)
    this.state.mapInstance.set('disableDoubleClickZoom', true)

    this.setState({
      isFormOpened: true,
      form: { lat, lng }
    })

    if( markerKey ) {
      this.setState( { editingMarker: markerKey } )
    }
  }

  closeForm( markerKey ) {
    this.setState( state => {
      state.isFormOpened = false
    } )

    this.state.mapInstance.set('scrollwheel', true)
    this.state.mapInstance.set('draggable', true)
    this.state.mapInstance.set('disableDoubleClickZoom', false)

    if( markerKey ) {
      this.setState({ editingMarker: null })
    }
  }

  render() {
    const markers = this.state.markers;
    const state = this.state;

    const mapObject = (object, callback) => {
      return Object.keys(object).map( key => {
        return callback(key, object[key]);
      });
    }

    const markersList = mapObject( markers, (key, marker) => {
      return <Marker name={marker.name} key={key} lat={marker.lat} lng={marker.lng} />
    })

    return (
      <GoogleMap
        bootstrapURLKeys={{
          key: apiKey
        }}
        onGoogleApiLoaded={({ map }) => this.setState( { mapInstance: map } ) }
        onClick={this.openForm}
        onChildClick={this.editMarker}
        hoverDistance={state.hoverDistance}
        center={state.center}
        zoom={state.zoom} >

        { markersList }

        { state.isFormOpened? ( <MarkerForm
            markerKey={ state.editingMarker }
            marker={ markers[ state.editingMarker ] }
            onMarkerSubmit={ marker => this.onMarkerSubmit( marker, state.editingMarker )  }
            onMarkerRemove={ () => this.removeMarker( state.editingMarker ) }
            onClose={ () => {this.closeForm(state.editingMarker)} }
            lat={state.form.lat}
            lng={state.form.lng} />  )
          : null
        }
      </GoogleMap>
    );
  }
}

export default MarkerManager;
