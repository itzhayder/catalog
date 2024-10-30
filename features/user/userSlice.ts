import { createSlice } from "@reduxjs/toolkit";
import { LocationObject } from "expo-location";

type TUser = {
    location: LocationObject | {};
};

const initialState: TUser = {
    location: {},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
    },
});

export const { setLocation } = userSlice.actions;
export default userSlice;
