import { useDispatch, useSelector } from 'react-redux';
import { AppState, setSelectedVehicleIndex } from '../../store';
import styles from './style.module.scss';
import { Vehicle, VehicleStatus } from '../../types';
import { Info } from '@mui/icons-material';
import useZoomToVehicle from '../../hooks/useZoomToVehicle';

export interface VechileListItemProps {
  vechileIndex: number;
  vehicleStatus?: VehicleStatus;
}

const VechileListItem = ({
  vechileIndex,
  vehicleStatus,
}: VechileListItemProps) => {

  const { zoomToVehicle } = useZoomToVehicle(vechileIndex);
  
  const disatch=useDispatch();

  const selectedVehicleIndex = useSelector(
    (state: AppState) => state.selectedVehicleIndex
  );
  const vehicle: Vehicle = useSelector(
    (state: AppState) => state.vechiles[vechileIndex]
  );

  if (vehicleStatus && vehicleStatus !== vehicle.status) {
    return null;
  }

  const showVehicleDetails = () => {
    zoomToVehicle();
    disatch(setSelectedVehicleIndex(vechileIndex));
  };

  const isSelected = selectedVehicleIndex === vechileIndex;

  return (
    <div
      role='button'
      onClick={showVehicleDetails}
      className={`${styles.listItem} ${isSelected ? styles.active : ''}`}
    >
      <span>{vehicle.name}</span>
      <span>{vehicle.status === 'moving' ? 'Moving' : 'Paused'}</span>
      <span>
        <Info />
      </span>
      <div
        className={`${vehicle.hasIssue ? styles.warning : styles.working}`}
      />
    </div>
  );
};

export default VechileListItem;