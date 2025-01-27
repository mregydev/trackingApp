import { useSelector } from 'react-redux';
import { WidgetKeys } from '../../constants';
import Widget from '../Widget';
import styles from './style.module.scss';
import { AppState } from '../../store';
import VehicleDetails from './VehicleDetails';
import VehicleList from './VehicleList';
import { useIntl } from 'react-intl';

const VechileWidget = () => {
  
  const selectedVehicleIndex = useSelector(
    (state: AppState) => state.selectedVehicleIndex
  );

  const {$t} =useIntl();

  return (
    <div className={styles.container}>
      <Widget
        key={WidgetKeys['vehicles']}
        id={WidgetKeys['vehicles']}
        width={500}
        height={800}
        title={$t({ id: 'vehicleWidget.title' })}
      >
        {selectedVehicleIndex !== -1 ? <VehicleDetails /> : <VehicleList />}
      </Widget>
    </div>
  );
};

export default VechileWidget;
