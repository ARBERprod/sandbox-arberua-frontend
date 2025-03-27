import { ForwardedRef, memo, RefAttributes } from 'react';
import cn from 'classnames';
import MarkerIcon from '@/shared/assets/images/marker.png';
import styles from './Map.module.scss';
import { DEFAULT_CENTER, DEFAULT_OPTIONS } from './config';
import { Icon, Map as LeafletMap } from 'leaflet';
import {
  MapContainer, Marker, TileLayer, MapContainerProps,
} from 'react-leaflet';
import { Coords } from './types';
import 'leaflet/dist/leaflet.css';

const markerIcon = new Icon({
  iconUrl: MarkerIcon.src,
  iconSize: [33, 44],
  iconAnchor: [16.5, 44],
  popupAnchor: [-3, -76],
});

interface MapProps {
  className?: string;
  center: Coords;
  options?: Partial<MapContainerProps & RefAttributes<LeafletMap>>;
  markers?: Coords[];
  mapRef?:ForwardedRef<LeafletMap | null>
}

export const Map = memo(({
  center,
  markers,
  options,
  className,
  mapRef,
}: MapProps) => (
  <div className={cn(styles.root, className)}>
    <MapContainer
      ref={mapRef}
      className={styles.map}
      {...DEFAULT_OPTIONS}
      center={DEFAULT_CENTER || center}
      {...options}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers?.map((marker) => (
        <Marker icon={markerIcon} key={marker.lat} position={[marker.lat, marker.lng]} />
      ))}
    </MapContainer>
  </div>
));
