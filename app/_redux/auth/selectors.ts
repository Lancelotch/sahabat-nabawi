import { RootState } from "../store";

export const selectAuth = (state: RootState) => state.authReducer;
