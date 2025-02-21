import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_URL;

const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers, { endpoint }) => {
      const jwtToken = localStorage.getItem("picShelf_access_token");

      const protectedRoutes = ["getProfileInfo"];

      if (jwtToken && protectedRoutes.includes(endpoint)) {
        headers.set("Authorization", `${jwtToken}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => {
    return {
      getProfileInfo: builder.query({
        query: () => {
          return {
            url: "/get/profile",
            method: "GET",
          };
        },

        transformResponse: (data) => {
          return data?.user?.mongoId;
        },
      }),
    };
  },
});

export const { useGetProfileInfoQuery } = apiSlice;

export default apiSlice;
