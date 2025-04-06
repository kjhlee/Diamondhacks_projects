import React, { useState } from "react";
import "./AddAllocationModal.css"
interface Props {
    budgetId: number;
    onClose: () => void;
    onSuccess: () => void;
}

const AddAllocationModal: React.FC<Props> = ({ budgetId, onClose, onSuccess }) =>{
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    
    const handleSubmit = async () =>{
        const res = await fetch(`http://localhost:8080/budget/${budgetId}/allocate`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({category, amount: parseFloat(amount)}),
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
                <input
                    type = "text"
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
                
            </div>
        </div>
    )

}

export default AddAllocationModal;