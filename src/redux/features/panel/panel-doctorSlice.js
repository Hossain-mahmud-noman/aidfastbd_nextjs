import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const panelPoctorSlice = createSlice({
  name: 'panelDoctors',
  initialState: {
    doctors: [],
    totalPages: 0,
    loading: false,
    search: '',
    slugFilter: null,
    currentPage: 1,
    error: null,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setSlugFilter: (state, action) => {
      state.slugFilter = action.payload;
      state.currentPage = 1;
    },
    setPanelData: (state, action) => {
      state.currentPage = action.payload.page;
      state.totalPages = action.payload.total_pages;
      state.doctors = action.payload.data;
    },

    setUpdateDoctor: (state, action) => {
      const updatedDoctor = action.payload;      
      state.doctors = state.doctors.map((doctor) =>
        doctor.id === updatedDoctor.id ? updatedDoctor : doctor
      );
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

});

export const { setSearch, setSlugFilter,setUpdateDoctor, setPage, setLoading, setPanelData } = panelPoctorSlice.actions;
export default panelPoctorSlice.reducer;
