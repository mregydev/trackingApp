import { LatLngBoundsExpression } from "leaflet";
import { useMap } from "react-leaflet";
import styles from './style.module.scss';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { useDispatch, useSelector } from "react-redux";
import { AppState, changeLocale, setIsDarkMode } from "../../store";
import DarkModeSwitch from "../DarkModeSwitch";
import { Locale } from "../../types";

export interface MapToolProps {
  bounds: LatLngBoundsExpression;
}

const MapTools = ({ bounds }: MapToolProps) => {
  const isDarkMode = useSelector((state: AppState) => state.isDarkMode);
  const dispatch = useDispatch();
  const map = useMap();

  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();
  const fitBounds = () => map.fitBounds(bounds);

  const toggleDarkMode = () => dispatch(setIsDarkMode(!isDarkMode));
  const changeLocaleHandler = (locale: Locale) => dispatch(changeLocale(locale));

  return (
    <div
      className={`${styles.mapTools} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      <span role="button" aria-label="Zoom In" onClick={zoomIn}>
        <ZoomInIcon />
      </span>
      <span role="button" aria-label="Zoom Out" onClick={zoomOut}>
        <ZoomOutIcon />
      </span>
      <span role="button" aria-label="Fit Screen" onClick={fitBounds}>
        <FitScreenIcon />
      </span>
      <span
        role="button"
        aria-label="english"
        className={styles.lang}
        onClick={() => changeLocaleHandler('en')}
      >
        EN
      </span>
      <span
        role="button"
        aria-label="deutsch"
        className={styles.lang}
        onClick={() => changeLocaleHandler('de')}
      >
        DE
      </span>
      <span>
        <DarkModeSwitch onChange={toggleDarkMode} value={isDarkMode} />
        {isDarkMode}
      </span>
    </div>
  );
};

export default MapTools;
