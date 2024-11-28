import { configureStore } from '@reduxjs/toolkit';
import {apiSlice} from "./redux/slices/apiSlice";

import authSliceReducer from "./redux/slices/authSlice";
import {SiteSettingsReducer} from "./redux/slices/siteSettingsSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        siteSettings: SiteSettingsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;