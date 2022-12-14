import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Cities = {
    name: string;
    country: string;
    state: string;
    lat: number;
    lon: number;
};

const citySlice = createSlice({
    name: 'city',
    initialState: [] as Cities[],
    reducers: {
        addCity: (state, action: PayloadAction<Cities>) => {
            Object.assign(state, action.payload);
            console.log('addCity', action.payload);
        },
    },
});

export const { addCity } = citySlice.actions;
export default citySlice.reducer;
