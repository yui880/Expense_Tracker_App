import {Text} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {useContext} from 'react';
import {ExpensesContext} from '../store/expenses-context';
import {useSelector} from 'react-redux';
import {RootState} from '../store/redux/store';

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const expenses = useSelector((state: RootState) => state.expenses);
  return (
    <ExpensesOutput
      expenses={expenses.expenses}
      expensePeriod="Total"
      fallBackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;
