import React, { useEffect, useState } from "react";
import BudgetPieChart from "../components/BudgetPieChartComponent";
import { Budget } from "../types"
import { fetchBudgetById } from "../services/budgetService";
import { useParams } from "react-router-dom";


const BudgetPie = () => {
    const [budget, setBudget] = useState<Budget | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

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
        </div>
    );
};
  
  export default BudgetPie;