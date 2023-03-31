import { Link } from "react-router-dom";

const Footer = ({ darkModeValue }) => {
    return (
        <footer className="footer p-10 bg-base-100 text-neutral-content">
            <div>
                <span className="footer-title">BUDGET MANAGEMENT</span>
                <Link to='/signup' className="link link-hover">Sign up</Link>
                <Link to='/login' className="link link-hover">Log in</Link>
                <Link to='/dashboard' className="link link-hover">Dashboard</Link>
                <a className="link link-hover">Budget categories</a>
                <a className="link link-hover">Transaction history</a>
            </div>
            <div>
                <span className="footer-title">RESOURCES</span>
                <a className="link link-hover">Blog articles</a>
                <a className="link link-hover">FAQ</a>
                <a className="link link-hover">Tutorials</a>
                <a className="link link-hover">Budget management tools</a>
                <a className="link link-hover">Premium account</a>
            </div>
            <div>
                <span className="footer-title">ABOUT US</span>
                <a className="link link-hover">Our mission</a>
                <a className="link link-hover">The team</a>
                <a className="link link-hover">Testimonials</a>
                <a className="link link-hover">Partnerships</a>
            </div>
            <div>
                <span className="footer-title">LEGAL</span>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookies</a>
                <a className="link link-hover">Copyright</a>
            </div>
        </footer>

    );
}

export default Footer; 