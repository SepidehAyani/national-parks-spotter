import { useEffect, useState } from 'react';
import { MapContainer, Polygon, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { statesData } from '../../utils/mapData';
import { Link } from 'react-router-dom';
import { getAllParks } from '../../utils/apiCalls';

const center = [37.881053549040764, -97.53761176891908];

const interactionOptions = {
  zoomControl: true,
  doubleClickZoom: false,
  closePopupOnClick: true,
  dragging: true,
  zoomSnap: false,
  zoomDelta: false,
  tractRexize: false,
  touchZoom: true,
  scrollWheelZoom: true,
};

const markerIcon = new L.Icon({
  iconUrl: require('../../assets/images/tree_marker.png'),
  iconSize: [30, 40],
  iconAnchor: [15, 37],
  popupAnchor: [0, -35],
});

const Map = (props) => {
  const { parkClicked, setParkClicked } = props;

  // ultimately I want parksData to then read parksData.data
  const [parksData, setParksData] = useState([]);

  useEffect(() => {
    async function loadParks() {
      console.log('use Effect activated');
      let parkData = await getAllParks();
      console.log('parkData returned from API', parkData);
      setParksData(parkData);
      console.log(parksData);
    }
    loadParks();
  }, []);

  return (
    <>
      {parksData.data ? (
        <MapContainer
          center={center}
          zoom={4.8}
          style={{ width: '100%', height: '85vh' }}
          {...interactionOptions}
        >
          {statesData.features.map((state) => {
            const coordinates = state.geometry.coordinates[0].map((item) => [
              item[1],
              item[0],
            ]);

            return (
              <>
                <Polygon
                  style={{ width: '100%', height: '100%' }}
                  pathOptions={{
                    fillColor: '#FD8D3C',
                    fillOpacity: 0.7,
                    weigh: 2,
                    opacity: 1,
                    dashArray: 3,
                    color: 'white',
                  }}
                  positions={coordinates}
                  eventHandlers={{
                    mouseover: (e) => {
                      const layer = e.target;
                      layer.setStyle({
                        fillOpacity: 0.7,
                        weight: 5,
                        dashArray: '',
                        color: '#676',
                        fillColor: '#FACDCC',
                      });
                    },
                    mouseout: (e) => {
                      const layer = e.target;
                      layer.setStyle({
                        fillOpacity: 0.7,
                        weight: 2,
                        dashArray: '3',
                        color: '#white',
                        fillColor: '#FD8D3C',
                      });
                    },
                  }}
                />
              </>
            );
          })}
          {parksData.data.map((park) => (
            <Marker
              icon={markerIcon}
              key={park.parkCode}
              position={[park.latitude, park.longitude]}
            >
              <Popup>
                <Link
                  onClick={() => setParkClicked(park.parkCode)}
                  parkClicked={parkClicked}
                  setParkClicked={setParkClicked}
                  to={`/park/${park.parkCode}`}
                >
                  {park.fullName}
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <h2>Loading Parks Map</h2>
      )}
    </>
  );
};

export default Map;
