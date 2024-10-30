import { createSlice } from "@reduxjs/toolkit";

type TState = {
    productFilter: {
        sort?: "asc" | "desc";
    };
};

const initialState: TState = {
    productFilter: {},
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setProductFilter: (state, action) => {
            state.productFilter = { ...state.productFilter, ...action.payload };
        },
        clearProductFilter: (state) => {
            state.productFilter = {};
        },
    },
});

export const { setProductFilter, clearProductFilter } = appSlice.actions;
export default appSlice;
