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
      // Owner Routes
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

      getAllUsers: builder.query({
        query: () => {
          return {
            url: `/get/all/users`,
            method: "GET",
          };
        },
      }),

      // Album Routes
      getAllAlbums: builder.query({
        query: () => {
          return {
            url: `/get/album`,
            method: "GET",
          };
        },
      }),

      postNewAlbum: builder.mutation({
        query: (albumData) => {
          return {
            url: `/add/album`,
            method: "POST",
            body: albumData,
          };
        },
      }),

      updateAlbum: builder.mutation({
        query: (albumId, userId, dataToUpdate) => {
          return {
            url: `/update/album/${albumId}/user/${userId}`,
            method: "POST",
            body: dataToUpdate,
          };
        },
      }),

      shareAlbum: builder.mutation({
        query: (albumId, userId, emailData) => {
          return {
            url: `/share/album/${albumId}/user/${userId}`,
            method: "POST",
            body: emailData,
          };
        },
      }),

      deleteAlbum: builder.mutation({
        query: (albumId, userId) => {
          return {
            url: `/delete/album/${albumId}/user/${userId}`,
            method: "DELETE",
          };
        },
      }),

      // Image Routes
      getAllImages: builder.query({
        query: () => {
          return {
            url: `/get/all/images`,
            method: "GET",
          };
        },
      }),

      postImage: builder.mutation({
        query: (albumId, imageData) => {
          return {
            url: `/add/image/album/${albumId}`,
            method: "POST",
            body: imageData,
          };
        },
      }),

      getImageByFav: builder.query({
        query: () => {
          return {
            url: `/get/all/images/fav`,
            method: "GET",
          };
        },
      }),

      getImageByTags: builder.query({
        query: (albumId) => {
          return {
            url: `/albums/${albumId}/images`,
            method: "GET",
          };
        },
      }),

      updateImage: builder.mutation({
        query: (albumId, imageId, dataToUpdate) => {
          return {
            url: `/update/albums/${albumId}/images/${imageId}`,
            method: "POST",
            body: dataToUpdate,
          };
        },
      }),

      deleteImage: builder.mutation({
        query: (userId, albumId, imageId) => {
          return {
            url: `/delete/user/${userId}/album/${albumId}/image/${imageId}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useGetProfileInfoQuery,
  useGetAllUsersQuery,
  useGetAllAlbumsQuery,
  usePostNewAlbumMutation,
  useUpdateAlbumMutation,
  useShareAlbumMutation,
  useDeleteAlbumMutation,
  useGetAllImagesQuery,
  useGetImageByFavQuery,
  useGetImageByTagsQuery,
  usePostImageMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
} = apiSlice;

export default apiSlice;
