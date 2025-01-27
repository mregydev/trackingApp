import { configureStore } from '@reduxjs/toolkit'

import reducer, {
  type AppState,
  minimizeWidget,
  showWidget,
  updateVechile,
  setIsDarkMode,
  setSelectedVehicleIndex,
  changeLocale,
  changeConnection,
  changeNotifcationMessage
} from './appStore';

export default configureStore({ reducer });

export {
  AppState,
  minimizeWidget,
  showWidget,
  updateVechile,
  setIsDarkMode,
  setSelectedVehicleIndex,
  changeLocale,
  changeConnection,
  changeNotifcationMessage
};