import React from "react";
import "../styles/AgentNavbar.css";

function AgentNavbar(){
    return (
        <div className="a-navbar">
            <div className="header">
                <p>Logo</p>
                <p>Agent Dashboard Portal</p>
            </div>

            <div className="a-nav-items">
                    <a>Home</a>
                    <a>My Tickets</a>
                    <a>Unassigned</a>
                    <a>Notifications</a>
                    <a>Performance</a>
                    <a>Help</a>
            </div>

            <div className="a-logout">
                <button>Logout</button>
            </div>

        </div>
    );
}

export default AgentNavbar;