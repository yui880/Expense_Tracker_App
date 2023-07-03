import axios from 'axios';
import {ExpenseObjectWithoutId} from '../components/ManageExpense/ExpenseForm';

const BACKEND_URL = 'https://expensetracker-d9c40-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData: ExpenseObjectWithoutId) {
  const response = await axios.post(
    BACKEND_URL + '/expenses.json',
    expenseData,
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + '/expenses.json');
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function backUpdateExpense(
  id: string,
  expenseData: ExpenseObjectWithoutId,
) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}
export function backDeleteExpense(id: string) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
