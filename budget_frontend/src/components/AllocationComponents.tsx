import "./AllocationComponents.css"
interface Props {
    category: string;
    amount: number;
}

const AllocationComponents: React.FC<Props> = ({ category, amount }) => {
    return (
        <div className = "main-card">
            <h4 className = "cat">{category}</h4>
            <p>${amount.toFixed(2)}</p>
        </div>
    )
}
export default AllocationComponents;