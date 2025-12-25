import React,{useState} from 'react';
import "./styles/LoginSignUp.css";
import LS_cust from './pages/LS_cust';
import LS_Reps from './pages/LS_Reps';
import Mytickets from "./pages/Mytickets";
import Custhome from "./pages/Custhome";

import {Routes,Route} from "react-router-dom";

function App(){
    return (
        <Routes>
            <Route path="/" element={<LS_cust/>}/>
            <Route path="/agent" element={<LS_Reps/>}/>
            <Route path="/mytickets" element={<Mytickets/>}/>
            <Route path="/chome" element={<Custhome/>}/>
        </Routes> 
);
}
export default App;
