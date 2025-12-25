import React, { useState } from "react";
import TicketNavbar from "../components/TicketNavbar";
import "../styles/Custhome.css";
import { Route, useNavigate, useLocation } from "react-router-dom";


function Custhome(){
    const loc = useLocation();
    const name = loc.state?.name;
    const navigate = useNavigate();
    // const [name, setName] = useState("");
    return (
        <div className="body">
            <TicketNavbar/>
            <div className="container">
                {/* <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route to="/raisetickets" element={<Raiseticket/>}/>
                    <Route to="/mytickets" element={<Mytickets/>}/>
                    <Route to="/help" element={<Help/>}/>
                </Routes> */}
                <div className="greeting">
                    <div className="welcome">
                        <h1>Welcome {name}</h1>
                        <h2>How can we help you today?</h2>
                    </div>

                    <div className="actions">
                        <div className="card"
                        onClick={()=>{navigate("/customer/raise-ticket")}}
                        >
                        <h2>Raise a ticket</h2>
                        <p>Report an issue / request help</p>
                        </div>

                        <div className="card"
                        onClick={()=>{navigate("/customer/my-tickets")}}
                        >
                        <h2>View my tickets</h2>
                        <p>View and track your existing tickets</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Custhome;