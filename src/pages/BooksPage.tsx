import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchOneBook } from "../redux/slices/books";
import {ThunkDispatch} from "@reduxjs/toolkit";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BooksPage() {
    const navigate = useNavigate()
    const {id} = useParams()
    const pickedBook = useSelector((state: RootState)=> state.pickedBook.book.volumeInfo)
    const status = useSelector((state: RootState)=> state.pickedBook.status)
    let isLoading = status === 'loading'
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    useEffect(()=>{
        dispatch(fetchOneBook(id))
    }, [])
    if(isLoading){
        return(
            <Box sx={{ display: 'flex', position: 'absolute', top: '50%', left: '50%',  transform: 'translate(-50%, -50%)'}}>
                <CircularProgress />
            </Box>
        )
    }
    return (
        <>
            <Header/>
                <div className="wrapper">
                    <div className="main mb">
                        <Button variant="contained" className="btn" onClick={()=>{navigate(-1)}}><ArrowBackIcon/></Button>
                    </div>
                    <div className="main">
                        <Card className="film-page-card" sx={{ maxWidth: '1440px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <CardMedia
                                component="img"
                                height="100%"
                                sx={{ maxWidth: '48%' }}
                                image={pickedBook.imageLinks?pickedBook.imageLinks.medium:'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'}
                                alt="book"
                                />
                                <CardContent sx={{width: '48%', marginRight: '15px' }}>
                                    <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                                        {pickedBook.categories&&pickedBook.categories.map((category: string, index: number)=><span key={index}>{category}</span>)}
                                    </Typography>
                                    <Typography gutterBottom variant="h2" component="div">
                                        {pickedBook.title}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                                        {pickedBook.authors&&pickedBook.authors.map((author: string, index: number)=><span key={index}>{author}</span>)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{marginBottom:'15px', marginTop:'30px'}}>
                                        {pickedBook.description}
                                    </Typography>
                                </CardContent>
                        </Card>
                    </div>
                </div>
            <Footer/>
        </>
    );
}

export default BooksPage;