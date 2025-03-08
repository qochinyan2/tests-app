import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSites = createAsyncThunk("data/fetchSites", async () => {
  const response = await fetch("http://localhost:3100/sites");
  if (!response.ok) {
    throw new Error("Failed to fetch sites");
  }
  return response.json();
});

export const fetchTests = createAsyncThunk("data/fetchTests", async () => {
  const response = await fetch("http://localhost:3100/tests");
  if (!response.ok) {
    throw new Error("Failed to fetch tests");
  }
  return response.json();
});
