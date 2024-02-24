import { createSlice } from "@reduxjs/toolkit";

const drSlice = createSlice({
    name: "drivers",
    initialState: {
        drivers: [],
    },
    reducers: {
        setDrivers(state, action) {
            state.drivers = action.payload;
        },
        addDriver(state, action) {
            state.drivers.push(action.payload);
        },
    },
});

export const { setDrivers, addDriver } = drSlice.actions;

export default drSlice.reducer;
