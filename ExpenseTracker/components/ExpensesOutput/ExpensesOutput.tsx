import {FlatList, StyleSheet, View} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import {GlobalStyles} from '../../constants/styles';

export interface ExpensesObject {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

export interface ExpensesProps {
  expenses: ExpensesObject[];
}

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
function ExpensesOutput({expensePeriod}: {expensePeriod: string}) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensePeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});

export default ExpensesOutput;
