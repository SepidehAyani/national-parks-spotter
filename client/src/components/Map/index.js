import { useState } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { statesData } from "../../utils/mapData";
import { getParks } from "../../utils/parkAPI";
import * as parkData from "../../utils/parkdata.json";

const center = [39.881053549040764, -102.53761176891908];

const interactionOptions = {
	zoomControl: false,
	doubleClickZoom: false,
	closePopupOnClick: false,
	dragging: false,
	zoomSnap: false,
	zoomDelta: false,
	tractRexize: false,
	touchZoom: false,
	scrollWheelZoom: false
};

// const markerIcon = L.Icon({
// 	iconUrl: require("../../images/colorful-natural-tree.png"),
// 	iconSize: [35, 45]
// });

const Map = () => {
	return (
		<MapContainer
			center={center}
			zoom={5}
			style={{ width: "100vw", height: "100vh" }}
			{...interactionOptions}
		>
			{statesData.features.map((state) => {
				const coordinates = state.geometry.coordinates[0].map((item) => [
					item[1],
					item[0]
				]);

				return (
					<>
						<Polygon
							style={{ width: "100%", height: "100%" }}
							pathOptions={{
								fillColor: "#FD8D3C",
								fillOpacity: 0.7,
								weigh: 2,
								opacity: 1,
								dashArray: 3,
								color: "white"
							}}
							positions={coordinates}
							eventHandlers={{
								mouseover: (e) => {
									const layer = e.target;
									layer.setStyle({
										fillOpacity: 0.7,
										weight: 5,
										dashArray: "",
										color: "#676",
										fillColor: "#FACDCC"
									});
								},
								mouseout: (e) => {
									const layer = e.target;
									layer.setStyle({
										fillOpacity: 0.7,
										weight: 2,
										dashArray: "3",
										color: "#white",
										fillColor: "#FD8D3C"
									});
								}
							}}
						/>
					</>
				);
			})}
			{parkData.data.map((park) => (
				<Marker key={park.parkCode} position={[park.latitude, park.longitude]}>
					<Popup>
						<button>{park.fullName}</button>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default Map;
