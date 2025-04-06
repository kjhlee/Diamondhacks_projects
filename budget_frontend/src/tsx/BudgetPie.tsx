import React, { useEffect, useState } from "react";
import BudgetPieChart from "../components/BudgetPieChartComponent";
import { Budget} from "../types"
import { fetchBudgetById } from "../services/budgetService";
import { useParams } from "react-router-dom";
import AllocationComponents from "../components/AllocationComponents"
import AddAllocationModal from "../components/AddAllocationModal";

const BudgetPie = () => {
    const [budget, setBudget] = useState<Budget | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchBudgetById(Number(id))
        .then((data) => {
            setBudget(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching budget:", error);
            setLoading(false);
        })
    }, []);

    if(loading) return <div className = "p-6">Loading Budget...</div>;
    if(!budget) return <div className = "p-6 text-red-500">Budget not found</div>;

    return (
        <div className="p-6">
            <BudgetPieChart budget={budget} />
            <h3>Allocations: </h3>
            <button onClick = {() => setShowModal(true)}> + allocation</button>
            <ul>
                {budget.allocations.map((allocation) => (
                <AllocationComponents
                    key = {allocation.id}
                    category = {allocation.category}
                    percentage = {allocation.percentage}
                    budgetId={budget.id}
                    allocationId={allocation.id}
                    onDelete={() => {
                        fetchBudgetById(Number(id)).then((data) => setBudget(data));
                    }}
                />
                ))}
            </ul>

            {showModal && (
                <AddAllocationModal 
                    budgetId = {Number(id)}
                    budgetTotal = {budget.totalAmount}
                    totalAllocated={budget.allocations.reduce((sum, a) => sum + a.percentage, 0)}
                    onClose = {() => setShowModal(false)}
                    onSuccess={() => {
                        fetchBudgetById(Number(id)).then((data) => {
                            setBudget(data);
                        });
                    }}
                />
            )}
            
        </div>
    );
};
  
  export default BudgetPie;