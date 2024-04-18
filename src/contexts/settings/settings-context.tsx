import { createContext } from 'react';
import { Settings } from '../../types/settings';


export const defaultSettings: Settings = {
  colorPreset: 'indigo',
  contrast: 'normal',
  direction: 'ltr',
  layout: 'vertical',
  navColor: 'evident',
  paletteMode: 'light',
  responsiveFontSizes: true,
  stretch: false
};

export interface State extends Settings {
  openDrawer: boolean;
  isInitialized: boolean;
}

export const initialState: State = {
  ...defaultSettings,
  isInitialized: false,
  openDrawer: false
};

export interface SettingsContextType extends State {
  handleDrawerClose: () => void;
  handleDrawerOpen: () => void;
  handleReset: () => void;
  handleUpdate: (settings: Settings) => void;
  isCustom: boolean;
}

export const SettingsContext = createContext<SettingsContextType>({
  ...defaultSettings,
  ...initialState,
  handleDrawerClose: () => {null},
  handleDrawerOpen: () => {null},
  handleReset: () => {null},
  handleUpdate: () => {null},
  isCustom: false
});
