import { RefAttributes } from 'react';
import { MapContainerProps } from 'react-leaflet';
import { LatLngExpression, Map as LeafletMap } from 'leaflet';

export const DEFAULT_CENTER: LatLngExpression = [50.4021379, 30.3678856];

export const DEFAULT_OPTIONS: MapContainerProps & RefAttributes<LeafletMap> = {
  zoomControl: false,
  scrollWheelZoom: 'center',
  zoom: 5,
  worldCopyJump: true,
};
