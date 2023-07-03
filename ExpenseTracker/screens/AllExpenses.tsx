import {Text} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {useContext, useEffect, useState} from 'react';
import {ExpensesContext} from '../store/expenses-context';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/redux/store';
import {fetchExpenses} from '../util/http';
import {setExpenses} from '../store/redux/expenses';

function AllExpenses() {
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
  return (
    <ExpensesOutput
      expenses={expenses.expenses}
      expensePeriod="Total"
      fallBackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;
