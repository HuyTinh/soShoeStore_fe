import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 border-t-2 text-base-content">
                <nav>
                    <span className="footer-title">Services</span>
                    <Link to={''} className="link link-hover">Branding</Link>
                    <Link to={''} className="link link-hover">Design</Link>
                    <Link to={''} className="link link-hover">Marketing</Link>
                    <Link to={''} className="link link-hover">Advertisement</Link>
                </nav>
                <nav>
                    <span className="footer-title">Company</span>
                    <Link to={''} className="link link-hover">About us</Link>
                    <Link to={''} className="link link-hover">Contact</Link>
                    <Link to={''} className="link link-hover">Jobs</Link>
                    <Link to={''} className="link link-hover">Press kit</Link>
                </nav>
                <nav>
                    <span className="footer-title">Legal</span>
                    <Link to={''} className="link link-hover">Terms of use</Link>
                    <Link to={''} className="link link-hover">Privacy policy</Link>
                    <Link to={''} className="link link-hover">Cookie policy</Link>
                </nav>
                <form>
                    <span className="footer-title">Newsletter</span>
                    <fieldset className="form-control w-80">
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="join">
                            <input type="text" placeholder="username@site.com" className="input input-bordered join-item" />
                            <button className="btn btn-primary join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </footer>
        </div>
    )
}

export default Footer