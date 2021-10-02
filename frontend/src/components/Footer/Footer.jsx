import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo-footer.png';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="toTop-fon">
                <div className="toTop" />
            </div>

            <div className="footer-block-t">
                <ul className="f-menu">
                    <li>
                        <a href="/">Registration</a>
                    </li>
                    <li>
                        <a href="/">players</a>
                    </li>
                    <li>
                        <a href="/">guilds</a>
                    </li>
                    <li>
                        <a href="/">discussions</a>
                    </li>
                    <li>
                        <a href="/">forum</a>
                    </li>
                    <li>
                        <a href="/">About us</a>
                    </li>
                    <li>
                        <a href="/">Home</a>
                    </li>
                </ul>
            </div>

            <div className="footer-end">
                <div className="footer-block-coperite">
                    <div className="footer-logo">
                        <Link to="/">
                            <img src={Logo} alt="" />
                        </Link>
                    </div>
                    <div className="copyright">
                        Copyright 2020 © <a href="/">xiahLegends.com</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
