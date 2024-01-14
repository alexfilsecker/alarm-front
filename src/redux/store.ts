import { combineReducers, configureStore } from '@reduxjs/toolkit';

import alarmsReducer from './slices/alarm/alarmsSlice';
import authReducer from './slices/auth/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  alarm: alarmsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
