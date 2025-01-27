import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Locale, MinimizeDetails, Vehicle } from '../types';

export interface AppState {
  minizedWidgets: { [key: string]: string };
  vechiles: Vehicle[];
  isDarkMode: boolean;
  numVechiles: number;
  selectedVehicleIndex: number;
  locale: Locale;
  isConnected:boolean;
}

const initialState: AppState = {
  minizedWidgets: {},
  vechiles: [],
  isDarkMode: false,
  numVechiles: 0,
  selectedVehicleIndex:-1,
  locale:'en',
  isConnected:false
};

const appStore = createSlice({
  name: 'appStore',
  initialState,
  reducers: {
    changeLocale: (state: AppState, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
    changeConnection: (state: AppState, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setSelectedVehicleIndex: (
      state: AppState,
      action: PayloadAction<number>
    ) => {
      state.selectedVehicleIndex = action.payload;
    },
    setIsDarkMode: (state: AppState, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    updateVechile: (state: AppState, action: PayloadAction<Vehicle>) => {
      const targetVechileIndex = state.vechiles.findIndex(
        (v) => v.id === action.payload.id
      );

      if (targetVechileIndex === -1) {
        state.vechiles.push(action.payload);
        state.numVechiles += 1;
      } else {
        const targetVechile = state.vechiles[targetVechileIndex];
        targetVechile.attributes = action.payload.attributes;
        targetVechile.position = action.payload.position;
        targetVechile.hasIssue = action.payload.hasIssue;
        targetVechile.errorMessage = action.payload.errorMessage;
      }
    },
    minimizeWidget: (
      state: AppState,
      action: PayloadAction<MinimizeDetails>
    ) => {
      const { widgetId, widgetTitle } = action.payload;
      state.minizedWidgets[widgetId] = widgetTitle;
    },
    showWidget: (state: AppState, action: PayloadAction<string>) => {
      const widgetId = action.payload;
      delete state.minizedWidgets[widgetId];
    },
  },
});

export const {
  minimizeWidget,
  showWidget,
  updateVechile,
  setIsDarkMode,
  setSelectedVehicleIndex,
  changeLocale,
  changeConnection,
} = appStore.actions;
export default appStore.reducer;
