import {Text} from 'react-native';
import ExpensesOutput, {
  ExpensesObject,
} from '../components/ExpensesOutput/ExpensesOutput';
import {useContext} from 'react';
import {ExpensesContext} from '../store/expenses-context';
import {getDateMinusDays} from '../util/date';

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter(
    (expense: ExpensesObject) => {
      const today = new Date();
      const date7DaysAge = getDateMinusDays(today, 7);

      return expense.date > date7DaysAge;
    },
  );
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod="Last 7 Days"
      fallBackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
