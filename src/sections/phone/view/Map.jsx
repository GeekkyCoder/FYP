import React, {useEffect } from 'react';
import mapboxgl, { GeolocateControl, NavigationControl } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

// Replace with your Mapbox access token
mapboxgl.accessToken =
  'pk.eyJ1IjoiZmFyYXphaG1lZG1hcGJveCIsImEiOiJjbHE2ZjNqbnMwbDIxMmxudjV2bDV0ajJ0In0.sD_fSUXSjqkGea7QXNVj6w';

const Map = ({setAddress}) => {
  useEffect(() => {
    const initializeMap = async () => {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });

      geocoder.on('result', (event) => {
        // The event object contains the selected location information
        const { result } = event;
        const {  place_name } = result;
        setAddress(place_name)
      });

      const mapInstance = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40],
        zoom: 12,
      });

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          mapInstance.setCenter([longitude, latitude]);
          mapInstance?.setZoom(15);
        });
      }

      // user active location
      mapInstance.addControl(
        new GeolocateControl({
          showUserLocation: true,
          positionOptions: {
            enableHighAccuracy: true,
          },
          showUserHeading: true,
          trackUserLocation: true,
        })
      );

      mapInstance.addControl(geocoder);
    };

   

    initializeMap();
  }, []);

  return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default Map;
