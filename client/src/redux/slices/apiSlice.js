import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { logout } from "./authSlice";

const connectionString = "/api/v0.0.0-alpha",
  baseQuery = fetchBaseQuery({
    baseUrl: connectionString,
  });

async function baseQueryWithAuth(args, api, extra) {
  const result = await baseQuery(args, api, extra);

  if (result?.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({}),
});
