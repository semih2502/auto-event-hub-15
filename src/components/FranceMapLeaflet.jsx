import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon paths for Leaflet when bundlers change asset locations
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function FranceMapLeaflet({ events = [] }) {
    const center = [46.7, 2.5];
    const zoom = 5;

    const colors = {
        meeting: '#06b6d4',
        race: '#ef4444',
        salon: '#f59e0b',
        rally: '#10b981',
        auction: '#8b5cf6',
        default: '#64748b',
    };

    return (
        <div className="w-full rounded-lg bg-background/50 p-2">
            <div className="mb-2 flex items-center justify-between px-2">
                <h3 className="font-medium">Carte interactive — événements en France</h3>
                <div className="text-sm text-muted-foreground">Zoom & pan activés — cliquez sur un point</div>
            </div>

            <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{ height: 420, width: '100%' }} zoomControl={false}>
                <ZoomControl position="topright" />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {events.map((ev) => {
                    if (!ev.coords) return null;
                    const lat = ev.coords.lat;
                    const lon = ev.coords.lon;
                    const color = colors[ev.category] || colors.default;

                    return (
                        <CircleMarker
                            key={ev.id}
                            center={[lat, lon]}
                            radius={8}
                            pathOptions={{ color, fillColor: color, fillOpacity: 0.9, weight: 1 }}
                        >
                            <Popup>
                                <div className="max-w-xs">
                                    <div className="font-semibold">{ev.title}</div>
                                    <div className="text-sm text-muted-foreground">{ev.location}</div>
                                    <div className="text-xs mt-1">{ev.date}</div>
                                </div>
                            </Popup>
                        </CircleMarker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
