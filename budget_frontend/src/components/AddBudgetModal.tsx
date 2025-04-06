import { useState } from "react";
import "./AddBudgetModal.css";

interface Props {
    userId: number;
    onClose: () => void;
    onSuccess: () => void;
}

const AddBudgetModal: React.FC<Props> = ({ userId, onClose, onSuccess }) => {
    const [budgetName, setBudgetName] = useState("");
    const [totalAmount, setTotalAmount] = useState("");

    const handleSubmit = async () => {
        const res = await fetch ("http://localhost:8080/budget/addbudget", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                budgetName,
                totalAmount: parseFloat(totalAmount),
                user: {
                    id: userId,
                },
            }),
        });
        if (res.ok) {
            onSuccess();
            onClose();
        } else {
            console.error("Failed to create Budget");
        }
    };

    return (
        <div className = "modal-overlay">
            <div className = "modal-box">
                <h2>Create New Budget</h2>
                <input
                    type = "text"
                    placeholder="Budget Name"
                    value = {budgetName}
                    onChange={(e) => setBudgetName(e.target.value)}
                />
                <input
                    type = "number"
                    placeholder="Total Amount"
                    value = {totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                />
                <div className = "modal-buttons">
                    <button onClick = {onClose}>Cancel</button>
                    <button onClick = {handleSubmit}> Submit</button>
                </div>
            </div>
        </div>
    );
};

export default AddBudgetModal;