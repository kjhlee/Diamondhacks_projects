import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IncomeList: React.FC<{ userId: number }> = ({ userId }) => {
  const [incomes, setIncomes] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/income/view/${userId}`)
      .then(res => setIncomes(res.data))
      .catch(err => console.error('Error fetching incomes:', err));
  }, [userId]);

  return (
    <div className="income-list">
      <h2>Your Incomes</h2>
      <ul>
        {incomes.map((income, index) => (
          <li key={index}>
            ${income.amount} on {income.startDate} {income.isRecurring ? ` (Recurring: ${income.frequency})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeList;
