import {FlatList, StyleSheet, Text, View} from 'react-native';
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

function ExpensesOutput({
  expenses,
  expensePeriod,
  fallBackText,
}: {
  expenses: ExpensesObject[];
  expensePeriod: string;
  fallBackText: string;
}) {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (expenses.length !== 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensePeriod} />
      {content}
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
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});

export default ExpensesOutput;
