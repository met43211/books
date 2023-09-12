import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { RootState} from '../redux/store'
import { fetchBooks, setKeyWord0 } from "../redux/slices/books";
import {ThunkDispatch} from "@reduxjs/toolkit";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BooksCard from "../components/BooksCard";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function MainPage() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const books = useSelector((state: RootState)=> state.books)
    const isLoading = books.status === 'loading'
    const isError = books.status === 'error'
    const booksList = Object.assign(books.items)
    useEffect(()=>{
        dispatch(setKeyWord0(''))
        dispatch(fetchBooks())
    }, [])
    if(isLoading){
        return(
            <Box sx={{ display: 'flex', position: 'absolute', top: '50%', left: '50%',  transform: 'translate(-50%, -50%)'}}>
                <CircularProgress />
            </Box>
        )
    }
    if(isError){
        return(
            <h1 className="error-h">Loading Error</h1>
        )
    }
    return ( 
        <>
            <Header/>
            <div className="wrapper">
                <div className="main"><h1>Top books</h1></div>
                <div className="main">
                    {isLoading?
                        <div className="loading">
                            <Box sx={{ display: 'flex', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                                <CircularProgress />
                            </Box>
                        </div>:
                        booksList?
                            booksList.map((obj: any)=><BooksCard key={obj.id} _id={obj.id} name={obj.volumeInfo.title} categories={obj.volumeInfo.categories} authors={obj.volumeInfo.authors} posterUrlPreview={obj.volumeInfo.imageLinks}/>):
                            <h3>Loading Error</h3>
                    }
                </div>
            </div>
            <Footer/>
        </>
     );
}

export default MainPage;