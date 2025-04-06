import React, { useState } from "react";
import "./AddAllocationModal.css"

interface Props {
    budgetId: number;
    totalAllocated: number;
    budgetTotal: number;
    onClose: () => void;
    onSuccess: () => void;
}


const AddAllocationModal: React.FC<Props> = ({ budgetId, onClose, onSuccess, totalAllocated, budgetTotal }) =>{
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    
    const handleSubmit = async () =>{
        const newAmount = parseFloat(amount);
        const newTotal = totalAllocated + newAmount;
        if(isNaN(newAmount) || newAmount <= 0){
            setError("Please enter a valid amount");
            return;
        }
        if (newTotal > 100) {
            setError("This allocation would exceed your total budget. ");
            return;
        }
        const res = await fetch(`http://localhost:8080/budget/${budgetId}/allocate`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({category, percentage: parseFloat(amount)}),
        });

        if(res.ok) {
            onSuccess();
            onClose();
        } else {
            console.error("Failed to add allocation");
        }

    };


    return (
        <div className = "modal-overlay">
            <div className = "modal-box">
                <h2>Add New Allocation</h2>
                <label>Category</label>
                <input
                    type = "String"
                    placeholder = "Category"
                    value = {category}
                    onChange = {(e) => setCategory(e.target.value)}
                />
                <input
                    type = "number"
                    placeholder = "Amount"
                    value = {amount}
                    onChange = {(e) => setAmount(e.target.value)}
                />
                <div className = "modal-buttons">
                    <button onClick = {onClose}>Cancel</button>
                    <button onClick = {handleSubmit}>Submit</button>
                </div>
                {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
            </div>
        </div>
    )

}

export default AddAllocationModal;