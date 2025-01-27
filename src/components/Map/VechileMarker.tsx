import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import styles from './style.module.scss';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setSelectedVehicleIndex, showWidget } from '../../store';
import useZoomToVehicle from '../../hooks/useZoomToVehicle';
import { WidgetKeys } from '../../constants';

export interface VehicleMarkerProps {
  vehicleIndex: number;
}

const VehicleMarker = ({ vehicleIndex }: VehicleMarkerProps) => {
  const dispatch = useDispatch();
  const { zoomToVehicle } = useZoomToVehicle(vehicleIndex);

  const vehicle = useSelector((state: AppState) => state.vechiles[vehicleIndex]);

  const handleVehicleClick = () => {
    zoomToVehicle();
    dispatch(setSelectedVehicleIndex(vehicleIndex));
    dispatch(showWidget(WidgetKeys.vehicles));
  };

  const alertVehicleIcon = new L.DivIcon({
    className: 'animated-marker',
    html: `
      <div class="${styles.pulse}">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/744/744465.png" 
          alt="Alert Vehicle Icon" 
          style="width: 40px; height: 40px;" 
        />
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const defaultVehicleIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return (
    <Marker
      position={[vehicle.position.lat, vehicle.position.lng]}
      icon={vehicle.hasIssue ? alertVehicleIcon : defaultVehicleIcon}
      eventHandlers={{ click: handleVehicleClick }}
    >
      <Tooltip direction="top" offset={[0, -20]} permanent>
        <div style={{ textAlign: 'center', padding: '5px' }}>
          <strong>{vehicle.name}</strong>
        </div>
      </Tooltip>
    </Marker>
  );
};

export default memo(VehicleMarker);
