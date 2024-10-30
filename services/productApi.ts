import { IProduct } from "./types";
import { api } from "./api";

export const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProductList: builder.query<IProduct[], any>({
            query: (params = {}) => ({
                url: "products",
                method: "GET",
                params: params,
            }),
        }),
        getProductDetails: builder.query<IProduct, string>({
            query: (id) => `products/${id}`,
        }),
    }),
});

export const { useGetProductListQuery, useGetProductDetailsQuery } = productApi;
