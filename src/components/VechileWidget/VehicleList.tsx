import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import VechileListItem from './VechileListItem';
import { v4 } from 'uuid';

const VehicleList = () => {
  const numOfVehicles = useSelector((state: AppState) => state.numVechiles);

  return Array.from({ length: numOfVehicles }).map((_, index) => (
    <VechileListItem key={v4()} vechileIndex={index} />
  ));
};

export default VehicleList;
