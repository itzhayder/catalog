import { ICart } from "./types";
import { api } from "./api";

export const cartApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<ICart, number>({
            query: (userId) => `carts/user/${userId}`,
            transformResponse: (data) => {
                return {
                    id: 1,
                    userId: 1,
                    products: [],
                };
            },
        }),
        addItemToCart: builder.mutation<void, void>({
            query: () => ({
                url: "carts/7",
                method: "PATCH",
                body: {},
            }),
        }),
        removeItemFromCart: builder.mutation<void, void>({
            query: () => ({
                url: "carts/7",
                method: "PATCH",
                body: {},
            }),
        }),
        submitCart: builder.mutation({
            query: (cart) => ({
                url: "/cart/submit",
                method: "POST",
                body: cart,
            }),
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddItemToCartMutation,
    useRemoveItemFromCartMutation,
    useSubmitCartMutation,
} = cartApi;
