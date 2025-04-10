import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  translations: {},
  locale: 'en', // default locale
};

export const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setTranslations: (state, action) => {
      state.translations = action.payload.translations;
      state.locale = action.payload.locale;
    },

    changeLocale: (state, action) => {
      state.locale = action.payload;  // Update the locale
    },
  },
});

export const { setTranslations,changeLocale } = translationSlice.actions;

export default translationSlice.reducer;
