import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkThemeEnabled: false,
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    switchTheme(state) {
      state.isDarkThemeEnabled = !state.isDarkThemeEnabled;
      console.log("wqewq");
    },
  },
});

export default themeSlice.reducer;
export const themeActions = themeSlice.actions;
