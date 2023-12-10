import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const unsplashAPI = createApi({
    reducerPath: 'unsplashAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.unsplash.com/',
        credentials: 'include',
        
    }),
    endpoints: (builder) => ({
        getRandomHeroImage: builder.query({query: () => '/'})
    })
})

export const {
    useGetRandomHeroImageQuery,
} = unsplashAPI