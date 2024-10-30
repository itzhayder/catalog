import { cartApi } from "@/services/cartApi";
import { ICartProduct, IProduct } from "@/services/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type TCartState = {
    items: {
        [key: number]: ICartProduct;
    };
    totalQuantity: number;
    totalPrice: number;
    status: string;
    error: any;
};

const initialState: TCartState = {
    items: {},
    totalQuantity: 0,
    totalPrice: 0,
    status: "idle",
    error: null,
};

// Async thunk for adding an item to the cart
export const addItem = createAsyncThunk(
    "cart/addItem",
    async (product: IProduct, { dispatch, rejectWithValue }) => {
        try {
            await dispatch(cartApi.endpoints.addItemToCart.initiate()).unwrap();
            return product as ICartProduct;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);

// Async thunk for removing an item from the cart
export const removeItem = createAsyncThunk(
    "cart/removeItem",
    async (product: IProduct, { dispatch, rejectWithValue }) => {
        try {
            await dispatch(
                cartApi.endpoints.removeItemFromCart.initiate(),
            ).unwrap();
            return product as ICartProduct;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);

// Cart slice with reducers to handle local state and async thunks
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = {};
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItem.fulfilled, (state, action) => {
                const product = action.payload;
                const existingItem = state.items[product.id];

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    state.items[product.id] = { ...product, quantity: 1 };
                }

                state.totalQuantity += 1;
                state.totalPrice += product.price;
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                const product = action.payload;
                const existingItem = state.items[product.id];

                if (existingItem === undefined) return;

                state.totalQuantity -= 1;
                state.totalPrice -= existingItem.price;

                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    delete state.items[product.id];
                }
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice;
