import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './features/locationSlice';
import translationReducer from './features/translationSlice';
import dataReducer from './features/dataSlice';
import bloodSlice from './features/bloodSlice';
import pharmacySlice from './features/pharmacySlice';
import doctorSlice from './features/doctorSlice';
import ambulanceSlice from './features/ambulanceSlice';
import diagnosticSlice from './features/diagnosticSlice';
import dentalSlice from "./features/dentalSlice";


export const makeStore = () => {
  return configureStore({
    reducer: {
      location: locationReducer,
      translation: translationReducer,
      data: dataReducer,
      ambulance: ambulanceSlice,
      blood: bloodSlice,
      pharmacy: pharmacySlice,
      doctor: doctorSlice,
      diagnostic: diagnosticSlice,
      dental: dentalSlice
    },
  });
};

export const AppStore = makeStore();
