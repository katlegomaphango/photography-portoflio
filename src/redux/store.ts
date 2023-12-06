import { configureStore } from "@reduxjs/toolkit";
import { unsplashAPI } from "./services/unsplash";

export const store = configureStore({
    reducer: {
        [unsplashAPI.reducerPath]: unsplashAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(unsplashAPI.middleware)
})