import { Budget } from "../types";

export const fetchBudgetById = async (id: number): Promise<Budget> => {
    const res = await fetch(`http://localhost:8080/budget/${id}`);
    const contentType = res.headers.get("content-type");
  
    if (!res.ok || !contentType?.includes("application/json")) {
      const text = await res.text();
      throw new Error(`Unexpected response: ${text}`);
    }
  
    return res.json();
  };
  