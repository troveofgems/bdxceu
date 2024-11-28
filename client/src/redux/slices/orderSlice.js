import {apiSlice} from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBDXCEUOrder: builder.mutation({
            query: (order) => ({
                url: "/orders",
                method: "POST",
                body: order
            })
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `/orders/${orderId}`,
            }),
            keepUnusedDataFor: 5
        }),
        getPaypalClientId: builder.query({
            query: () => ({
                url: "/payment-method/config/paypal"
            }),
            keepUnusedDataFor: 5
        }),
        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `/orders/${orderId}/pay`,
                method: "POST",
                body: { ...details }
            })
        }),
        fetchUserOrders: builder.query({
            query: () => ({
                url: `/orders`,
            })
        }),
        fetchAllOrders: builder.query({
            query: () => ({
                url: `/admin/orders`,
            })
        }),
        fetchOrderByIdForAdmin: builder.query({
            query: (orderId) => ({
                url: `/admin/orders/${orderId}`,
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const {
    useCreateBDXCEUOrderMutation, useGetOrderDetailsQuery,
    useFetchOrderByIdForAdminQuery,
    usePayOrderMutation, useGetPaypalClientIdQuery,
    useFetchUserOrdersQuery,
    useFetchAllOrdersQuery
} = ordersApiSlice;