import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import VechileListItem from './VechileListItem';
import { v4 } from 'uuid';
import { useIntl } from 'react-intl';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { VehicleWorkingStatus } from '../../types';
import styles from './style.module.scss';

const VehicleList = () => {
  const numOfVehicles = useSelector((state: AppState) => state.numVechiles);
  const [workingStatus, setWorkingStatus] =
    useState<VehicleWorkingStatus>('all');

  const applyFilter = (value: VehicleWorkingStatus, isChecked = true) => {
    if (isChecked) {
      if (
        (value === 'damaged' && workingStatus === 'working') ||
        (value === 'working' && workingStatus === 'damaged')
      ) {
        setWorkingStatus('all');
      } else {
        setWorkingStatus(value);
      }
    } else {
      if (value === 'damaged' && workingStatus === 'all') {
        setWorkingStatus('working');
      } else if (value === 'working' && workingStatus === 'all') {
        setWorkingStatus('damaged');
      } else {
        setWorkingStatus('none');
      }
    }
  };

  const { $t } = useIntl();
  return (
    <>
      <div className={styles.filterSection}>
        <FormControlLabel
          control={
            <Checkbox
              className='cancel'
              checked={workingStatus === 'all' || workingStatus === 'damaged'}
              onChange={(_: unknown, value: boolean) =>
                applyFilter('damaged', value)
              }
            />
          }
          label={$t({ id: 'vehicleList.showDamagedOnly' })}
        />
        <FormControlLabel
          control={
            <Checkbox
            className='cancel'
              checked={workingStatus === 'all' || workingStatus === 'working'}
              onChange={(_: unknown, value: boolean) =>
                applyFilter('working', value)
              }
            />
          }
          label={$t({ id: 'vehicleList.showWorkingOnly' })}
        />
      </div>
      {Array.from({ length: numOfVehicles }).map((_, index) => (
        <VechileListItem
          key={v4()}
          vechileIndex={index}
          workingStatus={workingStatus}
        />
      ))}
      ;
    </>
  );
};

export default VehicleList;
