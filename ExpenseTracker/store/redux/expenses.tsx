import {createSlice} from '@reduxjs/toolkit';
import {ExpensesObject} from '../../components/ExpensesOutput/ExpensesOutput';

const DUMMY_EXPENSES: ExpensesObject[] = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-11-20'),
  },
  {
    id: 'e2',
    description: 'banana',
    amount: 10.99,
    date: new Date('2023-01-22'),
  },
  {
    id: 'e3',
    description: 'cake',
    amount: 7.22,
    date: new Date('2023-05-20'),
  },
  {
    id: 'e4',
    description: 'phone',
    amount: 222.32,
    date: new Date('2023-09-07'),
  },
];
let initialExpenses = [...DUMMY_EXPENSES];

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: initialExpenses,
  },
  reducers: {
    addExpense: (state, action) => {
      // 객체를 받아옴
      const id = new Date().toString() + Math.random().toString();
      const newExpense = {id: id, ...action.payload};
      state.expenses = [...state.expenses, newExpense];
      //state.expenses.push({id: id, ...action.payload});
    },
    deleteExpense: (state, action) => {
      // id를 받아옴
      // const deleteItem = state.expenses.find(
      //   (expense: ExpensesObject) => expense.id === action.payload,
      // )!;
      state.expenses = state.expenses.filter(
        (expense: ExpensesObject) => expense.id !== action.payload,
      );
      //state.expenses.splice(state.expenses.indexOf(deleteItem), 1);
    },
    updateExpense: (state, action) => {
      const updatableExpenseIndex = state.expenses.findIndex(
        (expense: ExpensesObject) => expense.id === action.payload.id,
      );
      const updatableExpense = state.expenses[updatableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.data};
      state.expenses[updatableExpenseIndex] = updatedItem;
    },
  },
});

export const addExpense = expensesSlice.actions.addExpense;
export const deleteExpense = expensesSlice.actions.deleteExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export default expensesSlice.reducer;
