import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, showWidget } from '../../store';
import { MinimizeDetails } from '../../types';
import styles from './styles.module.scss';

const Footer = () => {
  const dispatch = useDispatch();

  const isDarkMode = useSelector((state: AppState) => state.isDarkMode);
  const minimizedWidgets = useSelector(
    (state: AppState) => state.minizedWidgets
  );

  const items: MinimizeDetails[] = Object.entries(minimizedWidgets).map(
    ([widgetId, widgetTitle]) => ({
      widgetId,
      widgetTitle,
    })
  );

  const handleWidgetClick = useCallback(
    (widgetId: string) => {
      dispatch(showWidget(widgetId));
    },
    [dispatch]
  );

  return (
    <footer className={styles.footer}>
      {items.map(({ widgetId, widgetTitle }) => (
        <div
          key={widgetId}
          data-id={widgetId}
          className={`${styles.footerItem} ${
            isDarkMode ? styles.darkMode : styles.lightMode
          }`}
          onClick={() => handleWidgetClick(widgetId)}
        >
          {widgetTitle}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
