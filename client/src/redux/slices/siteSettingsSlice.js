import {createSlice} from "@reduxjs/toolkit";

import {apiSlice} from "./apiSlice";

const initialState = {
    footerData: localStorage.getItem('footerData') ? JSON.parse(localStorage.getItem('footerData')) : null,
}

const siteSettingsSlice = createSlice({
    name: "footer",
    initialState,
    reducers: {
        setFooterData: (state, action) => {
            state.footerData = action.payload;
            localStorage.setItem('footerData', JSON.stringify(action.payload));
        }
    }
});

export const { setFooterData } = siteSettingsSlice.actions;

export const SiteSettingsReducer = siteSettingsSlice.reducer;

export const siteSettingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchSiteSettings: builder.query({
            query: () => ({
                url: `/site-settings`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateSiteSettings: builder.mutation({
            query: (updates) => ({
                url: `/admin/site-settings`,
                method: "PUT",
                body: updates
            })
        })
    })
});

export const {
    useFetchSiteSettingsQuery,
    useUpdateSiteSettingsMutation
} = siteSettingsApiSlice;

export default siteSettingsApiSlice.reducer;