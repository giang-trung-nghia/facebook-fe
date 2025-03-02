import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { authReducerSlice } from "./slices/auth/authSlice";
import loadingReducer from "./slices/loadingSlice";
import chatReducer from "./slices/chatSlice";

const rootReducer = combineReducers({
  auth: authReducerSlice,
  loading: loadingReducer,
  chat: chatReducer
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['loading'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
