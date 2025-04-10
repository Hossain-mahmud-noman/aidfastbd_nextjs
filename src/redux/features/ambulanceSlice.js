import { createSlice } from '@reduxjs/toolkit';

export const ambulanceReducer = createSlice({
  name: 'ambulance',
  initialState: {
    data: [],
    start: false,
    page: 1,
    pageSize: 0,
    next: null,
    loading: true,
    error: null, nameOptions: [],
    ratingOptions: [],
    rankOptions: [],
    emergencyOptions: [],
  },
  reducers: {
    setAddData: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    setData: (state, action) => {
      state.data = action.payload;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },
    setNext: (state, action) => {
      state.next = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    }, setName: (state, action) => {
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

export const { setName, setAddData, setPage, setRating, setRank, setEmergency, setNameOptions, setData, setNext, setLoading, setError } = ambulanceReducer.actions;
export default ambulanceReducer.reducer;
