import React from "react";
import { Link } from "react-router-dom";

function TicketNavbar(){
    return(
        <div className="ticket-navbar">
            <nav>
                <Link to="/home">Home</Link>
                <Link to="/raisetickets">Raise a Ticket</Link>
                <Link to="/mytickets">My Tickets</Link>
                <Link to="/help">Help</Link>
            </nav>
        </div>
    );
}
export default TicketNavbar;