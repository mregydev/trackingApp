import './App.css';

import Footer from './components/Footer';

import VechileWidget from './components/VechileWidget';
import StatisticsWidget from './components/StatisticsWidget';
import Map from './components/Map';
import { useEffect } from 'react';
import { getDALInstance, getSocket } from './DAL/DAL';
import {
  AppState,
  changeConnection,
  changeNotifcationMessage,
  updateVechile,
} from './store';
import { useDispatch, useSelector } from 'react-redux';
import { Vehicle } from './types';
import { IntlProvider } from 'react-intl';
import messages from './locales';
import ConnectionLabel from './components/ConnectionLabel';
import { Snackbar } from '@mui/material';
import Notifcation from './components/Notification';

function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    const dal = getDALInstance();

    dal.onVehicleUpdate((vechile: Vehicle) => {
      dispatch(updateVechile(vechile));
    });

    dal.onConnect(() => {
      dispatch(changeConnection(true));
    });

    dal.onDisConnect(() => {
      dispatch(changeConnection(false));
    });

    return () => {
      dal.releaseHandlers();
    };
  }, [dispatch]);

  const locale = useSelector((state: AppState) => state.locale);
  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <Map>
        <ConnectionLabel></ConnectionLabel>
        <div className='widgets'>
          <VechileWidget></VechileWidget>
          <StatisticsWidget></StatisticsWidget>
        </div>
      </Map>
      <Notifcation></Notifcation>
      <Footer></Footer>
    </IntlProvider>
  );
}

export default App;
