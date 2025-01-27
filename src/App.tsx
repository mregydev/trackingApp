import './App.css';

import Footer from './components/Footer';

import VechileWidget from './components/VechileWidget';
import StatisticsWidget from './components/StatisticsWidget';
import Map from './components/Map';
import { useEffect } from 'react';
import { getSocket } from './DAL/DAL';
import { AppState, changeConnection, updateVechile } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { Vehicle } from './types';
import { IntlProvider } from 'react-intl';
import messages from './locales';
import ConnectionLabel from './components/ConnectionLabel';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = getSocket();
    socket.on('vehicleUpdate', (vechile: Vehicle) => {
      dispatch(updateVechile(vechile));
    });

    socket.on('connect', () => {
      dispatch(changeConnection(true))
    });

    socket.on('disconnect', () => {
      dispatch(changeConnection(false))
    });

    return () => {
      socket.off('vehicleUpdate');
      socket.off('connect');
      socket.off('disconnect');
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

      <Footer></Footer>
    </IntlProvider>
  );
}

export default App;
