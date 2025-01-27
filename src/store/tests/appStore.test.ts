import { describe, it, expect } from 'vitest';
import appReducer, { setIsDarkMode, AppState } from '../appStore';

describe('setIsDarkMode reducer', () => {
  it('should update isDarkMode to true', () => {
    const initialState: AppState = {
      minizedWidgets: {},
      vechiles: [],
      isDarkMode: false,
      numVechiles: 0,
      selectedVehicleIndex: -1,
      locale: 'en',
      isConnected: false,
      notificationMessage: '',
    };

    const newState = appReducer(initialState, setIsDarkMode(true));
    expect(newState.isDarkMode).toBe(true);
  });

  it('should update isDarkMode to false', () => {
    const initialState: AppState = {
      minizedWidgets: {},
      vechiles: [],
      isDarkMode: true,
      numVechiles: 0,
      selectedVehicleIndex: -1,
      locale: 'en',
      isConnected: false,
      notificationMessage: '',
    };

    const newState = appReducer(initialState, setIsDarkMode(false));
    expect(newState.isDarkMode).toBe(false);
  });
});
