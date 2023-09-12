import { useSelector } from "react-redux";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { RootState} from '../redux/store'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import BooksCard from "../components/BooksCard";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState, useEffect} from 'react'
import { fetchSearch, setCategory0, setKeyWord0, setSort0} from "../redux/slices/books";
import { useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';

function SearchBooksPage() {
    const books = useSelector((state: RootState)=> state.searchedBooks)
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const booksList = Object.assign(books.items)
    const isLoading = books.status === 'loading'
    const isError = books.status === 'error'
    const {keyWord} = useParams()
    const category0 = useSelector((state: any)=> state.category)
    const [category, setCategory] = useState(category0)
    const sort0 = useSelector((state: any)=> state.sort)
    const [sort, setSort] = useState(sort0)
    const [filteredBooks, setFilteredBooks] = useState(booksList)
    const [startPosition, setStartPosition] = useState(0)
    const sortFunction = ()=>{
        if(category!='All'){
            setFilteredBooks((prev:any) => prev.filter((obj: any)=>{
            if(obj.volumeInfo.categories){
                return obj.volumeInfo.categories[0]===category
            }
            }))
        }
    }
    useEffect(()=>{
        dispatch(setKeyWord0(keyWord))
    }, [])
    useEffect(()=>{
        setStartPosition(0)
    }, [keyWord])
    useEffect(()=>{
        dispatch(setSort0(sort))
        const keys = {
            keyWord: keyWord as string,
            sort,
            startPosition: startPosition.toString()
        }
        dispatch(fetchSearch(keys))
        setFilteredBooks(booksList)
    }, [sort])
    useEffect(()=>{
        setFilteredBooks(booksList)
        setSort(sort0)
        setCategory(category0)
        sortFunction()
    }, [books])
    useEffect(()=>{
        dispatch(setCategory0(category))
        setFilteredBooks(booksList)
        sortFunction()
    }, [category])
    if (isLoading){
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
                    <div className="main filter">
                        <FormControl sx={{maxWidth: '200px', width: '100%', marginRight: '10px'}}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Category"
                                onChange={(e)=>setCategory(e.target.value)}
                            >
                                <MenuItem value={'All'}>All</MenuItem>
                                <MenuItem value={'Art'}>Art</MenuItem>
                                <MenuItem value={'Biography'}>Biography</MenuItem>
                                <MenuItem value={'Computers'}>Computers</MenuItem>
                                <MenuItem value={'History'}>History</MenuItem>
                                <MenuItem value={'Medical'}>Medical</MenuItem>
                                <MenuItem value={'Poetry'}>Poetry</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{maxWidth: '200px', width: '100%', marginRight: '10px'}}>
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sort}
                                label="Sort"
                                onChange={(e)=>setSort(e.target.value)}
                            >
                                <MenuItem value={'relevance'}>relevance</MenuItem>
                                <MenuItem value={'newest'}>newest</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="main">
                    <Button variant="contained" sx={{marginTop: '16px', padding: '15px 25px'}} disabled={startPosition===0} onClick={()=>{
                        setStartPosition((prev:number)=>prev-=30)
                        const keys = {
                            keyWord: keyWord as string,
                            sort,
                            startPosition: (startPosition-30).toString()
                        }
                        dispatch(fetchSearch(keys))
                    }}>Prev Page</Button>
                    </div>
                    <div className={'main'}>
                        {booksList?
                            filteredBooks.map((obj: any)=><BooksCard key={obj.id} _id={obj.id} name={obj.volumeInfo.title} categories={obj.volumeInfo.categories} authors={obj.volumeInfo.authors} posterUrlPreview={obj.volumeInfo.imageLinks}/>):
                            <h3>Loading Error</h3>
                        }
                        {filteredBooks.length===0&&<h3>
                            No books
                            </h3>}
                    </div>
                    <div className="main">
                    <Button variant="contained" sx={{marginTop: '16px', padding: '15px 25px'}} onClick={()=>{
                        setStartPosition((prev:number)=>prev+=30)
                        const keys = {
                            keyWord: keyWord as string,
                            sort,
                            startPosition: (startPosition+30).toString()
                        }
                        dispatch(fetchSearch(keys))
                    }}>Next Page</Button>
                    </div>
                </div>
            <Footer/>
        </>
     );
}

export default SearchBooksPage;