import { Link } from "react-router-dom";
const Navbar = () => {
   
    return (
        <nav className="navbar navbar-light bg-light nav primary">
            <Link to="/"><div>DP Contest</div></Link>
            <a href="https://dp.turntbloke.tech/register"><button type="button" class="btn btn-light register">Register</button></a>
        </nav>
    );
}

export default Navbar;
