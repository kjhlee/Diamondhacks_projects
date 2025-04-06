
import React, { useState } from 'react';
import axios from 'axios';

const IncomeForm: React.FC<{ userId: number, onSuccess: () => void }> = ({ userId, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('DAILY');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/income/add', {
        amount: parseFloat(amount),
        isRecurring,
        frequency,
        startDate,
        user: { id: userId },
      });
      onSuccess();
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="income-form">
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
      <label>
        Recurring?
        <input type="checkbox" checked={isRecurring} onChange={e => setIsRecurring(e.target.checked)} />
      </label>
      {isRecurring && (
        <select value={frequency} onChange={e => setFrequency(e.target.value)}>
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>
      )}
      <button type="submit">Add Income</button>
    </form>
  );
};

export default IncomeForm;