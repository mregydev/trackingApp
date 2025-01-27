import { Marker, Tooltip } from 'react-leaflet';
import leaftLet from 'leaflet';
import styles from './style.module.scss';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setSelectedVehicleIndex, showWidget } from '../../store';
import useZoomToVehicle from '../../hooks/useZoomToVehicle';
import { WidgetKeys } from '../../constants';

export interface VechileMarkerProps {
  vehicleIndex: number;
}

const VechileMarker = ({ vehicleIndex }: VechileMarkerProps) => {

  const { zoomToVehicle } = useZoomToVehicle(vehicleIndex);
  const dispatch=useDispatch();

  const vehicle = useSelector(
    (state: AppState) => state.vechiles[vehicleIndex]
  );


   const vehicleClickHandler=()=>{
    zoomToVehicle();
    dispatch(setSelectedVehicleIndex(vehicleIndex))
    dispatch(showWidget(WidgetKeys['details']));
  }
  const alertVechileIcon = new leaftLet.DivIcon({
    className: 'animated-marker',
    html: `
            <div class="${styles.pulse}">
              <img src="https://cdn-icons-png.flaticon.com/512/744/744465.png" style="width: 40px; height: 40px;" />
            </div>
          `,
    iconSize: [40, 40], // Size of the marker
    iconAnchor: [20, 40], // Anchor point
  });

  const vehicleIcon = new leaftLet.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
    iconSize: [40, 40], // Size of the marker
    iconAnchor: [20, 40], // Anchor point
  });

  return (
    <Marker
      position={[vehicle.position.lat, vehicle.position.lng]}
      icon={vehicle.hasIssue ? alertVechileIcon : vehicleIcon}
      eventHandlers={{
        click: () => vehicleClickHandler(),
      }}
    >
      <Tooltip direction='top' offset={[0, -20]} permanent>
        <div style={{ textAlign: 'center', padding: '5px' }}>
          <strong>{vehicle.name}</strong>
        </div>
      </Tooltip>
    </Marker>
  );
};

export default memo(VechileMarker);
