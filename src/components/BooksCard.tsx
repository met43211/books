import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface BooksCardI{
    name: string,
    categories: string[],
    authors: string[],
    posterUrlPreview: any,
    _id: string
}

function BooksCard({name, categories, authors, posterUrlPreview, _id}: BooksCardI) {
    const navigate = useNavigate()
    const handleChooseBook = ()=>{
      navigate(`/books/${_id}`)
    }
    if(!name){
      return
    }
    return ( 
        <Card sx={{ maxWidth: '380px', width:'100%', marginTop: '20px', display:'flex', flexDirection:'column', justifyContent:'space-between'}} className='card'>
        <CardMedia
          component="img"
          alt="prewiew"
          sx={{maxWidth: '188px', margin: '30px 100px 0px 100px'}}
          image={posterUrlPreview?posterUrlPreview.thumbnail:'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'}
        />
        <CardContent>
        {categories&&<Typography variant="body2" color="text.secondary">
              {categories[0]}
            </Typography>}
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {authors&&authors.map((author, index)=><span key={index}>{author}</span>)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>{handleChooseBook()}}>More info</Button>
        </CardActions>
      </Card>
     );
}

export default BooksCard;