export interface BudgetAllocation {
    id: number;
    category: string;
    amount: number;
}

export interface User {
    id: number;
    name?: string | null;
    email: string;
    password?: string;
}

export interface Budget {
    id: number;
    budgetName: string;
    totalAmount: number;
    user: User;
    allocations: BudgetAllocation[];
}
  