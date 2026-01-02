import React,{useState} from 'react';
import "./styles/LoginSignUp.css";
import LS_cust from './pages/LS_cust';
import LS_Reps from './pages/LS_Reps';
import Mytickets from "./pages/Mytickets";
import Custhome from "./pages/Custhome";
import Raiseticket from "./pages/Raiseticket";
import ViewTicket from "./pages/ViewTicket";
import {Routes,Route} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import AgentHome from './pages/AgentHome';

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
            {/* <Route path="/agent/mhome" element={
                <PrivateRoute role='manager'>
                    <ManagerHome/>
                </PrivateRoute>
            }/> */}
        </Routes> 
);
}
export default App;