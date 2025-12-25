import React from "react";
import "../styles/Footer.css";

function Footer(){
    const year = new Date().getFullYear();
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h3>SupportIQ</h3>
                    <p>Building clean & modern web experiences.</p>
                </div>

                <div className="footer-social">
                    <h4>Connect</h4>
                    <ul>
                        <li><a href="#">GitHub</a></li>
                        <li><a href="#">LinkedIn</a></li>
                        <li><a href="#">Twitter</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {year} SupportIQ. All rights reserved.</p>
            </div>
        </footer>
    );
}


export default Footer;