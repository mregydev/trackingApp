import { useCallback } from 'react';

import { AppState, showWidget  } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { MinimizeDetails } from '../../types';
import styles from './styles.module.scss';

const Footer = () => {
 
  const isDarkMode = useSelector((state: AppState) => state.isDarkMode);

  const items: MinimizeDetails[] = useSelector((state: AppState) =>
    Object.keys(state.minizedWidgets).map<MinimizeDetails>((id) => ({
      widgetId: id,
      widgetTitle: state.minizedWidgets[id],
    }))
  );

  const dispatch=useDispatch();

  const clickHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const widgetId = event.currentTarget.getAttribute('data-id');

      if (widgetId) {
        dispatch(showWidget(widgetId));
      }
    },
    [dispatch]
  );

  return (
    <footer className={styles.footer}>
      {items.map((item) => (
        <div
          key={item.widgetId}
          data-id={item.widgetId}
          className={`${styles.footerItem} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
          onClick={clickHandler}
        >
          {item.widgetTitle}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
