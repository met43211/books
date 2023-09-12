import { Link } from "react-router-dom";

function Footer() {
    return ( 
        <footer>
            <div className="footer-inner">
                <Link to={'/books'}><h1 className="logo">BOOKS</h1></Link>
                <a href="https://github.com/met43211" target="_blank"><h3>by met43211</h3></a>
            </div>
        </footer>
     );
}

export default Footer;