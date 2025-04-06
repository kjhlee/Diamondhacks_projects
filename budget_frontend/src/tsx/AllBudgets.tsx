import { useEffect, useState } from "react";
import { Budget } from "../types";
import AddBudgetModal from "../components/AddBudgetModal";
import BudgetCard from "../components/BudgetCard";

function AllBudgets(){
    const [budgets, setBudgets] = useState<Budget[]> ([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const fetchBudgets = async () => {
        try {
            const response = await fetch(`http://localhost:8080/budget/getall`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },

            });
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setBudgets(data);
            setLoading(false);
            console.log(budgets)
        } catch ( error ){
            console.error(`Failed to Fetch Budges ${error}`);
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchBudgets();
    }, []);


    return (
        <div>
            <h2>All Budgets</h2>
            <button onClick = {() => setShowModal(true)}>
                + New Budget
            </button>
            {budgets.length === 0 ? (
                <p>No Budgets found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {budgets.map((budget) => (
                        <BudgetCard key={budget.id} budget={budget} />
                    ))}
                </div>

            )}
            {showModal && (
                <AddBudgetModal
                    userId = {1}
                    onClose = {() => setShowModal(false)}
                    onSuccess={fetchBudgets}
                />
            )}
        </div>
    )
}

export default AllBudgets;