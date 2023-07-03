import {Text} from 'react-native';
import ExpensesOutput, {
  ExpensesObject,
} from '../components/ExpensesOutput/ExpensesOutput';
import {useContext, useEffect, useState} from 'react';
import {ExpensesContext} from '../store/expenses-context';
import {getDateMinusDays} from '../util/date';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/redux/store';
import {fetchExpenses} from '../util/http';
import {setExpenses} from '../store/redux/expenses';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const expenses = useSelector((state: RootState) => state.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        dispatch(setExpenses(expenses));
      } catch (error) {
        setError('Could not fetch expense!');
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  const recentExpenses = expenses.expenses.filter((expense: ExpensesObject) => {
    const today = new Date();
    const date7DaysAge = getDateMinusDays(today, 7);

    return expense.date > date7DaysAge;
  });

  function errorHandler() {
    setError('');
  }

  if (error.length && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod="Last 7 Days"
      fallBackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
