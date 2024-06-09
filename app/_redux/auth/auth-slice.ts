import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isOpenModal: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isOpenModal: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    updateAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    updateOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
  },
});

export const { updateAuthentication, updateOpenModal } = authSlice.actions;
export default authSlice.reducer;
