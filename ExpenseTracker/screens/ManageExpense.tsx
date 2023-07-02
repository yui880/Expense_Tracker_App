import {StyleSheet, Text, View} from 'react-native';
import {RouteProp, StackNavigationState} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useContext, useLayoutEffect} from 'react';
import IconButton from '../components/UI/IconButton';
import {GlobalStyles} from '../constants/styles';
import Button from '../components/UI/Button';
import {ExpensesContext} from '../store/expenses-context';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/redux/store';
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from '../store/redux/expenses';
import {ExpensesObject} from '../components/ExpensesOutput/ExpensesOutput';
import ExpenseForm, {
  ExpenseObjectWithoutId,
} from '../components/ManageExpense/ExpenseForm';

type ManageExpenseScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ManageExpense'
>;

type ManageExpenseScreenRouteProp = RouteProp<
  RootStackParamList,
  'ManageExpense'
>;

type ManageExpenseScreenProps = {
  navigation: ManageExpenseScreenNavigationProp;
  route: ManageExpenseScreenRouteProp;
};

function ManageExpense({route, navigation}: ManageExpenseScreenProps) {
  const expenses = useSelector((state: RootState) => state.expenses);
  const dispatch = useDispatch();

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.expenses.find(
    expense => expense.id === editedExpenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    // expensesCtx.deleteExpense(editedExpenseId);
    dispatch(deleteExpense(editedExpenseId));
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = (expenseData: ExpenseObjectWithoutId) => {
    if (isEditing) {
      dispatch(
        updateExpense({
          id: editedExpenseId,
          data: expenseData,
        }),
      );
    } else {
      dispatch(addExpense(expenseData));
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});

export default ManageExpense;
