import React from  "react";

function Input({icon, type,placeholder, name, value, onChange}){
    return (
        <div className="input">
            <img src={icon}/>
            <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            />
        </div>
    );
}

export default Input;