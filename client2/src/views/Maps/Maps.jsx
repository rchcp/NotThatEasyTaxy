import React from "react";
import MyLocation from "@material-ui/icons/MyLocation";
import "assets/css/material-dashboard-react.css";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FormControl from "@material-ui/core/FormControl";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      userLocation: {
        lat: 0,
        lng: 0
      },
      markers: [],
      addNewMarker: false
    };
  }

  getUserLocation = position => {
    this.setState({
      userLocation: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getUserLocation);
  }

  addNewMarker = (destiny_lat, destiny_lng) => {
    const currentMarkers = this.state.markers;
    var newMarker = { lat: destiny_lat, lng: destiny_lng };
    currentMarkers.push(newMarker);
    this.setState({ markers: currentMarkers });
  };

  handleAddMarker = event => {
    event.preventDefault();
    var lat = parseFloat(event.target.destiny_lat.value, 10);
    var lng = parseFloat(event.target.destiny_lng.value, 10);
    console.log(lat);
    console.log(lng);
    this.addNewMarker(lat, lng);
  };

  render() {
    return (
      <div>
        <CustomMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDb6lNM9G-sc8mjYt78Lwucq1mZMJn-uDM"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div style={{ padding: "20px", height: `500px` }} />
          }
          mapElement={<div style={{ height: `100%` }} />}
          lat={this.state.userLocation.lat}
          lng={this.state.userLocation.lng}
          markers={this.state.markers}
        />
        <form onSubmit={this.handleAddMarker}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText="Latitud de Origen"
                id="origin_lat"
                type="text"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText="Longitud de Origen"
                id="origin_lng"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText="Latitud de Destino"
                id="destiny_lat"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText="Longitud de Destino"
                id="destiny_lng"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem>
              <Button color="info" type="submit">
                Agregar Lugar
              </Button>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    );
  }
}

const CustomMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 3.4372201, lng: -76.5224991 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true
      }}
    >
      <Marker position={{ lat: props.lat, lng: props.lng }} icon={MyLocation} />
      {props.markers.map((marker, id) => (
        <Marker
          key={`marker-${id}`}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
    </GoogleMap>
  ))
);

export default Map;
