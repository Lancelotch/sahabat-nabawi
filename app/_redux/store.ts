import { configureStore } from "@reduxjs/toolkit";
import authReducer, { updateAuthentication } from "./auth/auth-slice";
import Cookies from "js-cookie";

export const makeStore = () => {
  const store = configureStore({
    reducer: { authReducer },
  });

  // Hydrate the store from cookies
  const isAuthenticatedFromCookies = !!Cookies.get("accessToken");
  store.dispatch(updateAuthentication(isAuthenticatedFromCookies));
  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
