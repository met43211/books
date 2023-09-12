    import { booksReducer } from "./slices/books";
    import { configureStore } from '@reduxjs/toolkit'

    const store = configureStore(
        {
            reducer: booksReducer
        },
    )

    export type RootState = ReturnType<typeof store.getState>

    export default store