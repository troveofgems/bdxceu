import {apiSlice} from "./apiSlice";

export const feDataApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUSGS: builder.query({
            query: () => ({
                url: "/server/usgs",
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const {
    useGetUSGSQuery,
} = feDataApiSlice;

export default feDataApiSlice.reducer;