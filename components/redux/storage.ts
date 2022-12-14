import { combineReducers, configureStore } from '@reduxjs/toolkit';
import citySlice from './citySlice';

const rootReducer = combineReducers({
    city: citySlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
