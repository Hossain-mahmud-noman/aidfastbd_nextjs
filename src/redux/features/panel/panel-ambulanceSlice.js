import { createSlice } from '@reduxjs/toolkit';


const panelAmbulanceSlice = createSlice({
  name: 'panelAmbulances',
  initialState: {
    data: [],
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
      state.data = action.payload.data;
    },

    setUpdateData: (state, action) => {
      const updatedData = action.payload;      
      state.data = state.data.map((d) =>
        d.id === updatedData.id ? updatedData : d
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

export const { setSearch, setSlugFilter,setUpdateData, setPage, setLoading, setPanelData } = panelAmbulanceSlice.actions;
export default panelAmbulanceSlice.reducer;
