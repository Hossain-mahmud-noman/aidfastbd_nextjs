import { createSlice } from '@reduxjs/toolkit';

export const doctorReducer = createSlice({
  name: 'doctor',
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
    bmdc: null,
    emergencyOptions: [],
    feeOptions: [],
    experienceOptions: [],
    specialityOptions: [],
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
    setBMDC: (state, action) => {
      state.bmdc = action.payload;
    },

    setRank: (state, action) => {
      state.rank = action.payload;
    },
    setFee: (state, action) => {
      state.fee = action.payload;
    },
    setSpeciality: (state, action) => {
      state.speciality = action.payload;
    },
    setExperience: (state, action) => {
      state.experience = action.payload;
    },
    setEmergency: (state, action) => {
      state.emergency = action.payload;
    },
    setNameOptions: (state, action) => {
      state.nameOptions = action.payload;
    }, setExperienceOptions: (state, action) => {
      state.experienceOptions = action.payload;
    }
    , setFeeOptions: (state, action) => {
      state.feeOptions = action.payload;
    }, setSpecialityOptions: (state, action) => {
      state.specialityOptions = action.payload;
    },

  },

});

export const { setData,setAddData, setNext,setPage, setBMDC, setLoading, setError, setFeeOptions, setExperience, setSpeciality, setSpecialityOptions, setFee, setExperienceOptions, setName, setRating, setRank, setEmergency, setNameOptions } = doctorReducer.actions;
export default doctorReducer.reducer;
