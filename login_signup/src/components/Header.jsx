import React from "react";
import ReactDOM from "react-dom";

function Header({action}){
    return(
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
    );
} 

export default Header;