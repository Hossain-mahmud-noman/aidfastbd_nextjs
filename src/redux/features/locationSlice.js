import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        current: null,
        select: null,
        lat: 23.8103, name: "", lng: 90.4125
    },
    reducers: {
        setMap: (state, action) => {
            const {lat,lng} = action.payload;
            state.lat = lat;
            state.lng = lng;
        },
        myLocation: (state, action) => {
            const location = action.payload;
            state.current = location;
        },
        selectLocation: (state, action) => {
            const location = action.payload;
            state.current = location;
        },

    },
});

export const { myLocation, selectLocation ,setMap} = locationSlice.actions;

export default locationSlice.reducer;