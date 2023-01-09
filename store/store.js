import { configureStore } from '@reduxjs/toolkit'
import StoreSlice from '../src/StoreSlice'

export const store = configureStore({
    reducer: {
        counter: StoreSlice,
    },
}) 