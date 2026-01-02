import React,{ useEffect, useState} from "react";
import axios from "../api/axios";
// import AgentNavbar from "../components/AgentNavbar";
import "../styles/AgentHome.css";
import Footer from "../components/Footer";
function AgentHome(){
    const [stats, setStats] = useState({});
    useEffect(()=>{
        axios.get("agent/stats"
            .then(res=>setStats(res.data)))
            ;},[]);

    return(
        <>
            <AgentNavbar/>
                <div className="stats-row">
                    <div className="card">
                        Assigned <br/> <b>{stats.assigned}</b>
                    </div>
                    <div className="card">
                        In progress <br/> <b>{stats.inProgress}</b>
                    </div>
                    <div className="card">
                        Unreplied <br/> <b>{stats.unreplied}</b>
                    </div>
                    <div className="card">
                        Resolved <br/> <b>{stats.resolved}</b>
                    </div>
                </div>
            <Footer/>
        </>
    );
}

export default AgentHome;
