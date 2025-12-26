import React from "react";

function Raiseticket(){
    function handleChange(){

    }

    return (
        <div className="ticket-body">
            <h1>Raise a Support Ticket</h1>
                <form className="raise-form" onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    placeholder="Title"
                    value={ticket.title}
                    onChange={handleChange}
                    required
                    />
                    <select 
                    name="category" 
                    value={ticket.category}
                    onChange={handleChange}
                    required
                    >
                        <option value="">Select Category</option>
                        <option >Login & Authentication</option>
                        <option >Billing & Payments</option>
                        <option >Feature Request</option>
                        <option >Bug Report</option>
                        <option >Performance Issues</option>
                        <option >Account Management</option>
                        <option >Other</option>
                    </select>

                    <select 
                    name="category"
                    id=""
                    value={ticket.priority}
                    onChange={handleChange} required>
                    <option value="">Select priority</option>
                    <option >Low</option>
                    <option >Medium</option>
                    <option >High</option>
                    </select>

                    <textarea 
                    name="description"
                    placeholder="Describe your issue..." 
                    value={ticket.description}
                    onChange={handleChange}
                    required />

                    <label>Image addressing the issue (optional)</label>
                    <input type="file" onChange={handleImg}/>

                    <button type="submit">Submit Ticket</button>
                </form>
            </div>
    );
}

export default Raiseticket;