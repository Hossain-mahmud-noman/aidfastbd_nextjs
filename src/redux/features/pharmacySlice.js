import { createSlice } from '@reduxjs/toolkit';

export const pharmacyReducer = createSlice({
  name: 'pharmacy',
  initialState: {
    data: [],
    start: false,
    page: 1,
    pageSize: 0,
    next: null,
    loading: true,
    error: null,
    nameOptions: [],
    ratingOptions: [],
    rankOptions: [],
    emergencyOptions: []
  },
  reducers: {
    setAddData: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setNext: (state, action) => {
      state.next = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setRank: (state, action) => {
      state.rank = action.payload;
    },
    setEmergency: (state, action) => {
      state.emergency = action.payload;
    },
    setNameOptions: (state, action) => {
      state.nameOptions = action.payload;
    },

  },

});

export const { setData, setAddData, setPage, setNext, setLoading, setError, setName, setRating, setRank, setEmergency, setNameOptions } = pharmacyReducer.actions;
export default pharmacyReducer.reducer;
