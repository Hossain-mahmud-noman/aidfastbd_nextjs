
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    doctor: [],
    doctors: [],
    bloodBank: [],
    bloodBanks: [],
    pharmacy: [],
    pharmacys: [],
    ambulance: [],
    ambulances: [],
    diagnostic: [],
    diagnostics: [],
    loading: false,
    error: null
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        fetchDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action) => {
            const { doctor, bloodBanks, pharmacy, ambulance, diagnostic } = action.payload;
            state.doctor = doctor;
            state.bloodBanks = bloodBanks;
            state.pharmacy = pharmacy;
            state.ambulance = ambulance;
            state.diagnostic = diagnostic;
            state.loading = false;
        },

        saveDataSuccess: (state, action) => {
            const { data, type } = action.payload;
            switch (type) {
                case 'doctors':
                    state.doctors = data;
                    break;
                case 'pharmacys':
                    state.pharmacys = data;
                    break;
                case 'blood_banks':
                    state.bloodBanks = data;
                    break;
                case 'diagnostics':
                    state.diagnostics = data;
                    break;
                case 'ambulances':
                    state.ambulances = data;
                    break;
                default:
                    break;
            }
            state.loading = false;
        },
        saveDataAddSuccess: (state, action) => {
            const { data, type } = action.payload;
            switch (type) {
                case 'doctors':
                    state.doctors = [...state.doctors, data];
                    break;
                case 'pharmacys':
                    state.pharmacys = [...state.pharmacys, data];
                    break;
                case 'blood_banks':
                    state.bloodBanks = [...state.bloodBanks, data];
                    break;
                case 'diagnostics':
                    state.diagnostics = [...state.diagnostics, data];
                    break;
                case 'ambulances':
                    state.ambulances = [...state.ambulances, data];
                    break;
                default:
                    break;
            }
            state.loading = false;
        },
        fetchDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = dataSlice.actions;

export default dataSlice.reducer;
