import {createSlice} from '@reduxjs/toolkit';
import {ExpensesObject} from '../../components/ExpensesOutput/ExpensesOutput';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: new Array(),
  },
  reducers: {
    addExpense: (state, action) => {
      // 객체를 받아옴
      state.expenses = [action.payload, ...state.expenses];
    },
    setExpenses: (state, action) => {
      const inverted = action.payload.reverse();
      state.expenses = inverted;
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
export const setExpenses = expensesSlice.actions.setExpenses;
export default expensesSlice.reducer;
