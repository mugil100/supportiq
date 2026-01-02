import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children, role})=>{
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if(!token) return <Navigate to="/"/>;

    if(role && userRole !== role){
        console.log(userRole);
        console.log(role);
        return <Navigate to="/unauth"/>;
    }
    return children;
};

export default PrivateRoute;