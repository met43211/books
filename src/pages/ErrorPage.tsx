import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function ErrorPage() {
    return ( 
        <div className="wrapper">
            <div className="error">
                <h1>404 Error</h1>
                <Link to='/books'><Button variant="contained">На главную</Button></Link>
            </div>
        </div>
     );
}

export default ErrorPage;