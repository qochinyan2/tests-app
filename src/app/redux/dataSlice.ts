import { createSlice } from "@reduxjs/toolkit";
import { initialStateType } from "./types";
import { fetchSites, fetchTests } from "./asyncThunks";

const initialState: initialStateType = {
  sites: [],
  tests: [],
  status: "idle",
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSites.fulfilled, (state, action) => {
        state.sites = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchTests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.tests = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
