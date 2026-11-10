import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from './favourite'

export const store = configureStore({
    reducer: {
        favouriteMeals: favouritesReducer
    }
});

