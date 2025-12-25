import React from "react";

function Footer(){
    const year = new Date().getFullYear();
    return (
        <footer class="site-footer">
            <div class="footer-container">
                <div class="footer-brand">
                <h3>SupportIQ</h3>
                <p>Building clean & modern web experiences.</p>
                </div>

                {/* <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Projects</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                </div> */}

                <div class="footer-social">
                <h4>Connect</h4>
                <ul>
                    <li><a href="#">GitHub</a></li>
                    <li><a href="#">LinkedIn</a></li>
                    <li><a href="#">Twitter</a></li>
                </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© {year} SupportIQ. All rights reserved.</p>
            </div>
        </footer>

    );

}

export default Footer;