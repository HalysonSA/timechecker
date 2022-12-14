import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type WeatherForecast = {
    clounds: {
        all: number;
    };
    dt: number;
    dt_txt: string;
    main: {
        feels_like: number;
        grnd_level: number;
        humidity: number;
        pressure: number;
        sea_level: number;
        temp: number;
        temp_kf: number;
        temp_max: number;
        temp_min: number;
    };
    weather: {
        description: string;
        icon: string;
        id: number;
        main: string;
    }[];
    wind: {
        deg: number;
        speed: number;
        gust: number;
    };
};

export type City = {
    list: WeatherForecast[];
    city: {
        name: string;
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
};

const cityWeatherSlice = createSlice({
    name: 'cityWeather',
    initialState: {} as City,
    reducers: {
        addCityWeather: (state, action: PayloadAction<City>) => {
            Object.assign(state, action.payload);
        },
    },
});

export const { addCityWeather } = cityWeatherSlice.actions;

export default cityWeatherSlice.reducer;
