import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_URL;

const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: ["GetAllAlbums", "GetAllImages", "GetSingleAlbum"],
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

        providesTags: ["GetAllAlbums"],
      }),

      // Single Album Route
      getSingleAlbum: builder.query({
        query: (albumId) => {
          return {
            url: `/get/single/album/${albumId}`,
            method: "GET",
          };
        },

        providesTags: ["GetSingleAlbum"],
      }),

      postNewAlbum: builder.mutation({
        query: (albumData) => {
          return {
            url: `/add/album`,
            method: "POST",
            body: albumData,
          };
        },

        invalidatesTags: ["GetAllAlbums"],
      }),

      updateAlbum: builder.mutation({
        query: (updatedData) => {
          return {
            url: `/update/album/${updatedData?._id}/user/${updatedData?.userId}`,
            method: "POST",
            body: updatedData,
          };
        },

        invalidatesTags: ["GetAllAlbums"],
      }),

      shareAlbum: builder.mutation({
        query: ({ albumId, userId, dataToShare }) => {
          return {
            url: `/share/album/${albumId}/user/${userId}`,
            method: "POST",
            body: dataToShare,
          };
        },

        invalidatesTags: ["GetAllAlbums"],
      }),

      deleteAlbum: builder.mutation({
        query: ({ userId, album }) => {
          return {
            url: `/delete/album/${album?._id}/user/${userId}`,
            method: "DELETE",
          };
        },

        invalidatesTags: ["GetAllAlbums"],
      }),

      // Image Routes
      getAllImages: builder.query({
        query: () => {
          return {
            url: `/get/all/images`,
            method: "GET",
          };
        },

        providesTags: ["GetAllImages"],
      }),

      getSingleImage: builder.query({
        query: (imageId) => {
          return {
            url: `/get/single/image/${imageId}`,
            method: "GET",
          };
        },
      }),

      postImage: builder.mutation({
        query: (dataToPost) => {
          let albumId;
          dataToPost.forEach((value, key) => {
            if (key === "albumId") {
              albumId = value;
            }
          });

          return {
            url: `/add/image/album/${albumId}`,
            method: "POST",
            body: dataToPost,
          };
        },

        invalidatesTags: ["GetAllAlbums", "GetAllImages", "GetSingleAlbum"],
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
        query: (dataToUpdate) => {
          console.log(dataToUpdate);

          return {
            url: `/update/albums/${dataToUpdate.albumId}/images/${dataToUpdate._id}`,
            method: "POST",
            body: dataToUpdate,
          };
        },

        invalidatesTags: ["GetSingleAlbum"],
      }),

      deleteImage: builder.mutation({
        query: ({ userId, albumId, imageId }) => {
          return {
            url: `/delete/user/${userId}/album/${albumId}/image/${imageId}`,
            method: "DELETE",
          };
        },

        invalidatesTags: ["GetAllAlbums"],
      }),
    };
  },
});

export const {
  useGetProfileInfoQuery,
  useGetAllUsersQuery,
  useGetAllAlbumsQuery,
  useGetSingleAlbumQuery,
  usePostNewAlbumMutation,
  useUpdateAlbumMutation,
  useShareAlbumMutation,
  useDeleteAlbumMutation,
  useGetAllImagesQuery,
  useGetSingleImageQuery,
  useGetImageByFavQuery,
  useGetImageByTagsQuery,
  usePostImageMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
} = apiSlice;

export default apiSlice;
