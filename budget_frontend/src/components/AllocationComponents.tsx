import "./AllocationComponents.css"
interface Props {
    category: string;
    amount: number;
    allocationId: number;
    budgetId: number;
    onDelete: () => void;
}

const AllocationComponents: React.FC<Props> = ({ category, amount, allocationId, budgetId, onDelete }) => {
    const handleDelete = async () => {
        const confirmed = window.confirm(`Delete Allocation for ${category}?`);
        if(!confirmed){
            return;
        }
        try {
            const res = await fetch(`http://localhost:8080/budget/${budgetId}/allocation/${allocationId}`,
                {
                    method: "DELETE",
                }
            );

            if(res.ok){
                onDelete();
            } else {
                console.error("Failed to delte allocation");
            }
        } catch(error) {
            console.error("Error deleting allocation: ", error);
        }
    };

    return (
        <div className = "main-card">
            <h4 className = "cat">{category}</h4>
            <p>${amount.toFixed(2)}</p>
            <button onClick = {handleDelete}>x</button>
        </div>
    )
}
export default AllocationComponents;