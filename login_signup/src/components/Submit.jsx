import React from "react";

function Submit({action, handleSubmit}){
    return(
        <button className="submit-btn" onClick={handleSubmit}>
            {action}
        </button>
    );
}

export default Submit;