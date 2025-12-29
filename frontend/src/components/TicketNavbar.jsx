import React from "react";
import { Link } from "react-router-dom";
import "../styles/TicketNavbar.css";

function TicketNavbar(){
    return(
        <div className="ticket-navbar">
            <nav className="ticket-nav">
                <Link to="/chome" className="nav-item">Home</Link>
                <Link to="/raiseticket" className="nav-item">Raise a Ticket</Link>
                <Link to="/mytickets" className="nav-item">My Tickets</Link>
                <Link to="/help" className="nav-item">Help</Link>
            </nav>
        </div>
    );
}
export default TicketNavbar;