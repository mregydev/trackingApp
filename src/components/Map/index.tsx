import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import VechileMarker from './VechileMarker';
import MapTools from './MapTool';
import { memo, ReactNode } from 'react';

export interface MapProps {
  children?: ReactNode;
}

const Map = ({ children }: MapProps) => {
  const numVechiles = useSelector((state: AppState) => state.numVechiles);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={[50.9401, 6.9599]}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='Google Maps'
          url='https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
        />

        <MapTools
          bounds={[
            [50.917, 6.844], // Southwest corner
            [50.972, 7.08], // Northeast corner
          ]}
        />

        {Array.from({ length: numVechiles }).map((_, index) => (
          <VechileMarker key={`vehicle-${index}`} vehicleIndex={index} />
        ))}

        {children}
      </MapContainer>
    </div>
  );
};

export default memo(Map);
