import {createContext, useReducer} from 'react';
import {ExpensesObject} from '../components/ExpensesOutput/ExpensesOutput';

type ExpenseObjectWithoutId = {
  description: string;
  amount: number;
  date: Date;
};

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

// export const ExpensesContext = createContext({
//   // 컨텍스트 객체의 모양과 콘텍스트 데이터를 정의 -> 자동완성을 도와줌
//   expenses: [],
//   addExpense: ({description, amount, date}: ExpenseObjectWithoutId) => {},
//   deleteExpense: (id: string) => {},
//   updateExpense: (
//     id: string,
//     {description, amount, date}: ExpenseObjectWithoutId,
//   ) => {},
// });

export const ExpensesContext = createContext<{
  expenses: ExpensesObject[];
  addExpense: (expenseData: ExpenseObjectWithoutId) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expenseData: ExpenseObjectWithoutId) => void;
}>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

type ExpenseState = ExpensesObject[];

type ExpenseAction =
  | {type: 'ADD'; payload: ExpenseObjectWithoutId}
  | {
      type: 'UPDATE';
      payload: {id: string; data: ExpenseObjectWithoutId};
    }
  | {type: 'DELETE'; payload: string};

function expenseReducer(state: ExpenseState, action: ExpenseAction) {
  // 상태를 변경하지 않고 상태 스냅샷을 생성해서 업데이트하는 방식
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id: id}, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense: ExpensesObject) => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      // 기존의 값에 덮어 씌우고 id만 유지시킴
      const updatedItem = {...updatableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter(
        (expense: ExpensesObject) => expense.id !== action.payload,
      );
    default:
      return state;
  }
}

function ExpensesContextProvider({children}: {children: React.ReactNode}) {
  const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  function addExpense(expenseData: ExpenseObjectWithoutId) {
    dispatch({type: 'ADD', payload: expenseData});
  }
  function deleteExpense(id: string) {
    dispatch({type: 'DELETE', payload: id});
  }
  function updateExpense(id: string, expenseData: ExpenseObjectWithoutId) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
