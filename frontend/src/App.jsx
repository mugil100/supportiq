import React,{useState} from 'react';
import "./styles/LoginSignUp.css";
import LS_cust from './pages/customer/LS_cust';
import LS_Reps from './pages/agent/LS_Reps';
import Mytickets from "./pages/customer/Mytickets";
import Custhome from "./pages/customer/Custhome";
import Raiseticket from "./pages/customer/Raiseticket";
import ViewTicket from "./pages/customer/ViewTicket";
import {Routes,Route} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import AgentHome from './pages/agent/AgentHome';
import AgentTickets from "./pages/agent/AgentTickets";

function App(){
    return (
        <Routes>
            <Route path="/" element={<LS_cust/>}/>
            <Route path="/agent" element={<LS_Reps/>}/>
            <Route path="/chome" element={
                <PrivateRoute> 
                    <Custhome/>
                </PrivateRoute>
                }/>
            <Route path="/mytickets" element={
                <PrivateRoute> 
                    <Mytickets/>
                </PrivateRoute>
                }/>
            <Route path="/raiseticket" element={
                <PrivateRoute> 
                    <Raiseticket/>
                </PrivateRoute>
                }/>
            <Route path="/ticket/:id" element={
                <PrivateRoute>
                    <ViewTicket/>
                </PrivateRoute>
            }/>
            <Route path="/agent/ahome" element={
                <PrivateRoute role='agent'>
                    <AgentHome/>
                </PrivateRoute>
            }/>
            <Route path='/agent/tickets/:status' element={
                <PrivateRoute>
                    <AgentTickets/>
                </PrivateRoute>
            }
            />

            {/* <Route path="/agent/mhome" element={
                <PrivateRoute role='manager'>
                    <ManagerHome/>
                </PrivateRoute>
            }/> */}
        </Routes> 
);
}
export default App;