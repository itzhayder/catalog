import appSlice from "@/features/app/appSlice";
import cartSlice from "@/features/cart/cartSlice";
import userSlice from "@/features/user/userSlice";
import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: [api.reducerPath], // Only persist the RTK Query cache
};

const rootReducer = combineReducers({
    user: userSlice.reducer,
    app: appSlice.reducer,
    cart: cartSlice.reducer,
    [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (gDM) =>
        gDM({ serializableCheck: false }).concat(api.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
