import { combineReducers, configureStore } from '@reduxjs/toolkit';
import citySlice from './citySlice';
import cityWeatherSlice from './cityWeatherSlice';

const rootReducer = combineReducers({
    city: citySlice,
    cityWeather: cityWeatherSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
