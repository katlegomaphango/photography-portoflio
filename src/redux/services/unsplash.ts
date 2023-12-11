import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const unsplashAPI = createApi({
    reducerPath: 'unsplashAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.unsplash.com/',
        //credentials: 'include',
        
    }),
    endpoints: (builder) => ({
        getRandomPhoto: builder.query({
            query: (args) => {

                const { clientID, count } = args;

                return {
                    url: `/photos/random?client_id=${clientID}&count=${count}`
                }

            }
        })
    })
})

export const {
    useGetRandomPhotoQuery,
} = unsplashAPI