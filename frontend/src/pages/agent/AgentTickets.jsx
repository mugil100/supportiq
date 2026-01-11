import React, { useEffect } from "react";
import axios from "../../api/axios";
import AgentNavbar from "./AgentNavbar";

function AgentTickets(){

    const [filter, setFilter] = useState("assigned");
    const [tickets, setTickets] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        axios.get(`/agent/agenttickets?status=${filter}`)
        .then(res=>{
            setTickets(res.data);
            setLoading(false);
        })
        .catch(()=>setLoading(false));
    },[filter]);

    return(
        <>
        <AgentNavbar/>
        <div className="agent-tpage">
            <h2>My Tickets</h2>
            <div className="ticket-filters"></div>
                <button onClick={()=>{setFilter("assigned")}}>Assigned</button>
                <button onClick={()=>{setFilter("inprogress")}}>In Progress</button>
                <button onClick={()=>{setFilter("unreplied")}}>Unreplied</button>
                <button onClick={()=>{setFilter("resolved")}}>Resolved</button>
            </div>

        {loading && <p>Loading Tickets...</p>}

            <div className="ticket-table">
                {tickets.map(t=>(
                    <div className="ticket-row" ket={t.id}>
                        <div><b>{t.subject}</b></div>
                        <div>{t.customerName}</div>
                        <div>{new Date (t.createdAt).toLocaleString()}</div>
                        <div className={`Status ${t.status}`}>{t.status}</div>
                    </div>
                ))}
            </div>
        </>
    );

}

export default AgentTickets;