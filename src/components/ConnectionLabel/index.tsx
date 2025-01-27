import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { AppState } from '../../store';
import { useIntl } from 'react-intl';

const ConnectionLabel = () => {
  const isConnected = useSelector((state: AppState) => state.isConnected);
  const { formatMessage } = useIntl();

  const connectionMessage = formatMessage({
    id: isConnected
      ? 'connectionLabel.connected'
      : 'connectionLabel.notConnected',
  });

  return (
    <div className={styles.container}>
      <div
        className={
          isConnected ? styles.connected : styles.notConnected
        }
        aria-label={isConnected ? 'Connected' : 'Not Connected'}
      ></div>
      <span>{connectionMessage}</span>
    </div>
  );
};

export default ConnectionLabel;
