import { useDispatch, useSelector } from 'react-redux';
import { AppState, setSelectedVehicleIndex } from '../../store';
import styles from './style.module.scss';
import { Vehicle, VehicleWorkingStatus } from '../../types';
import { Info } from '@mui/icons-material';
import useZoomToVehicle from '../../hooks/useZoomToVehicle';

export interface VechileListItemProps {
  vechileIndex: number;
  workingStatus: VehicleWorkingStatus;
}

const VechileListItem = ({
  vechileIndex,
  workingStatus,
}: VechileListItemProps) => {
  const { zoomToVehicle } = useZoomToVehicle(vechileIndex);

  const disatch = useDispatch();

  const vehicle: Vehicle = useSelector(
    (state: AppState) => state.vechiles[vechileIndex]
  );

  const showVehicleDetails = () => {
    zoomToVehicle();
    disatch(setSelectedVehicleIndex(vechileIndex));
  };

  if (
    (workingStatus === 'working' && vehicle.hasIssue) ||
    (workingStatus === 'damaged' && !vehicle.hasIssue) ||
    workingStatus === 'none'
  ) {
    return null;
  }

  return (
    <div
      role='button'
      aria-label={vehicle.name}
      onClick={showVehicleDetails}
      className={`cancel ${styles.listItem}`}
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
