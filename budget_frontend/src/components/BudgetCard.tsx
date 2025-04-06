import { useNavigate } from "react-router-dom";
import { Budget } from "../types";
import "./BudgetCard.css"
interface Props {
    budget: Budget;
}

const BudgetCard: React.FC<Props> = ({ budget }) =>{
    const navigate = useNavigate();

    return (
        <div className = "budget-card"onClick={() => navigate(`/budgetpie/${budget.id}`)}>
            <h3 className = "budget-title">{budget.budgetName}</h3>
            <p className = "budget-info">
                <span>Total Amount:</span> {budget.totalAmount}
            </p>
        </div>
    );
};

export default BudgetCard;