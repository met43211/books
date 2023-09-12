import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

const apiKey = 'AIzaSyAGXFEFeCjQOP8hya8dzMTI3M4Tmk-t4S0'

export const fetchBooks = createAsyncThunk('books/fetchBooks', async()=>{
    const {data} = await axios.get(`books/v1/volumes?q=*&maxResults=30&key=${apiKey}`) as any
    return data.items
})

interface SearchI{
    keyWord:string,
    sort: string,
    startPosition?: string
}

export const fetchSearch = createAsyncThunk('books/fetchSearch', async(keys:SearchI)=>{
    if(keys.hasOwnProperty('startPosition')){
        const {data} = await axios.get(`books/v1/volumes?q=${encodeURIComponent(keys.keyWord)}&orderBy=${keys.sort}&startIndex=${keys.startPosition}&maxResults=30&key=${apiKey}`) as any
        return data.items
    }
    else{
        const {data} = await axios.get(`books/v1/volumes?q=${encodeURIComponent(keys.keyWord)}&orderBy=${keys.sort}&maxResults=30&key=${apiKey}`) as any
        return data.items
    }
})

export const fetchOneBook = createAsyncThunk('films/fetchOneBook', async(id:any)=>{
    const {data} = await axios.get(`books/v1/volumes/${id}?key=${apiKey}`) as any
    return data
})

export const initalState = {
    books: {
        items: [],
        status: 'loading'
    },
    searchedBooks: {
        items: [],
        status: 'loading'
    },
    pickedBook:  {
        book: {} as any,
        status: 'loading'
    },
    keyWord: '',
    sort: 'relevance',
    category: 'All',
    startPosition: 0
}

const booksSlice = createSlice({
    name: 'books',
    initialState: initalState,
    reducers: {
        setKeyWord0: (state, action)=>{
            state.keyWord = action.payload
        },
        setSort0: (state, action)=>{
            state.sort = action.payload
        },
        setCategory0: (state, action)=>{
            state.category = action.payload
        },
        setStartPosition0: (state, action)=>{
            state.startPosition = action.payload
        }
    },
    extraReducers: {
        [fetchBooks.pending as any]: (state: any)=>{
            state.books.status = 'loading'
        },
        [fetchBooks.fulfilled as any]: (state: any, action: any)=>{
            state.books.items = action.payload
            state.books.status = 'loaded'
        },
        [fetchBooks.rejected as any]: (state: any)=>{
            state.books.items = []
            state.books.status = 'error'
        },
        [fetchSearch.pending as any]: (state: any)=>{
            state.searchedBooks.status = 'loading'
        },
        [fetchSearch.fulfilled as any]: (state: any, action: any)=>{
            state.searchedBooks.items = action.payload
            state.searchedBooks.status = 'loaded'
        },
        [fetchSearch.rejected as any]: (state: any)=>{
            state.searchedBooks.items = []
            state.searchedBooks.status = 'error'
        },
        [fetchOneBook.pending as any]: (state: any)=>{
            state.pickedBook.status = 'loading'
        },
        [fetchOneBook.fulfilled as any]: (state: any, action: any)=>{
            state.pickedBook.book = action.payload
            state.pickedBook.status = 'loaded'
        },
        [fetchOneBook.rejected as any]: (state: any)=>{
            state.pickedBook.book = {}
            state.pickedBook.status = 'error'
        }
    }
})
export const booksReducer = booksSlice.reducer
export const {setKeyWord0, setSort0, setCategory0, setStartPosition0} = booksSlice.actions