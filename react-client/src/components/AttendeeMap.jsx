import React from 'react';
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const AttendeeMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3wPEP1-hGvDC0_cmmKv3JRYiKIJukCCU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` , width: `700px`}} />,
    mapElement: <div style={{ height: `100%` }} />,
    eventCoordinate : {lat:40.7505, lng:-73.9764},
    userCoordinates : [{lat:40.7413, lng:-73.9883}, {lat:40.7268, lng:-74.0353}, {lat:40.6872, lng:-73.9418}],
    directions : []
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      this.props.userCoordinates.forEach((userCoordinate, i) => {
        DirectionsService.route({
          origin: new google.maps.LatLng(userCoordinate.lat, userCoordinate.lng),
          destination: new google.maps.LatLng(this.props.eventCoordinate.lat, this.props.eventCoordinate.lng),
          travelMode: google.maps.TravelMode.TRANSIT,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.props.directions.push(result);
            this.setState({directions : this.props.directions});
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });

      });
    }
  })
)(props =>
  <GoogleMap defaultZoom={6} defaultCenter={new google.maps.LatLng(40.7128, -74.0060)}>
    {
      (props.directions.length === props.userCoordinates.length) ? (props.directions.map((direction, i) => (<DirectionsRenderer directions={direction} key={i}/>))) : ''}) 
  }
  </GoogleMap>
);


export default AttendeeMap;
