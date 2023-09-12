import { TextField } from "@mui/material";
import { useState } from 'react'
import Button from '@mui/material/Button';
import {ThunkDispatch} from "@reduxjs/toolkit";
import { useDispatch, useSelector} from "react-redux"
import {fetchSearch, setCategory0, setKeyWord0, setSort0 } from "../redux/slices/books";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { RootState } from "../redux/store";
import ClearIcon from '@mui/icons-material/Clear';

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const keyWord0 = useSelector((state: RootState) => state.keyWord || '') as string;
    const [keyWord, setKeyWord] = useState(keyWord0)
    const searchHandler = (event: any) => {
        event.preventDefault()
        if(keyWord){
            dispatch(setSort0('relevance'))
            dispatch(setCategory0('All'))
            navigate(`/searchBooks/${keyWord}`)
            const keys = {
                keyWord: keyWord as string,
                sort: 'relevance'
            }
            dispatch(fetchSearch(keys))
            dispatch(setKeyWord0(keyWord))
        }
    }
    return ( 
        <header>
            <div className="header-inner">
                <Link to='/books'><h1 className="logo">BOOKS</h1></Link>
                <form onSubmit={(event)=>{searchHandler(event)}} style={keyWord?{marginRight: '-24px'}:{}}>
                    <TextField fullWidth label="Title" id="fullWidth" sx={{marginTop: '15px', width: '300pX'}} value={keyWord} onChange={(e)=>setKeyWord(e.target.value)}/>
                    <Button variant="contained" type="submit" sx={{marginTop: '16px', padding: '15px 25px', marginLeft:'15px'}}>Search</Button>
                    {keyWord&&<ClearIcon onClick={()=>{
                        setKeyWord('')
                        dispatch(setKeyWord0(''))
                    }} sx={{position: 'relative', left: '-150px', top:'15px', cursor: 'pointer', zIndex:'10'}}/>}
                </form>
            </div>
        </header>
     );
}

export default Header;