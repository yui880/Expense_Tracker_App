import {FlatList, ListRenderItem, Text} from 'react-native';
import {ExpensesObject} from './ExpensesOutput';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem({itemData}: {itemData: ExpensesObject}) {
  return <ExpenseItem {...itemData} />;
}

function ExpensesList({expenses}: {expenses: ExpensesObject[]}) {
  return (
    <FlatList
      data={expenses}
      renderItem={({item}) => renderExpenseItem({itemData: item})}
      keyExtractor={item => item.id}
    />
  );
}
export default ExpensesList;
